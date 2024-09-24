import styles from './Input.module.scss';



type Props = {
    onInputChange?: (value: string) => void;
    className?: string;
    placeholder?: string;
}

const Input = (props: Props) => {

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     props.onInputChange(e.target.value); // Send input value to the parent
    // };

    return (
        <form className={styles.container + ' ' + props.className}>
            <input type="text"
                placeholder={props.placeholder}
                className={styles.input}
                // onChange={handleInputChange} 
            />
        </form>
    )
}

export default Input;