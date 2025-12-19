export default function HasEmptyStrings(list) {
    for (let string of list) {
        if (string === '') {
            return true;
        }
    }
    return false;
}