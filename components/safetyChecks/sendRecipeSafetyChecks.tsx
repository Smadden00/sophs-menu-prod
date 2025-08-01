import HasEmptyString from '../functions/hasEmptyStrings'
import ListHasDoubleQuotes from '../functions/listHasDoubleQuotes'

export default function SendRecipeSafetyChecks(recipeName, ingredients, prepTime, rating, meal, instructions) {
    //perform initial safety checks on the data that the client gave
    if( recipeName.trim() == '' ){
        return {field: 'Recipe Name', message: 'There must be a restaurant name.', isError: true}
    }else if( ingredients.length === 0 ){
        return {field: 'Ingredients', message: 'You must add at least one ingredient.', isError: true}
    }else if( prepTime<=0 || prepTime>=1500 ){
        return {field: 'Prep Time', message: 'The value must be between 1 min and 25 hrs.', isError: true}
    }else if( rating <=0 || rating > 10){
        return {field: 'Rating', message: 'The value must be between 0 and 10.', isError: true}
    }else if( !(meal === 'Breakfast' || meal === 'Brunch' || meal === 'Lunch' || meal === 'Dinner'  || meal === 'Snack'  || meal === 'Dessert') ){
        return {field: 'Meal', message: 'Please select a value from the dropdown.', isError: true}
    }else if( instructions.length === 0 ){
        return {field: 'Instructions', message: 'You must have at least one instruction.', isError: true}
    } else if (HasEmptyString(instructions)){
        return {field: 'Instructions', message: 'You cannot have any blank instructions.', isError: true}
    } else if (HasEmptyString(ingredients)){
        return {field: 'Ingredients', message: 'You cannot have any blank ingredients.', isError: true}
    } else {
        return {message: 'No Errors', isError: false}
    }
};