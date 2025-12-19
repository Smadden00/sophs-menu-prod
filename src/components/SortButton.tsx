import { useState } from "react";
import styles from "./SortButton.module.css";

interface SortButtonProps {
  sortBy: [string, string];
  setSortBy: (sortBy: [string, string]) => void;
  isReview?: boolean;
}

export default function SortButton({ sortBy, setSortBy, isReview = true }: SortButtonProps) {
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
          {isReview ? (
            <>
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
            </>
          ) : (
            <>
              <div 
                className={styles.dropdownOption}
                onClick={() => {
                  setSortBy(["Prep Time", "High to Low"]);
                  setIsDropdownOpen(false);
                }}
              >
                Prep Time, High to Low
              </div>
              <div 
                className={styles.dropdownOption}
                onClick={() => {
                  setSortBy(["Prep Time", "Low to High"]);
                  setIsDropdownOpen(false);
                }}
              >
                Prep Time, Low to High
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
