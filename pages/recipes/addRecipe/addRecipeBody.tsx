import { useState, useEffect } from "react";
import styles from "./addRecipe.module.css";
import TextInput from "../../../components/adding/textInput";
import NumberInput from "../../../components/adding/numberInput";
import ListInput from "../../../components/adding/listInput";
import { useRouter } from "next/router";
import SendRecipe from "../../../components/requests/sendRecipe";
import FileInput from "../../../components/adding/fileInput"
import PrepTimeInput from "../../../components/adding/prepTimeInput";
import DropdownInput from "../../../components/adding/dropdownInput";
import AddingError from "../../../components/adding/addingError";

export default function AddRecipeBody() {
    const router = useRouter();

    const [uploading, setUploading] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [totalPrepTimeInMin, setTotalPrepTimeInMin] = useState(0);
    const [rating, setRating] = useState('');
    const [meal, setMeal] = useState('');
    const [instructions, setInstructions] = useState([]);
    const [imageFile, setImageFile] = useState(undefined);
    const [inputError, setInputError] = useState(null);

    //This function handles the image save
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type ==='image/jpg') {
            setImageFile(file);
          } else {
            alert('Please only upload png or jpg images.');
          }
        }
      };

    // Scroll to the top when inputError is not null
    useEffect(() => {
      if (inputError) {
          window.scrollTo(0, 0);
      }
    }, [inputError]);
    
      const errorAlert = inputError ? <AddingError error={inputError} setInputError={setInputError} /> : null;

  if (uploading){
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={`${styles.title} ${styles.uploadingTitle}`}>
            Uploading
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
          </h1>
        </div>
      </div>
    )
  } else {
  return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Add a Recipe</h1>
            </div>
            <div className={styles.inputsContainer}>
                <TextInput inputTitle="Recipe Name" value={recipeName} callback={setRecipeName} isDescriptionBox={false} />
                <NumberInput type={'Rating 1-10'} inputTitle="Rating" value={rating} callback={setRating} subtext={"1-10"}/>
                <DropdownInput title="Meal" list={['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack', 'Dessert']} value={meal} callback={setMeal} />
                <PrepTimeInput setTotalPrepTimeInMin={setTotalPrepTimeInMin} />
                <ListInput listTitle="Ingredients" array={ingredients} callback={setIngredients}/>
                <ListInput listTitle="Instructions" array={instructions} callback={setInstructions}/>
                <FileInput handleFileChange={handleFileChange} />
            </div>
            <input 
                type="button" 
                value="Submit Recipe"
                style={{margin: '10px'}}
                onClick={() => {
                  SendRecipe(router, recipeName, ingredients, totalPrepTimeInMin, rating, meal, instructions, imageFile, setUploading, setInputError);
                }}
            />
            {errorAlert}
        </div>
    )
  }
}