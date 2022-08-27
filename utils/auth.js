import firebase from 'firebase/app';
import 'firebase/auth';

const anonymouslySignIn = () => {
  firebase.auth().signInAnonymously();
};

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
  anonymouslySignIn();
};

export { signIn, signOut, anonymouslySignIn };
