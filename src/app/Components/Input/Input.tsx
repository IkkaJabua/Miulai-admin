import styles from './Input.module.scss';



type Props = {
    className?: string;
    placeholder?: string;
}

const Input = (props: Props) => {

    return (
        <form className={styles.container + ' ' + props.className}>
            <input type="text" placeholder={props.placeholder} className={styles.input} />
        </form>
    )
}

export default Input;