import { signIn, signOut, getUserData } from '../firebase/firebase-api';
import { getName } from '../helpers/get-name';

const logoutMileButton = document.getElementById('logout-mobile-button');
const profileButton = document.querySelector('.profile-button.mobile');
const profileButtonText = profileButton.querySelector('.profile-button__text');
const profileButtonImg = profileButton.querySelector('.profile-button__img');
const profileButtonIcon = profileButton.querySelector('.profile-button__icon');
const profileButtonIconArrowDown = profileButton.querySelector(
  '.profile-button__icon-down'
);
const profileButtonIconArrowRight = profileButton.querySelector(
  '.profile-button__icon-right'
);

const defaultButtonText = 'Sign up';
const hideClass = 'is-hidden';
const hideAuth = 'auth';

function updateUsername(username) {
  try {
    profileButtonText.innerHTML = username;
  } catch (error) {
    console.error(error);
  }
}

function updateProfileImage(profileImage) {
  try {
    if (!profileImage) {
      profileButtonImg.classList.add(hideClass);

      return;
    }
    profileButtonImg.src = profileImage;
    profileButtonImg.classList.remove(hideClass);
  } catch (error) {
    console.error(error);
  }
}

export async function signOutHandler() {
  try {
    await signOut();
    updateUsername(defaultButtonText);
    updateProfileImage();
    afterSignOut();
  } catch (error) {
    console.error(error);
  }
}

function afterSignIn() {
  try {
    profileButton.removeEventListener('click', signInHandler);
    profileButton.classList.add(hideAuth);
    profileButtonText.classList.add(hideAuth);
    profileButtonIcon.classList.add(hideAuth);

    profileButtonIconArrowRight.classList.add(hideClass);
    profileButtonIconArrowDown.classList.remove(hideClass);
    logoutMileButton.classList.remove(hideClass);
  } catch (error) {
    console.error(error);
  }
}

function afterSignOut() {
  try {
    profileButton.addEventListener('click', signInHandler);
    profileButton.classList.remove(hideAuth);
    profileButtonText.classList.remove(hideAuth);
    profileButtonIcon.classList.remove(hideAuth);

    profileButtonIconArrowRight.classList.remove(hideClass);
    profileButtonIconArrowDown.classList.add(hideClass);
    logoutMileButton.classList.add(hideClass);
  } catch (error) {
    console.error(error);
  }
}

async function signInHandler() {
  try {
    const user = await getUserData();
    if (user) {
      updateUsername(getName(user.displayName));
      updateProfileImage(user.photoUrl);
      afterSignIn();
    } else {
      await signIn();
      signInHandler();
    }
  } catch (error) {
    console.error(error);
  }
}

async function onInit() {
  const user = await getUserData();

  if (user) {
    updateUsername(getName(user.displayName));
    updateProfileImage(user.photoUrl);
    afterSignIn();
  }

  profileButton.addEventListener('click', signInHandler);
}

onInit();
