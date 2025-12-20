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

// Helper function to get comparable value
function getCompareValue(item: Recipe | Review, attribute: SortAttribute): number {
    if ('prep_time_in_min' in item) {
        // Recipe type
        return attribute === "Prep Time" ? item.prep_time_in_min : item.avg_rating;
    } else {
        // Review type
        return attribute === "Price" ? item.price : Number(item.o_rating);
    }
}

// Function overloads
function QuickSort(props: QuickSortPropsRecipe): Recipe[];
function QuickSort(props: QuickSortPropsReview): Review[];

// Implementation
function QuickSort({arr, sortBy}: QuickSortProps): Recipe[] | Review[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const [attribute, direction] = sortBy;
    const isAscending = direction === "Low to High";
    
    const pivotValue = getCompareValue(pivot, attribute);
    
    // Type-safe partition based on array type
    if ('prep_time_in_min' in pivot) {
        const recipeArr = arr as Recipe[];
        const leftArr: Recipe[] = [];
        const rightArr: Recipe[] = [];
        
        for (let i = 1; i < recipeArr.length; i++) {
            const currentValue = getCompareValue(recipeArr[i], attribute);
            const shouldGoLeft = isAscending 
                ? currentValue < pivotValue 
                : currentValue > pivotValue;
            
            if (shouldGoLeft) {
                leftArr.push(recipeArr[i]);
            } else {
                rightArr.push(recipeArr[i]);
            }
        }
        
        return [...QuickSort({arr: leftArr, sortBy}), pivot as Recipe, ...QuickSort({arr: rightArr, sortBy})];
    } else {
        const reviewArr = arr as Review[];
        const leftArr: Review[] = [];
        const rightArr: Review[] = [];
        
        for (let i = 1; i < reviewArr.length; i++) {
            const currentValue = getCompareValue(reviewArr[i], attribute);
            const shouldGoLeft = isAscending 
                ? currentValue < pivotValue 
                : currentValue > pivotValue;
            
            if (shouldGoLeft) {
                leftArr.push(reviewArr[i]);
            } else {
                rightArr.push(reviewArr[i]);
            }
        }
        
        return [...QuickSort({arr: leftArr, sortBy}), pivot as Review, ...QuickSort({arr: rightArr, sortBy})];
    }
}

export default QuickSort;
  