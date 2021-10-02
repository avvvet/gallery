import Photo from './Photo'
import Nav from './Nav/Nav'
import styles from '../styles/Photos.module.sass'

const Photos = ({ photos, onNext, onBack, onHome }) => {
    return (
        <div>
        <div className={styles.board}>
            {photos.map((photo) => (
                <Photo key={photo} photo={photo}/>
            ))} 
        </div>
        <Nav onNext={onNext} onBack={onBack} onHome={onHome}/>
        </div>
    )
}

export default Photos