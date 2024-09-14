import CardDelete from './CardDelete/CardDelete';
import CardEdit from './CardEdit/CardEdit';
import styles from './CardItems.module.scss';



const CardItems = () => {

    return(
        <div className={styles.container}>
            <CardEdit />
            <CardDelete />
        </div>
    )
}



export default CardItems;