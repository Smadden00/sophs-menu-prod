import { useState } from "react";
import styles from "./addReview.module.css";
import TextInput from "../../../components/adding/textInput.js";
import NumberInput from "../../../components/adding/numberInput.js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DropdownInput from "../../../components/adding/dropdownInput.js"
import StateCodes from "../../../components/consts/state_codes.js";
import SendReview from "../../../components/requests/SendReview.js";
import FetchCities from "../../../components/requests/fetchCities.js";
import SearchCities from "../../../components/adding/searchCities.js";
import AddingError from "../../../components/adding/addingError.js";

export default function AddReviewBody() {
    const router = useRouter();

    const [restaurantName, setRestaurantName] = useState('');
    const [state, setState] = useState('');
    const [cities, setCities] = useState([]);
    const [citiesLoading, setCitiesLoading] = useState(true);
    const [city, setCity] = useState('')
    const [type, setType] = useState([]);
    const [overallRating, setOverallRating] = useState('');
    const [price, setPrice] = useState('');
    const [taste, setTaste] = useState('');
    const [experience, setExperience] = useState('');
    const [description, setDescription] = useState('');
    const [inputError, setInputError] = useState(null);

    const state_codes=StateCodes();

    useEffect(() => {
        if(state!==''){
            setCitiesLoading(true);
            FetchCities(state, setCities, setCitiesLoading);
        }
      },[state]);

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
                <TextInput inputTitle="Restaurant Name" value={restaurantName} callback={setRestaurantName} />
                <DropdownInput title={"State"} list={state_codes} value={state} callback={setState}/>
                <SearchCities cities={cities} currCityVal={city} currCityValCallback={setCity}/>
                <h2 className={styles.secondSectionHeader}>Your Ratings</h2>
                <NumberInput type={'Rating 1-10'} inputTitle="Overall Rating" value={overallRating} callback={setOverallRating} />
                <NumberInput type={'Rating 1-4'} inputTitle="Price" value={price} callback={setPrice} />
                <NumberInput type={'Rating 1-10'} inputTitle="Taste" value={taste} callback={setTaste} />
                <NumberInput type={'Rating 1-10'} inputTitle="Experience" value={experience} callback={setExperience} />
                <TextInput inputTitle="Description" value={description} callback={setDescription} textarea={true} isDescriptionBox={true}/>
            </div>
            <input 
                type="button" 
                value="Submit Review"
                style={{margin: '10px'}}
                onClick={() => {
                    SendReview(router, restaurantName, overallRating, price, taste, experience, description, state, city, cities, setInputError);
                }}
            />
            {errorAlert}
        </div>
)}