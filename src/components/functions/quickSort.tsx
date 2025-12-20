import { Recipe, Review} from "../../types/index"

type SortAttribute = "Price" | "Rating" | "Prep Time";
type SortDirection = "Low to High" | "High to Low";
type SortBy = [SortAttribute, SortDirection];

interface QuickSortPropsRecipe {
    arr: Recipe[];
    sortBy: SortBy;
}

interface QuickSortPropsReview {
    arr: Review[];
    sortBy: SortBy;
}

type QuickSortProps = QuickSortPropsRecipe | QuickSortPropsReview;

// Function overloads
function QuickSort(props: QuickSortPropsRecipe): Recipe[];
function QuickSort(props: QuickSortPropsReview): Review[];

// Implementation
function QuickSort({arr, sortBy}: QuickSortProps): Recipe[] | Review[] {
        if (arr.length <= 1) {
            return arr;
        }
    
        const pivot = arr[0];

        // Check if we're working with Recipe array
        if ('prep_time_in_min' in pivot) {
            // Handle Recipe array
            const recipeArr = arr as Recipe[];
            const recipePivot = pivot as Recipe;
            const leftArr: Recipe[] = [];
            const rightArr: Recipe[] = [];
            
            if(sortBy[1]=== "Low to High"){
                if(sortBy[0] === "Prep Time"){
                    for (let i = 1; i < recipeArr.length; i++) {
                        if (recipeArr[i].prep_time_in_min < recipePivot.prep_time_in_min) {
                            leftArr.push(recipeArr[i]);
                        } else {
                            rightArr.push(recipeArr[i]);
                        }
                    }
                } else if (sortBy[0] === "Rating"){
                    for (let i = 1; i < recipeArr.length; i++) {
                        if (recipeArr[i].avg_rating < recipePivot.avg_rating) {
                            leftArr.push(recipeArr[i]);
                        } else {
                            rightArr.push(recipeArr[i]);
                        }
                    }
                }
            } else {
                if(sortBy[0] === "Prep Time"){
                    for (let i = 1; i < recipeArr.length; i++) {
                        if (recipeArr[i].prep_time_in_min > recipePivot.prep_time_in_min) {
                            leftArr.push(recipeArr[i]);
                        } else {
                            rightArr.push(recipeArr[i]);
                        }
                    }
                } else if (sortBy[0] === "Rating"){
                    for (let i = 1; i < recipeArr.length; i++) {
                        if (recipeArr[i].avg_rating > recipePivot.avg_rating) {
                            leftArr.push(recipeArr[i]);
                        } else {
                            rightArr.push(recipeArr[i]);
                        }
                    }
                }
            }
            
            return [...QuickSort({arr: leftArr, sortBy}), recipePivot, ...QuickSort({arr: rightArr, sortBy})];
        } else {
            // Handle Review array
            const reviewArr = arr as Review[];
            const reviewPivot = pivot as Review;
            const leftArr: Review[] = [];
            const rightArr: Review[] = [];
            
            if(sortBy[1]=== "Low to High"){
                if(sortBy[0] === "Price"){
                    for (let i = 1; i < reviewArr.length; i++) {
                        if (reviewArr[i].price < reviewPivot.price) {
                            leftArr.push(reviewArr[i]);
                        } else {
                            rightArr.push(reviewArr[i]);
                        }
                    }
                } else if (sortBy[0] === "Rating"){
                    for (let i = 1; i < reviewArr.length; i++) {
                        if (Number(reviewArr[i].o_rating) < Number(reviewPivot.o_rating)) {
                            leftArr.push(reviewArr[i]);
                        } else {
                            rightArr.push(reviewArr[i]);
                        }
                    }
                }
            } else {
                if(sortBy[0] === "Price"){
                    for (let i = 1; i < reviewArr.length; i++) {
                        if (reviewArr[i].price > reviewPivot.price) {
                            leftArr.push(reviewArr[i]);
                        } else {
                            rightArr.push(reviewArr[i]);
                        }
                    }
                } else if (sortBy[0] === "Rating"){
                    for (let i = 1; i < reviewArr.length; i++) {
                        if (Number(reviewArr[i].o_rating) > Number(reviewPivot.o_rating)) {
                            leftArr.push(reviewArr[i]);
                        } else {
                            rightArr.push(reviewArr[i]);
                        }
                    }
                }
            }
            
            return [...QuickSort({arr: leftArr, sortBy}), reviewPivot, ...QuickSort({arr: rightArr, sortBy})];
        }
    }

export default QuickSort;
  