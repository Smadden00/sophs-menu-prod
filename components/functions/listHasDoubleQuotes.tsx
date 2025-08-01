export default function ListHasDoubleQuotes(list) {
    for (let string of list) {
        if (string.contains('"')) {
            return true;
        }
    }
    return false;
}