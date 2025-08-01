import styles from "./Recipes.module.css";
import Header from "../../components/header";
import RecipeListImage from "../../components/recipeListImage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddClipboardIcon from '../../components/svgs/addClipboardIcon'
import FiltersButton from "../../components/filters/filtersButton";
import QuickSort from "../../components/functions/quickSort";
import SeparateSortBy from "../../components/functions/separateSortBy";

export default function Recipes() {
  const router = useRouter();
  const [recipesData, setRecipesData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [lowerPrepTime, setLowerPrepTime] = useState(0);
  const [upperPrepTime, setUpperPrepTime] = useState(1500);
  const [mealFilter, setMealFilter] = useState(['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert']);
  const [sortBy, setSortBy] = useState(['Prep Time', 'Low to High']);

  const filterValuesAndCallbacks = {
    lowerPrepTime: lowerPrepTime,
    setLowerPrepTime: setLowerPrepTime,
    upperPrepTime: upperPrepTime,
    setUpperPrepTime: setUpperPrepTime,
    mealFilter: mealFilter,
    setMealFilter: setMealFilter
  };

  //Load in all the data
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try{
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Error in fetching all recipes.');
        }
        const javascriptResponse = await response.json();
        const recipesData = javascriptResponse.body.rows;
        setRecipesData(recipesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      }
    };

    fetchAllRecipes();
  },[]);

  //filter out reviews based on filters
  const filteredRecipes = recipesData.filter((recipe) => {
    if(
      recipe.prep_time_in_min >= lowerPrepTime && 
      recipe.prep_time_in_min <= upperPrepTime &&
      mealFilter.includes(recipe.meal)
    ){
      return recipe
    } 
    return false
  });

  const sortedFilteredReviews = QuickSort(filteredRecipes, sortBy);

  //build the images of each recipe
  const recipesImages = sortedFilteredReviews.map((recipeData, i) => <RecipeListImage title={recipeData.recipe_name} prep_time_in_min={recipeData.prep_time_in_min} meal={recipeData.meal} id={recipeData.recipe_id} key={i} />);

  return (
    <>
    <Header />
    <div className={styles.recipeContainer}>
      <div className={styles.topRow}>
        <div className={styles.addContainer}>
          <div 
            className={styles.addButton} 
            onClick={() => router.push('recipes/addRecipe')}
          >
            <h2>Add Recipe</h2>
            <AddClipboardIcon />
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Recipes</h1>
        </div>
        <div className={styles.sortFilterContainer}>
          <div className={styles.sortContainer}>
            <select className={styles.stateDropdown} id="sort-dropdown" value={sortBy[0] + ", " + sortBy[1]} onChange={(e)=>setSortBy(SeparateSortBy(e.target.value))}>
              <option key="PrepTimeHigh" value="Prep Time, High to Low">Prep Time, High to Low</option>
              <option key="PrepTimeLow" value="Prep Time, Low to High">Prep Time, Low to High</option>
            </select>
          </div>
          <FiltersButton filterValuesAndCallbacks={filterValuesAndCallbacks} isReview={false}/>
        </div>
      </div>
      <div className={styles.content}>
        {isLoading ? <h1>LOADING</h1> : recipesImages}
      </div>
    </div>

    </>
)}


