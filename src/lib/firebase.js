

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Import other services you use (e.g., Firestore, Storage)
// import { getFirestore } from 'firebase/firestore'; 

// Load environment variables for Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if critical environment variables are missing
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error('Missing Firebase environment variables. Please check your .env file.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances of the services you will use
export const auth = getAuth(app);
// export const db = getFirestore(app); // Example for Firestore

// Export the app instance itself if needed
export default app;