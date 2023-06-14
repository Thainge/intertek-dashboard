import React, { useState, useRef } from 'react';
import styles from './listTableHeader.module.css';
import useOnClickOutside from '../Hooks/useOnClick';
import { Fade } from 'react-reveal';
import ls from 'local-storage';
import sortByDay from '../Hooks/sortByDay';

function ListTableHeader({ business, cleanConsulantList, setConsultantList, searchTerm1, searchTerm2 }) {
    let FilterType = business ? 'IntertekFiltersUnits' : 'IntertekFiltersConsultants'

    const [filterOpen, setFilterOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    function inputChange(e) {
        setSearchValue(() => e.target.value);

        let inputVal = e.target.value.toLowerCase();

        let newData = cleanConsulantList.filter((item) => {
            let primary = item[searchTerm1].toLowerCase();
            let secondary = item[searchTerm2].toLowerCase();

            if (primary.includes(inputVal) || secondary.includes(inputVal)) {
                return item;
            }
        });

        setConsultantList(() => newData);
    }

    const ref = useRef(null);
    useOnClickOutside(ref, setFilterOpen);

    let defaultFilters = {
        days: 2,
        unit: -1,
        industry: -1,
    }
    let chosenFilters = defaultFilters;
    let intitialFilters = ls.get(FilterType);

    if (intitialFilters) {
        chosenFilters = intitialFilters;
    }

    const [filters, setFilters] = useState(chosenFilters);

    function setFiltersObj(index, type) {
        let newObj = { ...filters };
        newObj[type] = index;

        setFilters(() => newObj);
        filterData(newObj);
        ls.set(FilterType, newObj);
    }

    function filterDefault() {
        setFilters(() => defaultFilters);
        filterData(defaultFilters);
        ls.set(FilterType, defaultFilters);
    }

    function filterData(filtersObj) {
        let filteredItems = [];

        Object.keys(filtersObj).map((item, index) => {
            let foundValue = filtersObj[item];
            if (foundValue > -1) {
                let foundFilter = null;
                if (item === 'days') {
                    foundFilter = days[foundValue];
                }

                if (item === 'unit') {
                    foundFilter = businessUnits[foundValue];
                }

                if (item === 'industry') {
                    foundFilter = industry[foundValue];
                }
                filteredItems.push(foundFilter);
            }
        });

        let daysVal = filteredItems.find((item) => item.type === 'day');
        let readySort = sortByDay(parseInt(daysVal.value), cleanConsulantList);
        setConsultantList(() => readySort);
    }

    const days = [
        {
            name: '7',
            value: '7',
            type: 'day',
        },
        {
            name: '30',
            value: '30',
            type: 'day',
        },
        {
            name: '120',
            value: '120',
            type: 'day',
        },
        {
            name: 'Any Time',
            value: '9999',
            type: 'day',
        }
    ]

    const businessUnits = [
        { name: 'Barnes BU', value: 'barnes', type: 'unit' },
        { name: 'Bronson BU', value: 'bronson', type: 'unit' },
        { name: 'Roman BU', value: 'roman', type: 'unit' },
        { name: 'Reynard BU', value: 'reynard', type: 'unit' },
        { name: 'Xander BU', value: 'xander', type: 'unit' },
    ]

    const industry = [
        { name: 'Engineering', value: 'engineering', type: 'industry' },
        { name: 'Electrical', value: 'electrical', type: 'industry' },
        { name: 'Healthcare', value: 'healthcare', type: 'industry' },
        { name: 'Digital', value: 'digital', type: 'industry' },
        { name: 'Cyber', value: 'cyber', type: 'industry' },
    ]

    return (
        <div className={styles.header}>
            <label className={styles.searchLabel}>
                <img src={require('../Assets/search.png')} className={styles.searchImage} />
                <input maxLength={50} type='search' value={searchValue} onChange={inputChange} placeholder={business ? 'Search Business Units' : 'Search Consultants'} className={styles.inputSearch} />
            </label>
            <div className={styles.filtersContainer} ref={ref}>
                <div className={styles.filterButton} onClick={() => setFilterOpen((prev) => !prev)}>Filter By</div>
                <Fade up distance={'1em'} duration={200} when={filterOpen}>
                    <div className={`${styles.filterOverlay} ${filterOpen ? styles.nothing : styles.filterOpen}`}>
                        <div className={styles.rowSplitter}>Time</div>
                        <div className={styles.radioContainer}>
                            {
                                days.map((item, index) => (
                                    <label className={styles.radioLabel} key={index}>
                                        {
                                            item.value < 9000 ? <>
                                                Last {item.name} days
                                            </> : item.name
                                        }
                                        <input type='radio' value={item} onChange={() => setFiltersObj(index, 'days')} checked={filters['days'] === index} className={styles.radioButton} />
                                        <span className={styles.radioCircle}></span>
                                    </label>
                                ))
                            }
                        </div>
                        <div className={styles.rowSplitter}>Business Unit</div>
                        <div className={styles.radioContainer}>
                            {businessUnits.map((item, index) => (
                                <label className={styles.radioLabel} key={index}>
                                    {item.name}
                                    <input type='radio' value={item} onChange={() => setFiltersObj(index, 'unit')} checked={filters['unit'] === index} />
                                    <span className={styles.radioCircle}></span>
                                </label>
                            ))}
                        </div>
                        <div className={styles.rowSplitter}>Industry</div>
                        <div className={styles.radioContainer}>
                            {industry.map((item, index) => (
                                <label className={styles.radioLabel} key={index}>
                                    {item.name}
                                    <input type='radio' value={item} onChange={() => setFiltersObj(index, 'industry')} checked={filters['industry'] === index} />
                                    <span className={styles.radioCircle}></span>
                                </label>
                            ))}
                        </div>
                        <div className={`${styles.filterButton} ${styles.applyButton}`} onClick={filterDefault}>Clear</div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default ListTableHeader;