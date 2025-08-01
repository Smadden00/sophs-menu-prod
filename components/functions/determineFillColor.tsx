export default function DetermineFillColor(val: number): string {
    if(val<=3.5){
        return '#FF5656';
    } else if(val>=6.5){
        return '#4fd86a';
    } else {
        return '#faf332';
    }
}