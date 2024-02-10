export default function AddSingleQuoteInFrontOfSingleQuote(string){
    return string.replace(/'/g, "''");
}