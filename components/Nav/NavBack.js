import styles from '../../styles/NavBack.module.sass'
import Icon from '../Icon'

const NavBack = ({onBack}) => {
    return (
        <div className={styles.box} onClick={e => onBack(e)}>
            <Icon icon="arrow_left_line" />
        </div>
    )
}

export default NavBack
