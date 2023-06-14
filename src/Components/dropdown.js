import React, { useRef, useState } from 'react';
import useOnClickOutside from '../Hooks/useOnClick';
import { Fade } from 'react-reveal';
import { Link } from "react-router-dom";
import styles from './dropdown.module.css';

function Dropdown({ item }) {
    // Dropdwon state
    const [listOpen, setListOpen] = useState(false);

    // Handle modal close when clicked outside
    const ref = useRef();
    useOnClickOutside(ref, setListOpen);

    return (
        <div className={styles.dropdownContainer} ref={ref}>
            <div className={`${styles.dropButton} ${listOpen ? styles.dropButtonOpen : styles.nothing}`} onClick={() => setListOpen((prev) => !prev)}>{item.default} <i className={styles.arrow}>▼</i></div>
            <Fade up distance={'1em'} duration={300} when={listOpen}>
                <div className={`${styles.dropList} ${listOpen ? styles.nothing : styles.openList}`}>
                    {
                        item.list.map((item, index) => (
                            <Link onClick={() => setListOpen(() => false)} to={item.route} className={styles.listItemBox} key={index}>
                                <div className={styles.dropListItem}>{item.name}</div>
                            </Link>
                        ))
                    }
                </div>
            </Fade>
        </div>
    )
}

export default Dropdown;