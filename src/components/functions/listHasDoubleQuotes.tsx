export default function ListHasDoubleQuotes(list: string[]) {
    for (let string of list) {
        if (string.includes('"')) {
            return true;
        }
    }
    return false;
}