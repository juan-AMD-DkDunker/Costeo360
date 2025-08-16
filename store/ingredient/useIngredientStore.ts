import { createIngredient, deleteIngredient, getIngredient, getIngredients, Ingredient, updateIngredient } from '@/services/ingredient/ingredientService';
import { create } from 'zustand';
import { IngredientState } from './types';

const initialIngredients: Ingredient[] = [
    {
        id: '1',
        name: 'Harina sin preparar',
        measure: 'gramos',
        capacity: 1000,
        cost: 3.70
    },
    {
        id: '2',
        name: 'Gelatina sin sabor',
        measure: 'gramos',
        capacity: 30,
        cost: 2.00
    },
    {
        id: '3',
        name: 'Huevos',
        measure: 'unidades',
        capacity: 15,
        cost: 10.00
    },
    {
        id: '4',
        name: 'Manzanas',
        measure: 'gramos',
        capacity: 1000,
        cost: 5.00
    },
    {
        id: '5',
        name: 'Azúcar',
        measure: 'gramos',
        capacity: 1000,
        cost: 4.50
    },
    {
        id: '6',
        name: 'Leche',
        measure: 'litros',
        capacity: 1,
        cost: 3.20
    },
    {
        id: '7',
        name: 'Mantequilla',
        measure: 'gramos',
        capacity: 250,
        cost: 6.00
    },
    {
        id: '8',
        name: 'Sal',
        measure: 'gramos',
        capacity: 500,
        cost: 1.50
    },
    {
        id: '9',
        name: 'Polvo de hornear',
        measure: 'gramos',
        capacity: 100,
        cost: 2.80
    },
    {
        id: '10',
        name: 'Vainilla',
        measure: 'mililitros',
        capacity: 60,
        cost: 3.00
    },
    {
        id: '11',
        name: 'Canela',
        measure: 'gramos',
        capacity: 50,
        cost: 2.20
    },
    {
        id: '12',
        name: 'Aceite vegetal',
        measure: 'mililitros',
        capacity: 900,
        cost: 7.00
    },
    {
        id: '13',
        name: 'Cacao en polvo',
        measure: 'gramos',
        capacity: 200,
        cost: 5.50
    },
    {
        id: '14',
        name: 'Chocolate',
        measure: 'gramos',
        capacity: 100,
        cost: 4.00
    },
    {
        id: '15',
        name: 'Crema de leche',
        measure: 'mililitros',
        capacity: 200,
        cost: 3.80
    },
    {
        id: '16',
        name: 'Queso crema',
        measure: 'gramos',
        capacity: 250,
        cost: 8.00
    },
    {
        id: '17',
        name: 'Fresas',
        measure: 'gramos',
        capacity: 500,
        cost: 6.50
    },
    {
        id: '18',
        name: 'Plátanos',
        measure: 'unidades',
        capacity: 6,
        cost: 4.20
    },
    {
        id: '19',
        name: 'Nueces',
        measure: 'gramos',
        capacity: 100,
        cost: 7.00
    },
    {
        id: '20',
        name: 'Almendras',
        measure: 'gramos',
        capacity: 100,
        cost: 7.50
    },
    {
        id: '21',
        name: 'Coco rallado',
        measure: 'gramos',
        capacity: 100,
        cost: 3.60
    },
    {
        id: '22',
        name: 'Pasas',
        measure: 'gramos',
        capacity: 100,
        cost: 2.90
    },
    {
        id: '23',
        name: 'Maicena',
        measure: 'gramos',
        capacity: 400,
        cost: 2.50
    },
    {
        id: '24',
        name: 'Yogurt natural',
        measure: 'mililitros',
        capacity: 125,
        cost: 2.00
    },
    {
        id: '25',
        name: 'Limón',
        measure: 'unidades',
        capacity: 5,
        cost: 2.50
    },
    {
        id: '26',
        name: 'Naranja',
        measure: 'unidades',
        capacity: 4,
        cost: 3.00
    },
    {
        id: '27',
        name: 'Miel',
        measure: 'gramos',
        capacity: 250,
        cost: 5.00
    },
    {
        id: '28',
        name: 'Agua',
        measure: 'litros',
        capacity: 2,
        cost: 1.00
    },
    {
        id: '29',
        name: 'Café',
        measure: 'gramos',
        capacity: 100,
        cost: 4.80
    },
    {
        id: '30',
        name: 'Galletas',
        measure: 'gramos',
        capacity: 200,
        cost: 3.20
    },
    {
        id: '31',
        name: 'Queso parmesano',
        measure: 'gramos',
        capacity: 100,
        cost: 6.00
    },
    {
        id: '32',
        name: 'Jamón',
        measure: 'gramos',
        capacity: 150,
        cost: 5.50
    },
    {
        id: '33',
        name: 'Pimienta',
        measure: 'gramos',
        capacity: 50,
        cost: 2.10
    },
    {
        id: '34',
        name: 'Tomate',
        measure: 'unidades',
        capacity: 5,
        cost: 3.50
    }
];

export const useIngredientStore = create<IngredientState>((set, get, state) => ({
    ingredients: [],
    loading: false,
    error: null,
    fetchIngredients: async () => {
        //Aquí hacer la llamada a la API O firebase para obtener los ingredientes
        set({ loading: true });
        try {
            const ingredients = await getIngredients();
            set({ ingredients: ingredients, loading: false });
        } catch (error) {
            set({ error: 'Error al traer los ingredientes', loading: false });
        }
    },

    createIngredient: async (ingredient: Omit<Ingredient, 'id'>) => {
        try {
            await createIngredient(ingredient);
            //await get().fetchIngredients();
        } catch (error) {
            set({ error: 'Error al guardar el ingrediente', loading: false });
        }
    },
        
    deleteIngredient: async (id) => {
        try {
            await deleteIngredient(id);
        } catch (error) {
            set({ error: 'Error al eliminar el ingrediente', loading: false });
        }
    },
    fetchIngredientById: async (id) : Promise<Ingredient | undefined>=>  {
        set({ loading: true });
        try {
            const ingredient: Ingredient | undefined  = await getIngredient(id);
            set({ loading: false });
            return ingredient;
        } catch (error) {
            set({ error: 'Error al obtener el ingrediente', loading: false });
        }
    },
    updateIngredient: async (id, ingredient: Partial<Omit<Ingredient, 'id'>>) =>{
        set({ loading: true });
        try {
            await updateIngredient(id, ingredient);
            set({ loading: false });
            return ingredient;
        } catch (error) {
            set({ error: 'Error al actualizar el ingrediente', loading: false });
        }
    }   
}));