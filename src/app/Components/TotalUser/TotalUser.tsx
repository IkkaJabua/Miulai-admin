import styles from './TotalUser.module.scss';

interface Props {
    totalUser: string;
}

const TotalUser = (props: Props) => {

    return(
        <div className={styles.container}>
            {props.totalUser} users
        </div>
    )
}

export default TotalUser;