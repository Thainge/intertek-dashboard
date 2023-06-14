import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './filterItem.module.css';

function FilterItem({ unit, industry, item, filterByValue }) {
    const location = useLocation();

    let paramString = '';
    let checkedArr = []

    if (unit) {
        checkedArr = new URLSearchParams(location.search).getAll('f-bu');
        paramString = 'f-bu';
    }
    if (industry) {
        checkedArr = new URLSearchParams(location.search).getAll('f-ind')
        paramString = 'f-ind';
    }

    let checkedVal = checkedArr.find((val) => val === item.value);

    let defaultChecked = false;
    if (checkedVal === item.value) {
        defaultChecked = true;
    }

    // Initial filter value is checked for URL params
    const [checked, setChecked] = useState(defaultChecked);
    const [hovering, setHovering] = useState(false);

    // Toggles checkbox
    function toggleValue() {
        setChecked((prev) => {
            return !prev;
        });
        filterByValue(item.value, !checked, paramString);
    }

    return (
        <div className={styles.filterItemBox} onMouseEnter={() => setHovering(() => true)} onMouseLeave={() => setHovering(() => false)} onClick={toggleValue}>
            <div className={styles.filterItem}>
                <div className={`${styles.checkbox} ${hovering ? styles.hovering : styles.nothing} ${checked ? styles.checked : styles.nothing}`}>
                    {checked ? '✔' : ''}
                </div>
                <div className={styles.filterText}>{item.name}</div>
            </div>
        </div>
    )
}

export default FilterItem;