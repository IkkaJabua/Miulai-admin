import CardDelete from './CardDelete/CardDelete';
import CardEdit from './CardEdit/CardEdit';
import styles from './CardItems.module.scss';

interface Props {
    onEdit?: () => void;
    onDelete?: () => void;
}

const CardItems = (props: Props) => {

    return(
        <div className={styles.container}>
            <CardEdit onClick={props.onEdit} />
            <CardDelete onClick={props.onDelete} />
        </div>
    )
}



export default CardItems;