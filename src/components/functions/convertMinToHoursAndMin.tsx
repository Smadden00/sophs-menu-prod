export default function ConvertMinToHoursAndMin(totalMin: number){
    const hours = Math.floor(totalMin/60);
    const min = totalMin%60;
    return {hours, min};
  }
