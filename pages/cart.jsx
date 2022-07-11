import {reset} from '../redux/cartSlice';
import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from 'axios';
import {useRouter} from 'next/router';
import OrderDetail from '../models/OrderDetail';

const Cart = () => {
  const cart = useSelector((state) => (state.cart));
  const amount = cart.total;
  const currency = "USD";
  const style = {"layout":"vertical"};
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("https://foodmood-app.vercel.app/api/orders", data);
      if (res.status == 201) {
        dispatch(reset());
        router.push(`/order/${res.data._id}`);
      }
    } 
    catch (err) {
      console.log(err);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


  return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                status: 0,
                method: 1
              });
            });
          }}
        />
      </>
    );
  };


  return (
    <div className = {styles.container}>
      <div className = {styles.left}>
        <table className = {styles.table}>
          <tbody>
            <tr className = {styles.trTitle}>
              <th>Dish</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.dishes.map((dish) => (
              <tr className ={styles.tr} key = {dish._id}>
                <td>
                  <div className = {styles.imgContainer}>
                    <Image src = {dish.img} layout = 'fill' objectFit = 'cover' alt = '' />
                  </div>
                </td>
                <td>
                  <span className = {styles.name}>{dish.title}</span>
                </td>
                <td>
                  <span className = {styles.extras}>
                    {dish.extras.map((extra) => (<span key = {extra._id}> {extra.text}</span>))}
                  </span>
                </td>
                <td>
                  <span className = {styles.price}>${dish.price}</span>
                </td>
                <td>
                  <span className = {styles.quantity}>{dish.quantity}</span>
                </td>
                <td>
                  <span className = {styles.total}>${dish.price * dish.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className = {styles.right}>
        <div className = {styles.wrapper}>
          <h2 className = {styles.title}>CART TOTAL</h2>
          <div className = {styles.totalText}>
            <b className = {styles.totalTextTitle}>Subtotal:</b> ${cart.total}
          </div>
          <div className = {styles.totalText}>
            <b className = {styles.totalTextTitle}>Discount:</b> $0
          </div>
          <div className = {styles.totalText}>
            <b className = {styles.totalTextTitle}>Total:</b> ${cart.total}
          </div>
          {open ? (
            <div className = {styles.paymentMethods}>
              <button className = {styles.payButton} onClick = {() => setCash(true)}>CASH ON DELIVERY!</button>
              <PayPalScriptProvider
                  options={{
                      "client-id": "AfQkeLmB-rLnbvmZZ578dCMzWok9wtkDYwuOQi2t8i6bGfT0Mrl0iKK4UFIlf7QX9YrkFFCx_dt_-zHr",
                      components: "buttons",
                      currency: "USD",
                      "disable-funding": "credit,card,p24"
                  }}
                >
                  <ButtonWrapper
                      currency={currency}
                      showSpinner={false}
                  />
              </PayPalScriptProvider>
            </div>
            ) : (
              <button onClick = {() => setOpen(true)} className = {styles.button}>CHECK OUT NOW!</button>      
            )}              
          </div>
      </div>
    {cash && <OrderDetail total = {cart.total} createOrder = {createOrder} />}
    </div>
  );
};

export default Cart;
