import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as fbSignOut,
  AuthError
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  unauthorizedDomain: string | null;
  configMissingModalOpen: boolean;
  setConfigMissingModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<AuthUser | null>;
  signInAsGuest: () => AuthUser;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_STORAGE_KEY = 'isr_guest_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [configMissingModalOpen, setConfigMissingModalOpen] = useState(false);

  useEffect(() => {
    // Check if guest user session exists
    try {
      const savedGuest = sessionStorage.getItem(GUEST_STORAGE_KEY);
      if (savedGuest) {
        setUser(JSON.parse(savedGuest));
      }
    } catch {
      // ignore storage access issues
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            isAnonymous: currentUser.isAnonymous,
          });
        } else {
          // If no firebase user, keep guest if present
          try {
            const savedGuest = sessionStorage.getItem(GUEST_STORAGE_KEY);
            if (savedGuest) {
              setUser(JSON.parse(savedGuest));
            } else {
              setUser(null);
            }
          } catch {
            setUser(null);
          }
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Firebase Auth state notice:', err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<AuthUser | null> => {
    setError(null);
    setUnauthorizedDomain(null);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const authenticatedUser: AuthUser = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        isAnonymous: result.user.isAnonymous,
      };
      // Clean guest session if any
      try {
        sessionStorage.removeItem(GUEST_STORAGE_KEY);
      } catch {
        // ignore
      }
      setUser(authenticatedUser);
      return authenticatedUser;
    } catch (err: unknown) {
      const authErr = err as AuthError;

      if (authErr.code === 'auth/popup-closed-by-user') {
        // User closed the popup before completing sign-in
        setError(null);
      } else if (authErr.code === 'auth/configuration-not-found') {
        console.warn('Google Sign-in provider not enabled in Firebase Console');
        setConfigMissingModalOpen(true);
        setError(
          'Google Sign-in provider is not enabled in your Firebase Console. Please enable "Google" under Firebase Console > Authentication > Sign-in method.'
        );
      } else if (authErr.code === 'auth/unauthorized-domain') {
        const currentDomain = typeof window !== 'undefined' ? window.location.hostname : '';
        console.warn('Firebase unauthorized domain detected:', currentDomain);
        setUnauthorizedDomain(currentDomain);
        setConfigMissingModalOpen(true);
        setError(
          `Unauthorized domain (${currentDomain}). Please add "${currentDomain}" to Authorized Domains in Firebase Console > Authentication > Settings.`
        );
      } else if (authErr.code === 'auth/popup-blocked') {
        console.warn('Google Sign-in popup blocked by browser');
        setError('Popup was blocked by your browser. Please allow popups for this site and try again.');
      } else {
        console.warn('Google Sign-in notice:', authErr.message);
        setError(authErr.message || 'Failed to sign in with Google. Please try again.');
      }
      return null;
    }
  };

  const signInAsGuest = (): AuthUser => {
    setError(null);
    setUnauthorizedDomain(null);
    const guestUser: AuthUser = {
      uid: 'guest_' + Math.random().toString(36).substring(2, 9),
      displayName: 'Guest User',
      email: 'guest@freeimageresize.local',
      photoURL: null,
      isAnonymous: true,
    };
    try {
      sessionStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guestUser));
    } catch {
      // ignore
    }
    setUser(guestUser);
    return guestUser;
  };

  const signOut = async () => {
    setError(null);
    setUnauthorizedDomain(null);
    try {
      sessionStorage.removeItem(GUEST_STORAGE_KEY);
    } catch {
      // ignore
    }
    try {
      await fbSignOut(auth);
    } catch (err: unknown) {
      const authErr = err as AuthError;
      console.warn('Sign-out notice:', authErr.message);
    }
    setUser(null);
  };

  const clearError = () => {
    setError(null);
    setUnauthorizedDomain(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        unauthorizedDomain,
        configMissingModalOpen,
        setConfigMissingModalOpen,
        signInWithGoogle,
        signInAsGuest,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
