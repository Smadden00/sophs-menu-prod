import styles from "./Recipes.module.css";
import Header from "../../components/header";
import RecipeListImage from "../../components/recipeListImage";
import { Key, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AddClipboardIcon from '../../components/svgs/addClipboardIcon'
import FiltersButton from "../../components/filters/filtersButton";
import QuickSort from "../../components/functions/quickSort";
import SortButton from "../../components/SortButton";
import FetchAllRecipes from "../../components/requests/fetchAllRecipes";
import { Recipe } from "../../types/index"

export default function RecipesListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [lowerPrepTime, setLowerPrepTime] = useState(0);
  const [upperPrepTime, setUpperPrepTime] = useState(1500);
  const [mealFilter, setMealFilter] = useState(['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert']);
  const [sophSubmittedOnly, setSophSubmittedOnly] = useState(searchParams.get('sophOnly') === 'true');
  const [sortBy, setSortBy] = useState<["Price" | "Rating" | "Prep Time", "Low to High" | "High to Low"]>(['Prep Time', 'Low to High']);

  const filterValuesAndCallbacks = {
    lowerPrepTime: lowerPrepTime,
    setLowerPrepTime: setLowerPrepTime,
    upperPrepTime: upperPrepTime,
    setUpperPrepTime: setUpperPrepTime,
    mealFilter: mealFilter,
    setMealFilter: setMealFilter,
    sophSubmittedOnly: sophSubmittedOnly,
    setSophSubmittedOnly: setSophSubmittedOnly
  };

  //Load in all the data
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        await FetchAllRecipes(setRecipesData, setLoading);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchAllRecipes();
  }, []);

  //filter out recipes based on filters
  const filteredRecipes = recipesData.filter((recipe) => {
    const sophSubmittedMatch = !sophSubmittedOnly || recipe.soph_submitted === true;
    
    if(
      recipe.prep_time_in_min >= lowerPrepTime && 
      recipe.prep_time_in_min <= upperPrepTime &&
      mealFilter.includes(recipe.meal) &&
      sophSubmittedMatch
    ){
      return recipe
    } 
    return false
  });

  const sortedFilteredRecipes = QuickSort({arr: filteredRecipes, sortBy: sortBy});

  //build the images of each recipe
  const recipesImages = sortedFilteredRecipes.map((recipeData: Recipe, i: Key ) => <RecipeListImage title={recipeData.recipe_name} prep_time_in_min={recipeData.prep_time_in_min} meal={recipeData.meal} id={recipeData.recipe_id} rec_img_url={recipeData.rec_img_url} key={i} />);

  return (
    <>
    <Header />
    <div className={styles.recipeContainer}>
      <div className={styles.topRow}>
        <div className={styles.addContainer}>
          <div 
            className={styles.addButton} 
            onClick={() => navigate('/recipes/addRecipe')}
          >
            <h2>Add Recipe</h2>
            <AddClipboardIcon />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Recipes</h1>
        </div>
        <div className={styles.sortFilterContainer}>
          <FiltersButton filterValuesAndCallbacks={filterValuesAndCallbacks} isReview={false}/>
          <SortButton sortBy={sortBy} setSortBy={setSortBy} isReview={false} />
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? <h1>LOADING</h1> : recipesImages}
      </div>
    </div>

    </>
  )
}


