// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqQYAAPr9IqeRw_wkgQEISWM10so_k5yE",
  authDomain: "vapivoice-6f00a.firebaseapp.com",
  projectId: "vapivoice-6f00a",
  storageBucket: "vapivoice-6f00a.firebasestorage.app",
  messagingSenderId: "884675564326",
  appId: "1:884675564326:web:8c505fc7b92212106667e7",
  measurementId: "G-Z6DQ3MQW6C",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

/*
SDK	Use in	Security Rules?	Example
firebase/app, firebase/auth, firebase/firestore	Frontend	✅ Yes, enforced	User login, showing user-specific data
firebase-admin/app, firebase-admin/auth, firebase-admin/firestore	Backend	❌ No, full access	Server-side logic, user management


So in short: ✅ This code is your frontend Firebase config, to use Firebase services safely in the client.
Your previous code was the backend (admin) config.
*/

/*
🔥 Firebase Client SDK (Frontend)

Feature	               Description
Used in	               Frontend apps (React, Next.js pages, Vue, etc.)
SDK Example	           firebase/app, firebase/auth, firebase/firestore
Authentication	       Handles user login, signup, logout
Database Access	       Limited by Firestore security rules
Security Rules	       ✅ Yes, enforced strictly
Initialization	       Uses firebaseConfig with apiKey, projectId, etc.
Example Use Case	     Show user data, allow user to edit their profile, display posts, etc.


🛡️ Firebase Admin SDK (Backend)

Feature	             Description
Used in	             Backend(Node.js servers, API routes, cron jobs, Next.js API routes)
SDK Example	         firebase-admin/app, firebase-admin/auth, firebase-admin/firestore
Authentication     	 Can create, verify, and manage users
Database Access	     Full access, not restricted by security rules
Security Rules	    ❌ No, bypasses security rules
Initialization	    Uses serviceAccount with private key, client email, etc.
Example Use Case	  Verify ID tokens, send custom notifications, admin panel, analytics


✅ Summary
Feature	          Client SDK	              Admin SDK
Use Location	    Frontend	                Backend
Auth Limitations	User-level only	          Full control (create/delete users)
Firestore Access	Limited by security rules	Full access (no rules)
Key Used	        apiKey	                  privateKey, clientEmail
Example File	    firebaseConfig.js	          firebaseAdmin.js
 */
