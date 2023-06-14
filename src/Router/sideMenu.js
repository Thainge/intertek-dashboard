import styles from './sideMenu.module.css';
import SideMenuItem from './sideMenuItem';

function SideMenu() {

    const navList = [
        {
            title: 'Dashboard',
            image: require('../Assets/metrics.png'),
            links: [
                {
                    name: 'Consultants',
                    route: 'consultants'
                },
                {
                    name: 'Business Units',
                    route: 'businessunits'
                },
            ]
        },
        {
            title: 'Tools',
            image: require('../Assets/data.png'),
            links: [
                {
                    name: 'Sharepoint Data Tool',
                    route: 'SharepointDataTool'
                },
            ]
        },
    ]

    return (
        <>
            <div className={styles.bgOverlay} />

            <div className={styles.container}>
                <div className={styles.listContainer}>
                    {
                        navList.map((navItem, index) => (
                            <div className={styles.navItemContainer} key={index}>
                                <div className={styles.rowHeader}>
                                    <div className={styles.imgBox}>
                                        <img src={navItem.image} className={styles.rowImage} />
                                    </div>
                                    <div>{navItem.title}</div>
                                </div>
                                {
                                    navItem.links.map((item, index) => (
                                        <SideMenuItem item={item} key={index} />
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div >
        </>
    )
}

export default SideMenu;