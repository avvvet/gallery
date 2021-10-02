import NavBack from './NavBack'
import NavNext from './NavNext'
import NavHome from './NavHome'
import styles from '../../styles/Nav.module.sass'

const Nav = ({onNext, onBack, onHome}) => {
    return (
        <div className={styles.grid}>
          <NavBack onBack={onBack}/>
          <NavHome onHome={onHome}/>
          <NavNext onNext={onNext}/>
        </div>
    )
}

export default Nav
