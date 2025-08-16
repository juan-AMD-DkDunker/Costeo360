import uuid from 'react-native-uuid';
import { create } from 'zustand';
import { RecipeState } from './types';

export const useRecipeStore = create<RecipeState>((set) => ({
    recipes: [],
    createRecipe: (recipe) =>
        set((state) => ({
            recipes: [
                ...state.recipes,
                {
                    ...recipe,
                    id: uuid.v4() as string, // Genera un ID único para la nueva receta (utilizar uuid o similar en producción)
                },
            ],
        })),
}));