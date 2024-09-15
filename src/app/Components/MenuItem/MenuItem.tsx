import styles from './MenuItem.module.scss';
import { useEffect, useState } from 'react';
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
            activeIcon: '/icon/menu-logo-1active.svg',
            path: '/y',
            key: '/y',
        },
        
        {
            title: 'Content Management',
            icon: '/icon/menu-logo2.svg',
            activeIcon: '',
            path: '/management',
            key: '/q',
        },
        {
            title: 'Home',
            icon: '/icon/menu-logo3.svg',
            activeIcon: '',
            path: '/r',
            key: '/r',
        },
        
        { type: 'header', title: 'DISCOVER', key: 'title' },

        {
            title: 'Artist',
            icon: '/icon/menu-icon-4.svg',
            activeIcon: '',
            path: '/t',
            key: '/t',
        },
        {
            title: 'Track',
            icon: '/icon/menu-icon-5.svg',
            activeIcon: '',
            path: '/d',
            key: '/d',
        },
       
        {
            title: 'Album',
            icon: '/icon/menu-icon-6.svg',
            activeIcon: '',
            path: '/z',
            key: '/z',
        }
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