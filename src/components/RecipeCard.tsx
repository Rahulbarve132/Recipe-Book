import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/recipe';


interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;