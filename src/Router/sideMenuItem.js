import styles from './sideMenuItem.module.css';
import { Link, useLocation, useParams } from 'react-router-dom';

function SideMenuItem({ item }) {
    const location = useLocation();
    const itemPath = item.route.toLowerCase();
    const locationName = location.pathname.slice(1, 30).toLowerCase();
    let isSame = locationName.includes(itemPath) ? true : false;

    return (
        <Link to={item.route} className={`${styles.listItemBox} ${isSame ? styles.listItemActive : styles.nothing}`}>
            <div className={styles.listItem}>{item.name}</div>
        </Link>
    )
}

export default SideMenuItem;