import styles from '../styles/Layout.module.sass'

const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
               {children}
            </main>
        </div>
    )
}

export default Layout