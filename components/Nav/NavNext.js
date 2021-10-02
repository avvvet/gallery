import styles from '../../styles/NavNext.module.sass'
import Icon from '../Icon'

const NavNext = ({onNext}) => {
    return (
        <div className={styles.box} onClick={e => onNext(e)}>
            <Icon icon="arrow_right_line" />
        </div>
    )
}

export default NavNext
