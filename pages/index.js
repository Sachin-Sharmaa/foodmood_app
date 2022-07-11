import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/Featured';
import DishList from '../components/DishList'
import {useState} from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';


export default function Home({dishList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>foodmood</title>
        <meta name="food site" content="taste the best" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
        {admin && <AddButton setClose = {setClose}/>}
      <DishList dishList = {dishList}/>
      {!close && <Add setClose={setClose}/>}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get('https://foodmood-hs8xo36k0-sachin-sharmaa.vercel.app/api/dishes');
  console.log(res);
  return {
    props: {
      dishList: res.data,
      admin
    }
  }
}


