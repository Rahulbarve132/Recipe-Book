import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(supabase.auth.getUser());

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <UtensilsCrossed className="h-8 w-8 text-orange-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">Recipe Book</span>
          </Link>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;