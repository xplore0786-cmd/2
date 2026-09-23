import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: "AIzaSyAfCnkCnNKqucPdKCwnXpmfl_S0svaFvWY",
  authDomain: "freeimageresize-4e46f.firebaseapp.com",
  projectId: "freeimageresize-4e46f",
  storageBucket: "freeimageresize-4e46f.firebasestorage.app",
  messagingSenderId: "877053376648",
  appId: "1:877053376648:web:725f24b74252eebd6cc73d",
  measurementId: "G-8N6Z7E9L93"
};

// Initialize Firebase safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics if supported in the current environment
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      try {
        getAnalytics(app);
      } catch (e) {
        console.warn('Firebase analytics not initialized:', e);
      }
    }
  }).catch(() => {});
}
