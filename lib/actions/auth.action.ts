"use server";

/*
🔐 Firebase Auth Flow (Never Forget Summary)
Sign-Up

createUserWithEmailAndPassword(email, password)
→ Creates a new user in Firebase Auth
→ Logs them in automatically
→ You get userCredential with the user's uid, email, etc.

Store Extra Info

Use the uid to save extra user data (like name) in Firestore manually.

Sign-In

signInWithEmailAndPassword(email, password)
→ Logs in existing user
→ You get userCredential again
→ Call user.getIdToken() to get JWT (idToken)

Session Setup */

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/", //The path determines which routes in your app can access the cookie.
    /**It means:

“This cookie is available to every route on your website.”
For example:
/
/dashboard
/settings
/profile/edit
All these routes will be able to read the "session" cookie.
 */
    sameSite: "lax",
  });
}

/*
Yes, you’ve got the idea right! Here’s a clean summary to lock it into memory forever:

🔐 path in a cookie means:
Only routes that start with that path can access the cookie.

💡 So when you do:
cookieStore.set("session", sessionCookie, {
  maxAge: SESSION_DURATION,
  path: "/dashboard",
});
✅ /dashboard, /dashboard/stats → have access to the session cookie.

❌ /profile, /home, / → won’t have access. */

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
      // profileURL,
      // resumeURL,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Handle Firebase specific errors
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params; //idToken is jwt

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCookie(idToken);
  } catch (error: any) {
    console.log("");

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  /*
  cookies() gets all cookies for the current request (in Next.js Server Components or API routes).
  cookieStore.get("session") retrieves the session cookie specifically (which contains the Firebase JWT). */
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
