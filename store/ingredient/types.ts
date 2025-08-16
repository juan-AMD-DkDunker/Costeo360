import { Ingredient } from "@/services/ingredient/ingredientService";


export interface IngredientState {
    ingredients: Ingredient[];
    loading: boolean,
    error: string | null,
    createIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
    fetchIngredients:() => Promise<void>;
    fetchIngredientById: (id: string) => Promise<Ingredient | undefined>;
    updateIngredient: (id: string, ingredient: Partial<Omit<Ingredient, 'id'>>) => void;
    deleteIngredient: (id: string) => void;
}