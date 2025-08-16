import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

interface Register {
    email: string;
    company: string;
    cellphone?: string;
}

export const createUserProfile = async (uid: string, data: Register) => {
    const newUserRef = doc(db, "users", uid);
    await setDoc(newUserRef, {
        ...data,
        createdAt: new Date(),
        updateAt: null,
    });
};

export const getUserProfile = async (uid: string) => {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (uid: string, data: Register) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        ...data,
        updatedAt: new Date()
    });
}
