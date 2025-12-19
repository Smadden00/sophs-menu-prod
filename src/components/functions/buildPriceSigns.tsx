export default function BuildPriceSigns(price: number): string {
    let signs = ''
    for(let i=0; i<price; i++){
        signs+='$'
    }
    return signs
  }
