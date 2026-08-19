import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDQ1QWmPBqt0hXx9CG57162LCqFojgx5iQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cartographj.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cartographj",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cartographj.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "813924540962",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:813924540962:web:ea02bdb927db5be751607b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EJVFFCV3XT"
};

const app = initializeApp(firebaseConfig);

// Initialize App Check safely only if a valid ReCAPTCHA site key is provided
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
if (recaptchaSiteKey && recaptchaSiteKey !== 'YOUR_RECAPTCHA_SITE_KEY') {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true
    });
  } catch (e) {
    console.warn("App Check initialization skipped or failed:", e);
  }
} else {
  if (import.meta.env.DEV) {
    console.info("[Firebase] App Check skipped: VITE_RECAPTCHA_SITE_KEY is unconfigured.");
  }
}

export const db = getFirestore(app);
export const auth = getAuth(app);
