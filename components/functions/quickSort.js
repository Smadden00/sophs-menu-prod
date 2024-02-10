export default function QuickSort (arr, sortBy){
    if (arr.length <= 1) {
      return arr;
    }
  
    let pivot = arr[0];
    let leftArr = [];
    let rightArr = [];

    //This sort by first checks if it is being sorted by low to high or high to low
    if(sortBy[1]=== "Low to High"){
        //if it is being sorted by low to high then it checks what attribute it is sorting by
        //First it checks for price
        if(sortBy[0] === "Price"){
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].price < pivot.price) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
        } else if (sortBy[0] === "Rating"){
        //if it is not sorting by price then it is sorting by o_rating
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].o_rating < pivot.o_rating) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
        } else if (sortBy[0] === "Prep Time"){
            //if it is being sorted by prep time
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].prep_time_in_min < pivot.prep_time_in_min) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
    }
    } else { // This will be true if it is not being sorted by Low to High (it will be sorted by High to low)
        //First it checks if it is sorting by price
        if(sortBy[0] === "Price"){
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].price > pivot.price) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
        } else if (sortBy[0] === "Rating"){
        //if it is not sorting by price then it is sorting by o_rating
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].o_rating > pivot.o_rating) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
        } else if (sortBy[0] === "Prep Time"){
        //if it is not sorting by price then it is sorting by o_rating
            for (let i = 1; i < arr.length; i++) {
                if (arr[i].prep_time_in_min > pivot.prep_time_in_min) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
    }
    }
  
    return [...QuickSort(leftArr, sortBy), pivot, ...QuickSort(rightArr, sortBy)];
  };
  