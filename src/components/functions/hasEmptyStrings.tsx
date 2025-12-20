export default function HasEmptyStrings(list: string[]) {
    for (let string of list) {
        if (string === '') {
            return true;
        }
    }
    return false;
}