export default function BuildPriceSigns(price){
    let signs = ''
    for(let i=0; i<price; i++){
        signs+='$'
    }
    return signs
  }
