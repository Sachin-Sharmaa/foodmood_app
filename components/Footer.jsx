import styles from '../styles/Footer.module.css';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={styles.container}>
    	<div className={styles.item}>
        <Image src='/img/bg.jpeg' layout = 'fill' alt = '' /> 
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID THE FOODMOOD
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUT RESTAURANTS</h1>
          <p className={styles.text}>
            sdfeiupf mwe
             wefjipwekr 
             werfeopw(Address)
          </p>
          <p className={styles.text}>
            sdfeiupf mwe
             wefjipwekr 
             werfeopw(Address)
          </p><p className={styles.text}>
            sdfeiupf mwe
             wefjipwekr 
             werfeopw(Address)
          </p>
        </div>
        <div className={styles.card}>
          <h1>WORKING HOURS</h1>
          <p className={styles.text}>
            sdfeiupf mwe
             wefjipwekr 
             werfeopw(Address)
          </p><p className={styles.text}>
            sdfeiupf mwe
             wefjipwekr 
             werfeopw(Address)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;