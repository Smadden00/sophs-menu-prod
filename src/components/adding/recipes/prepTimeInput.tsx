import { useState, useEffect } from "react";
import styles from "./prepTimeInput.module.css";
import NumberInput from "../numberInput";

export default function PrepTimeInput({setTotalPrepTimeInMin}: {setTotalPrepTimeInMin: (time: number) => void}) {
    
  const [prepTimeHours, setPrepTimeHours] = useState<number>(-1);
  const [prepTimeMin, setPrepTimeMin] = useState<number>(-1);
    
  useEffect(()=> {
    const totalPrepTimeInMin = (Number(prepTimeHours)*60)+Number(prepTimeMin);
    setTotalPrepTimeInMin(totalPrepTimeInMin);
  }, [prepTimeHours, prepTimeMin])

  return (
        <div className={styles.container}>
          <h2 className={styles.title}>Prep Time</h2>
          <div className={styles.inputsContainer}>
            <NumberInput type={'Rating Hours'} inputTitle="Hours" value={prepTimeHours} callback={setPrepTimeHours} subtext={"Prep Time Hours"}/>
            <NumberInput type={'Rating Minutes'} inputTitle="Min" value={prepTimeMin} callback={setPrepTimeMin} subtext={"Prep Time Minutes"} />
          </div>
        </div>
)}