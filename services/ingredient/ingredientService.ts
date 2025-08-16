import { db } from "@/config/firebaseConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import uuid from 'react-native-uuid';

export interface Ingredient {
    id?: string;
    name: string;
    measure: string;
    cost: number;
    capacity: number;
}

export const getIngredients = async (): Promise<Ingredient[]> => {
    const ingredientsCol = collection(db, 'ingredients');
    const querySnapshot = await getDocs(ingredientsCol);
    querySnapshot.docs.map(doc => {
        console.log(doc.data())
    })
    
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Ingredient, 'id'>)
    }));
}

export const getIngredient = async (uid: string) =>{
    const ingredientRef     = doc(db, 'ingredients', uid); 
    const ingredientSnap    = await getDoc(ingredientRef);
    return ingredientSnap.exists() ? ingredientSnap.data() as Ingredient: undefined;
}

export const createIngredient = async (data: Ingredient) => {
    const uid = uuid.v4() as string;
    const ingredientRef = doc(db, 'ingredients', uid);
    
    await setDoc(ingredientRef,{
        ...data,
        createdAt: new Date(),
        updatedAt: null
    });
}

export const updateIngredient = async(uid: string, data: Partial<Omit<Ingredient, 'id'>>) => {
    const ingredientRef = doc(db, 'ingredients', uid);
    await updateDoc(ingredientRef, {
        ...data,
        updateAt: new Date()
    })
}

export const deleteIngredient = async(uid: string) => {
    const ingredientRef = doc(db, 'ingredients', uid);
    await deleteDoc(ingredientRef);
}