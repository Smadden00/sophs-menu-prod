import styles from "./minMaxSliders.module.css"
import { useState, useEffect } from "react"

export default function MinMaxSliders({lowerVal, setLowerVal, upperVal, setUpperVal, min, max, step}) {
        
  return (
    <div className={styles.container}>
        <div className={styles.sliderContainer}>
            <p>Min: </p>
            <input
                type="range"
                className={styles.slider}
                min={min}
                max={max}
                step={step}
                value={lowerVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), upperVal);
                    setLowerVal(value);
                }}
            />
            <p>{lowerVal}</p>
        </div>
        <div className={styles.sliderContainer}>
            <p>Max: </p>
            <input
                type="range"
                className={styles.slider}
                min={min}
                max={max}
                step={step}
                value={upperVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), lowerVal);
                    setUpperVal(value);
                }}
            />
            <p>{upperVal}</p>
        </div>
    </div>
)}

/*
            className="thumb thumb--left"
            style={{ zIndex: lowerVal > max - 100 && "5" }}

            className="thumb thumb--right"

*/