import styles from "../styles/OrderDetail.module.css";
import { useState } from "react";

const OrderDetail = ({total, createOrder}) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  
  const handleClick = () => {
    createOrder({customer, address, total, method: 0});
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Your will pay $12 after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
            placeholder="perry"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone No. </label>
          <input
            placeholder="110 33208402"
            type="text"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            placeholder="dsf dfsdfs"
            type="text"
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className = {styles.button} onClick = {handleClick}>
            Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
