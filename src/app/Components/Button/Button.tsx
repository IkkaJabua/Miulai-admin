import styles from './Button.module.scss';
import Image from 'next/image';

type Props = {
    onClick?: (() => void) | undefined;
    title: string;
    image?: string;
    mode?: 'fill' | 'outline' | 'unset';
    className?: string; // Make className optional
    type?: 'button' | 'submit' | 'reset'; // Add type prop
};

const Button = (props: Props) => {
    const classes = [styles.container];

    if (props.mode === 'fill') classes.push(styles.fill);
    else if (props.mode === 'outline') classes.push(styles.outline);
    else classes.push(styles.unset);

    return (
        <button
            type={props.type || 'button'} // Default type to 'button'
            className={`${classes.join(' ').trim()} ${props.className || ''}`} // Handle optional className
            onClick={props.onClick}
        >
            {props.image && (
                <Image src={props.image} alt='image' width={25} height={25} />
            )}
            <span className={styles.title}>
                {props.title}
            </span>
        </button>
    );
};

export default Button;
