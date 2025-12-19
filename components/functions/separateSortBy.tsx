export default function SeparateSortBy(string) {
    //This function takes in the sort by value which will be an attribute to sort by followed by low to high or high to low. 
    //This function will take in that single string and separate it into a list of two strings
    const commaIndex = string.indexOf(",");
    const attribute = string.slice(0,commaIndex);
    const direction = string.slice(commaIndex+2);
    return [attribute, direction];
}
