import styles from './MenuItem.module.scss';
import { useEffect, } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';



interface menuData {
    title?: string,
    icon?: string,
    activeIcon?: string,
    path?: string,
    key: string,
    type?: string
}



const MenuItem = () => {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === undefined) router.push('/')
    }, [pathname])

    const MenuData: menuData[] = [
        
        {
            title: 'User Management',
            icon: '/icon/menu-icon-1.svg',
            activeIcon: '/icon/clicked-first-menu-icon.svg',
            path: '/',
            key: '/',
        },
        
        {
            title: 'Content Management',
            icon: '/icon/menu-logo2.svg',
            activeIcon: '/icon/active-contents.svg',
            path: '/management',
            key: '/management',
        },
    ]


    return (
        <>
            <div className={styles.main_container}>
                {MenuData.map((item, index) => {
                    const active = item.key === '/' ? pathname === '/' : pathname.startsWith(item.key)
                    if (item.type === 'header') {
                        return <div className={styles.menu_header} key={index}>{item.title}</div>;
                    }
                    return (
                        <div key={item.key} className={active ? styles.clicked_container : styles.container}
                            onClick={() => router.push(`${item.path}`)} >
                            <Image src={`${active ? item.activeIcon : item.icon}`} alt={'logo'} width={24} height={24} />
                            <div className={active ? styles.white_font : styles.font}>
                                {item.title}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;