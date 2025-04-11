import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore"; // ✅ correct


const initFirebaseAdmin = () => {
  const apps = getApps();
  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
};

export const { auth, db } = initFirebaseAdmin();

/*
Exactly, you're spot on! ✅
This setup:

export const { auth, db } = initFirebaseAdmin();
makes sure that your backend/server gets access to:

🔐 auth – Firebase Authentication (Admin SDK)
Manage users: create, delete, update users
Verify ID tokens from the frontend (used for protected routes)
Custom claims (roles, permissions, etc.)
Bypass client SDK limitations — full admin powers

Example usage:

const user = await auth.getUserByEmail("user@example.com");

🔥 db – Firebase Firestore (Admin SDK)
Full read/write access to your Firestore database

No security rules (unlike frontend SDK) — use with caution!

Great for server-side operations: API endpoints, scheduled jobs, etc.

Example usage:

const doc = await db.collection("users").doc("uid123").get();
🔁 And it only initializes once,
even in development environments like Next.js where hot reload might cause re-runs.

So yep — that function is your gateway to securely talking to Firebase from your backend. Want a real example of verifying a user or writing data to Firestore
*/
