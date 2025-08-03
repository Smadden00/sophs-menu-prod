import { useState } from "react";
import styles from "./addReview.module.css";
import TextInput from "../../../components/adding/textInput";
import NumberInput from "../../../components/adding/numberInput";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DropdownInput from "../../../components/adding/dropdownInput"
import StateCodes from "../../../components/consts/state_codes";
import SendReview from "../../../components/requests/sendReview";
import AddingError from "../../../components/adding/addingError";
import InputCity from "../../../components/adding/inputCity";

export default function AddReviewBody() {
    const router = useRouter();

    const [restaurantName, setRestaurantName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('')
    const [restaurantType, setRestaurantType] = useState('');
    const [type, setType] = useState([]);
    const [overallRating, setOverallRating] = useState('');
    const [price, setPrice] = useState('');
    const [taste, setTaste] = useState('');
    const [experience, setExperience] = useState('');
    const [description, setDescription] = useState('');
    const [inputError, setInputError] = useState(null);

    const state_codes=StateCodes();
    
    const restaurantTypes = [
        'American', 'Fast Food', 'Italian', 'Mexican', 'Burger Joint', 
        'Pizza Place', 'Asian Fusion', 'Seafood', 'Steakhouse', 'Barbecue', 
        'Breakfast/Brunch', 'Sushi', 'Food Truck', 'Vegetarian/Vegan', 
        'Mediterranean', 'Coffee Shop/Cafe', 'French', 'Brewpubs/Craft Beer Bar', 
        'Southern/Soul Food', 'Thai'
    ];

    // Scroll to the top when inputError is not null
    useEffect(() => {
        if (inputError) {
            window.scrollTo(0, 0);
        }
      }, [inputError]);

    const errorAlert = inputError ? <AddingError error={inputError} setInputError={setInputError} /> : null;

  
  return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Add a Review</h1>
            </div>
            <div className={styles.inputsContainer}>
                <h2 className={styles.firstSectionHeader}>Restaurant Information</h2>
                <TextInput inputTitle="Restaurant Name" value={restaurantName} callback={setRestaurantName} isDescriptionBox={false} />
                <DropdownInput title={"State"} list={state_codes} value={state} callback={setState}/>
                <InputCity currCityVal={city} currCityValCallback={setCity}/>
                <DropdownInput title={"Restaurant Type"} list={restaurantTypes} value={restaurantType} callback={setRestaurantType}/>
                <h2 className={styles.secondSectionHeader}>Your Ratings</h2>
                <NumberInput type={'Rating 1-10'} inputTitle="Overall Rating" value={overallRating} callback={setOverallRating} subtext="Rate from 1-10" />
                <NumberInput type={'Rating 1-4'} inputTitle="Price" value={price} callback={setPrice} subtext="Rate from 1-4 ($ to $$$$)" />
                <NumberInput type={'Rating 1-10'} inputTitle="Taste" value={taste} callback={setTaste} subtext="Rate from 1-10" />
                <NumberInput type={'Rating 1-10'} inputTitle="Experience" value={experience} callback={setExperience} subtext="Rate from 1-10" />
                <TextInput inputTitle="Description" value={description} callback={setDescription} isDescriptionBox={true}/>
            </div>
            <input 
                type="button" 
                value="Submit Review"
                style={{margin: '10px'}}
                onClick={() => {
                    SendReview(router, restaurantName, restaurantType, overallRating, price, taste, experience, description, state, city, setInputError);
                }}
            />
            {errorAlert}
        </div>
)}