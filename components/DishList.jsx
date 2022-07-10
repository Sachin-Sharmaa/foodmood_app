import styles from '../styles/DishList.module.css';
import DishCard from './DishCard'

const DishList = ({dishList}) => {
  return (
    <div className={styles.container}>
    	<h1 className={styles.title}>TASTE THE BEST	</h1>
    	<p className={styles.desc}>
    		GET SOME REALLY DELICIOUS INDIAN FOOD NOW !
    	</p>
    	<div className={styles.wrapper}>
    		{dishList.map((dish) => (<DishCard key = {dish._id} dish = {dish} />))}
    	</div>
    </div>
  );
};

export default DishList;