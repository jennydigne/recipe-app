import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const collectionRef = collection(db, 'recipes');

export const saveRecipe = async (recipe) => {
  try {
    await addDoc(collectionRef, recipe);
    console.log('Recipe saved to Firestore');
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
};

export const fetchAllRecipes = async () => {
  try {
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const ref = doc(db, 'recipes', id);
    const snap = await getDoc(ref);
    if (snap.exists()) return { id: snap.id, ...snap.data() };
    return null;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const ref = doc(db, 'recipes', id);
    await deleteDoc(ref);
    console.log('Recipe deleted');
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

export const updateRecipe = async (id, updatedData) => {
  try {
    const ref = doc(db, 'recipes', id);
    await updateDoc(ref, updatedData);
    console.log('Recipe updated in Firestore');
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};
