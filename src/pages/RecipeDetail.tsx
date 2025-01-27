import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api/spoonacular';
import { RecipeDetail as RecipeDetailType } from '../types/recipe';
import { Clock, Users, Loader2 } from 'lucide-react';
import RecipeRating from '../components/RecipeRating';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const data = await getRecipeById(parseInt(id));
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Recipe not found'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
        <RecipeRating recipeId={recipe.id} />
      </div>
      
      <div className="flex space-x-4 mb-6">
        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-1" />
          <span>{recipe.readyInMinutes} mins</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="w-5 h-5 mr-1" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id} className="text-gray-700">
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
      </div>
    </div>
  );
};

export default RecipeDetail;