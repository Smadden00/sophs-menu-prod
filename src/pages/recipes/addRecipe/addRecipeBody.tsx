import { useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./addRecipe.module.css";
import TextInput from "../../../components/adding/textInput";
import ListInput from "../../../components/adding/recipes/listInput";
import { useNavigate } from "react-router-dom";
import SendRecipe from "../../../components/requests/sendRecipe";
import FileInput from "../../../components/adding/fileInput"
import PrepTimeInput from "../../../components/adding/recipes/prepTimeInput";
import DropdownInput from "../../../components/adding/dropdownInput";
import AddingError from "../../../components/adding/addingError";
import { useAuth0 } from "@auth0/auth0-react";

export default function AddRecipeBody() {
    const navigate = useNavigate();

    const { getAccessTokenSilently } = useAuth0();

    const [uploading, setUploading] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [totalPrepTimeInMin, setTotalPrepTimeInMin] = useState(0);
    const [meal, setMeal] = useState('');
    const [imageFile, setImageFile] = useState<File | undefined>(undefined);
    const [inputError, setInputError] = useState<{ isError: boolean; message: string; } | null>(null);

    //This function handles the image save
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
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

    const handleSubmit = () => {
      if (!imageFile) {
        setInputError({
          isError: true,
          message: 'Please upload an image for the recipe.'
        });
        return;
      }
      
      SendRecipe({navigate, recipeName, ingredients, prepTime: totalPrepTimeInMin, meal, instructions, imageFile, setUploading, setInputError, getAccessTokenSilently});
    };
    
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
                onClick={handleSubmit}
            />
            {errorAlert}
        </div>
    )
  }
}