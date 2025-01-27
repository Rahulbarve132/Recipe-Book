export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
}

export interface RecipeDetail extends Recipe {
  instructions: string;
  extendedIngredients: {
    id: number;
    original: string;
  }[];
  readyInMinutes: number;
  servings: number;
}