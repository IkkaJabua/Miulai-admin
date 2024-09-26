import styles from './PlaylistInput.module.scss';

type RegisterFunction = (name?: string) => {
    onChange: () => void; // Adjust the return type as needed
    onBlur: () => void;
    ref: React.Ref<HTMLInputElement>;
};

type Props = {
    name?: string;
    onClick?: () => void;
    register?: RegisterFunction; // Specify a function type for register
};

const PlaylistInput: React.FC<Props> = ({ name, onClick, register }) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <input 
                    type="checkbox" 
                    className={styles.inp} 
                    onClick={onClick} 
                    {...(register ? register(name) : {})} // Ensure register is defined
                />
                <span className={styles.name}>{name}</span>
            </div>
        </div>
    );
};

export default PlaylistInput;
