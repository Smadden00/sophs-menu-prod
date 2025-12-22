export default function SendReviewSafetyChecks(restaurantName: string, restaurantType: string, overallRating: number, price: number, taste: number, experience: number, description: string, city: string) {
        //perform initial safety checks on the data that the client gave
        if( restaurantName.trim() == '' ){
            return {field: 'Restaurant Name', message: 'There must be a restaurant name.', isError: true}
        }else if( restaurantType.trim() == '' ){
            return {field: 'Restaurant Type', message: 'You must select a restaurant type.', isError: true}
        }else if( !(overallRating >= 0 && overallRating <= 10) ){
            return {field: 'Overall Rating', message: 'The value must be between 0 and 10.', isError: true}
        }else if( !(price >= 1 && price <= 4) ){
            return {field: 'Price', message: 'The value must be between 1 and 4, inclusive.', isError: true}
        }else if( !(taste >= 0 && taste <= 10)){
            return {field: 'Taste', message: 'The value must be between 0 and 10.', isError: true}
        }else if( !(experience >= 0 && experience <= 10) ){
            return {field: 'Experience', message: 'The value must be between 0 and 10.', isError: true}
        }else if( description.trim() == '' ){
            return {field: 'Description', message: 'You must input a value in description.', isError: true}
        } else {
            return {message: 'No errors', isError: false, field: "N/A"}
        }
    };