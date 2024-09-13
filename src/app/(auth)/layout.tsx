import Menu from '../Components/Menu/Menu';
import styles from './layout.module.scss';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Menu />
                {children}
            </div>
        </div>
    )
}


// {/* <div className={styles.container}>
//     <div className={styles.ordynaryMenu}>
//         {/* <Menu /> */}
//     </div>
//     <div className={styles.burgerMenu}>
//         <BurgerMenu />
//     </div>
//     {children}
//     <div className={styles.container2}>
//         <IndexPage />
//     </div>
//     <MobileMenu />
// </div> */}