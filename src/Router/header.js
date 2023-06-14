
import Dropdown from '../Components/dropdown';
import styles from './header.module.css';
import { Login } from '@microsoft/mgt-react';

function Header() {
    let navList = [
        {
            default: 'Dashboard',
            list: [
                {
                    name: 'Consultants',
                    route: 'consultants'
                },
                {
                    name: 'Business Units',
                    route: 'businessunits'
                },
            ],
        }
    ]

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logoBox}>
                    <img src={require('../Assets/logo.png')} className={styles.logo} />
                </div>
                {
                    navList.map((item, index) => (
                        <Dropdown item={item} key={index} />
                    ))
                }
                <div className={styles.login}>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default Header;