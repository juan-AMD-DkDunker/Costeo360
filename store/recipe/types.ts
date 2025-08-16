import { Ingredient } from "../ingredient/types";

export interface Recipe {
    id: string;
    name: string;
    image: string;
    ingredients: Ingredient[];
    salePrice: number;
    timePreparation: number;
}

export interface RecipeState {
    recipes: Recipe[];
    createRecipe: (recipe: Omit<Recipe, 'id'>) => void;
}
