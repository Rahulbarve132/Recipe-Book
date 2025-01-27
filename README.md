# Recipe Book App

## Overview
The **Recipe Book App** is a React.js application that allows users to browse and view different recipes. It integrates with the [Spoonacular Recipe API](https://spoonacular.com/food-api) to fetch and display recipe data. Users can navigate between the homepage and recipe details page to explore various recipes.

## Features
- Fetch recipes from the Spoonacular API
- Display a list of recipes with their names and brief descriptions
- View detailed recipe information, including ingredients, instructions, and images
- Navigate between pages using React Router
- Handle errors gracefully with user-friendly messages

## Tech Stack
- **React.js** (with Hooks)
- **React Router** (for navigation)
- **Axios** (for API calls)
- **Tailwind CSS** (for styling, optional)
- **SupaBase** (for authantication)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (>=14.x recommended)
- **npm** or **yarn**

### 1. Clone the Repository
```sh
git clone https://github.com/Rahulbarve132/Recipe-Book.git

```

### 2. Install Dependencies
Using npm:
```sh
npm install
```
Or using yarn:
```sh
yarn install
```

### 3. Get API Key
Sign up on [Spoonacular API](https://spoonacular.com/food-api) and obtain an API key. Create a `.env` file in the root of your project and add:
```
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
```

### 4. Start the Development Server
Using npm:
```sh
npm start
```
Or using yarn:
```sh
yarn start
```

The app will run at `http://localhost:5173/`.



## API Integration
The app fetches recipe data using Axios:
```js
import axios from 'axios';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random?apiKey=${API_KEY}&number=10`);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
```

## Deployment
To deploy the app, run:
```sh
npm run build
```
You can deploy it on **Netlify**, **Vercel**, or **GitHub Pages**.

## License
This project is open-source and available under the MIT License.

## Contributions
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---
Happy Coding! 🍽️

