import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './headerItem.module.css';

function HeaderItem({ business, sortFunction, item, currentSortHeader, setCurrentSortHeader }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Handles descending state
    let isSame = currentSortHeader.name === item.name ? true : false;
    const [sortDescend, setSortDescend] = useState(isSame);

    // Sorts by column
    function sortByHeader() {
        setCurrentSortHeader(() => {
            let readyObj = {
                name: item.name,
                value: item.value,
                descending: !sortDescend
            };
            return readyObj;
        });

        setSortDescend((prev) => !prev);
        sortFunction(item.value, !sortDescend);

        // Update url params
        const searchParams = new URLSearchParams(location.search);
        searchParams.toString();

        // update browser url
        let usedRoute = business ? '/businessunits' : '/consultants'
        navigate(usedRoute + '?' + searchParams.toString());
    }

    // If it's not the same, set descending to false
    useEffect(() => {
        if (!isSame) {
            setSortDescend(() => false);
        }
    }, [currentSortHeader]);

    return (
        <div className={styles.listHeaderItem} onClick={sortByHeader}>
            <div className={isSame ? styles.same : styles.nothing}>{item.name}</div>
            <div className={styles.headerArrows}>
                {sortDescend ? '▼' : '▲'}
            </div>
        </div>
    )
}

export default HeaderItem;