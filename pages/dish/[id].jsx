import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/Dish.module.css';
import {useDispatch} from 'react-redux';
import {addDish} from '../../redux/cartSlice';
import axios from 'axios';

const Dish = ({dish}) => {
	const [price, setPrice] = useState(dish.prices[0]);
	const [size, setSize] = useState(0);
	const [extras, setExtras] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();

	const changePrice = (number) => {
		setPrice(price + number);
	};

	const handleSize = (sizeIndex) => {
		const difference = dish.prices[sizeIndex] - dish.prices[size];
		setSize(sizeIndex);
		changePrice(difference);
	};

	const handleChange = (e, option) => {
		const checked = e.target.checked;
		if(checked) {
			changePrice(option.price);
			setExtras((prev) => [...prev, option]);
		}
		else {
			changePrice(-option.price);
			setExtras(extras.filter((extra) => extra._id !== option._id));
		}
	};

	const handleClick = () => {
		dispatch(addDish({...dish, extras, price, quantity}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.imgContainer}>
					<Image src ={dish.img} layout = 'fill' alt ='' objectFit='contain'/>
				</div>
			</div>		
			<div className={styles.right}>
				<h1 className={styles.title}>{dish.title}</h1>
				<span className={styles.price}>${price}</span>
				<p className={styles.desc}>{dish.desc}</p>
				<h3 className={styles.choose}>Choose the size</h3>
				<div className={styles.sizes}>
					<div className={styles.size} onClick = {() => handleSize(0)}>
						<Image src = '/img/bike.png' layout='fill' alt='' />
						<span className = {styles.number}>Small</span>
					</div>
					<div className={styles.size} onClick = {() => handleSize(1)}>
						<Image src = '/img/bike.png' layout='fill' alt='' />
						<span className = {styles.number}>Medium</span>
					</div>
					<div className={styles.size} onClick = {() => handleSize(2)}>
						<Image src = '/img/bike.png' layout='fill' alt='' />
						<span className = {styles.number}>Large</span>
					</div>
				</div>
				<h3 className={styles.choose}>Choose additional ingredients</h3>
				<div className={styles.ingredients}>
					{dish.extraOptions.map((option) => (
						<div className={styles.option} key={option._id}>
							<input type="checkbox" id = {option.text} name = {option.text} 
								className={styles.checkbox} 
								onChange = {(e) => handleChange(e, option)}
							/>
							<label htmlFor="double">{option.text}</label>
						</div>))}
					
				</div>
				<div className = {styles.add}>
					<input type="number" defaultValue = {1} min = {1} className = {styles.quantity} 
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<button className = {styles.button} onClick = {handleClick}>Add to cart</button>
				</div>
			</div>	
		</div>
	);
}

export const getServerSideProps = async ({params}) => {
  const res = await axios.get(`https://foodmood-hs8xo36k0-sachin-sharmaa.vercel.app/api/dishes/${params.id}`);
  return {
    props: {
      dish: res.data
    }
  }
}

export default Dish;
