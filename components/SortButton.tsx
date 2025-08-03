import { useState } from "react";
import styles from "./SortButton.module.css";

interface SortButtonProps {
  sortBy: [string, string];
  setSortBy: (sortBy: [string, string]) => void;
}

export default function SortButton({ sortBy, setSortBy }: SortButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles.sortContainer}>
      <div 
        className={styles.sortDropdown} 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h2>{sortBy[0] + ", " + sortBy[1]}</h2>
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <div 
            className={styles.dropdownOption}
            onClick={() => {
              setSortBy(["Rating", "High to Low"]);
              setIsDropdownOpen(false);
            }}
          >
            Rating, High to Low
          </div>
          <div 
            className={styles.dropdownOption}
            onClick={() => {
              setSortBy(["Rating", "Low to High"]);
              setIsDropdownOpen(false);
            }}
          >
            Rating, Low to High
          </div>
          <div 
            className={styles.dropdownOption}
            onClick={() => {
              setSortBy(["Price", "High to Low"]);
              setIsDropdownOpen(false);
            }}
          >
            Price, High to Low
          </div>
          <div 
            className={styles.dropdownOption}
            onClick={() => {
              setSortBy(["Price", "Low to High"]);
              setIsDropdownOpen(false);
            }}
          >
            Price, Low to High
          </div>
        </div>
      )}
    </div>
  );
}
