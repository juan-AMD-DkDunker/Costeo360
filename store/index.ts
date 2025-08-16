// Exporta el store global
export * from './useGlobalStore';
// Exporta el store de receta desde su subcarpeta
export * from './ingredient/useIngredientStore';
export * from './recipe/useRecipeStore';

/*ejemplo de uso:
import { useGlobalStore, useRecipeStore } from '@/store';*/