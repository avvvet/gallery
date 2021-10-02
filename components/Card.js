import Photos from './Photos'
import styles from '../styles/Card.module.sass'

const Card = ({title, description, photos, onNext, onBack, onHome}) => {
  return (
        <div className={styles.card}>
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}> 
                {description}
            </div>
            <Photos photos={photos} onNext={onNext} onBack={onBack} onHome={onHome}></Photos>
          </div>
        </div>
    )
}

export default Card