
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { createUserProfile } from './userService';

export const registerUser = async (email : string, password : string, company: string): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(userCredential.user.uid, { email, company});
  return userCredential;
};

export const loginUser = (email : string, password : string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = (): Promise<void> => {
  return signOut(auth);
};