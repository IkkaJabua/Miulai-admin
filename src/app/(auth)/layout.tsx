import styles from './layout.module.scss';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            {children}
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