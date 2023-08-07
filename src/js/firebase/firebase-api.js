import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

import { firebaseConfig } from './firebase-config';

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);

async function signIn() {
  try {
    if (localStorage.userId) {
      return;
    }
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const displayName = user.displayName;
    const photoUrl = user.photoURL;
    localStorage.setItem('userId', auth.currentUser.uid);

    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    set(userRef, {
      displayName,
      photoUrl,
    });

    localStorage.setItem('userId', user.uid);
    getUserData();
  } catch (error) {
    console.error(error);
  }
}

async function signOut() {
  try {
    await firebaseSignOut(auth);
    delete localStorage.userId;
    delete localStorage.user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserData() {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return;
    }

    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      localStorage.user = JSON.stringify(userData);
      return userData;
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.log('Error getting user data:', error);
  }
}

export { signIn, signOut, getUserData };
