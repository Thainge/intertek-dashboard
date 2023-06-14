import styles from './loader.module.css';
import Fade from 'react-reveal/Fade';

function Loader({ text }) {
    return (
        <Fade up duration={700} distance={'2em'}>
            <div className={styles.container}>
                <img className={styles.spinner} src={require('../Assets/spinner.png')} />
                <div className={styles.shadow} />
                <div className={styles.text}>{text}</div>
            </div>
        </Fade>
    )
}

export default Loader;