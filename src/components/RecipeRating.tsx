import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  recipeId: number;
}

const RecipeRating: React.FC<Props> = ({ recipeId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, [recipeId]);

  const fetchRatings = async () => {
    const { data: ratings, error } = await supabase
      .from('ratings')
      .select('rating')
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error fetching ratings:', error);
      return;
    }

    if (ratings.length > 0) {
      const avg = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
      setAverageRating(avg);
      setTotalRatings(ratings.length);
    }
  };

  const handleRating = async (value: number) => {
    const user = await supabase.auth.getUser();
    if (!user) {
      alert('Please sign in to rate recipes');
      return;
    }

    const { error } = await supabase
      .from('ratings')
      .upsert({
        recipe_id: recipeId,
        user_id: user.id,
        rating: value,
      });

    if (error) {
      console.error('Error saving rating:', error);
      return;
    }

    setRating(value);
    fetchRatings();
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                (hover || rating) && star <= (hover || rating)!
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      {averageRating !== null && (
        <div className="text-sm text-gray-600">
          Average: {averageRating.toFixed(1)} ({totalRatings} ratings)
        </div>
      )}
    </div>
  );
};

export default RecipeRating;