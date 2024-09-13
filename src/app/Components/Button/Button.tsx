import styles from './Button.module.scss';
import Image from 'next/image';

type Props = {
    onClick?: () => void;
    title: string;
    image?: string;
    mode?: 'fill' | 'outline'
    className: string;
}

const Button = (props: Props) => {
    const classes = [styles.container];

    if (props.mode === 'fill') classes.push(styles.fill)
    else classes.push(styles.outline)

    return (
        <button className={`${classes.join(' ').trim()} ${props.className}`} onClick={props.onClick}>
            {
                props.image
                &&
                <Image src={`${props.image}`} alt='image' width={23} height={23} />
            }

            <span className={styles.title}>
                {props.title}
            </span>
        </button >
    )
}

export default Button;