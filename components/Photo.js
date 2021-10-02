import Image from 'next/image'
import styles from '../styles/Photo.module.sass'
import Icon from './Icon'

export default function Photo({ photo}) {
    return (
        <div className={styles.box}>
            <Image 
                src={'/' + photo + '.jpg'}
                alt={photo}
                layout='fill'
            />
            <div className={styles.overlay}>
              <Icon icon="eye_line" />
            </div>
        </div>
    )
}
