import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDQ1QWmPBqt0hXx9CG57162LCqFojgx5iQ",
  authDomain: "cartographj.firebaseapp.com",
  projectId: "cartographj",
  storageBucket: "cartographj.firebasestorage.app",
  messagingSenderId: "813924540962",
  appId: "1:813924540962:web:ea02bdb927db5be751607b",
  measurementId: "G-EJVFFCV3XT"
};

const app = initializeApp(firebaseConfig);

// Initialize App Check (Replace 'YOUR_RECAPTCHA_SITE_KEY' with your actual key)
try {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
    isTokenAutoRefreshEnabled: true
  });
} catch (e) {
  console.log("App Check initialization skipped or failed:", e);
}

export const db = getFirestore(app);
export const auth = getAuth(app);
