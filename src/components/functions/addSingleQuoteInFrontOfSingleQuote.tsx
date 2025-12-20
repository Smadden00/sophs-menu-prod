export default function AddSingleQuoteInFrontOfSingleQuote(string: string){
    return string.replace(/'/g, "''");
}