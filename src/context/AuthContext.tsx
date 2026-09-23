import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as fbSignOut,
  AuthError
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  unauthorizedDomain: string | null;
  configMissingModalOpen: boolean;
  setConfigMissingModalOpen: (open: boolean) => void;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unauthorizedDomain, setUnauthorizedDomain] = useState<string | null>(null);
  const [configMissingModalOpen, setConfigMissingModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (err) => {
        console.error('Firebase Auth state error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    setError(null);
    setUnauthorizedDomain(null);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
      return result.user;
    } catch (err: unknown) {
      const authErr = err as AuthError;
      console.error('Google Sign-in error:', authErr);

      if (authErr.code === 'auth/popup-closed-by-user') {
        // User closed the popup before completing sign-in
        setError(null);
      } else if (authErr.code === 'auth/configuration-not-found') {
        setConfigMissingModalOpen(true);
        setError(
          'Google Sign-in provider is not enabled in your Firebase Console. Please enable "Google" under Firebase Console > Authentication > Sign-in method.'
        );
      } else if (authErr.code === 'auth/unauthorized-domain') {
        const currentDomain = window.location.hostname;
        setUnauthorizedDomain(currentDomain);
        setConfigMissingModalOpen(true);
        setError(
          `Unauthorized domain (${currentDomain}). Please add "${currentDomain}" to Authorized Domains in Firebase Console > Authentication > Settings.`
        );
      } else if (authErr.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups for this site and try again.');
      } else {
        setError(authErr.message || 'Failed to sign in with Google. Please try again.');
      }
      return null;
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      await fbSignOut(auth);
      setUser(null);
    } catch (err: unknown) {
      const authErr = err as AuthError;
      console.error('Sign-out error:', authErr);
      setError(authErr.message || 'Failed to sign out.');
    }
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
