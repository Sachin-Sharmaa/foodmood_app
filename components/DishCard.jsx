import styles from '../styles/DishCard.module.css'
import Image from 'next/image';
import Link from 'next/link';

const DishCard = ({dish}) => {
  return (
    <div className={styles.container}>
      <Link href={`/dish/${dish._id}`} passHref>
    	 <Image src = {dish.img} alt='' width = '500' height = '500' />
      </Link>
    	<h1 className={styles.title}>{dish.title}</h1>
    	<span className={styles.price}>${dish.prices[0]}</span>
    	<p className={styles.desc}>
        {dish.desc}
    	</p>
    </div>
  );
};

export default DishCard;