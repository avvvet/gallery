import styles from '../../styles/NavHome.module.sass'
import Icon from '../Icon'

const NavHome = ({onHome}) => {
    return (
        <div className={styles.box} onClick={e => onHome(e)} >
            <Icon icon="home_line" />
        </div>
    )
}

export default NavHome
