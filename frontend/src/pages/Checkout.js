import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { checkout,wallet } from '../services/api';

const Checkout = () => {
  const { id } = useParams();
  const handleCheckoutClick = async () => {
    try {
      // Make a request to /create-checkout-session using Axios
      // const response = await axios.post('http://localhost:4000/create-checkout-session', {
      //   items: [
      //     { id: 1, quantity: 3 },
      //     { id: 2, quantity: 1 },
      //   ],
      // });

      const items = [
        { id: 1, quantity: 1 },
      
      ];

      const response = await checkout(id, items);

      // Check if the request was successful (status code 2xx)
      if (response.status === 200) {
        const { url } = response.data;
        console.log('Checkout Session:', response.data);
        // Handle the session object as needed (e.g., redirect to the checkout page)
        window.location = url;
      } else {
        console.error('Failed to create checkout session');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error as needed
    }
  };


  const handleWallet = async () => {
    try {
      // Call your backend API endpoint for wallet payment
      const response = await wallet(id);
  
      // Check if the request was successful (status code 2xx)
      if (response.status === 200) {
        const { success, message } = response.data;
        console.log('Wallet Payment:', response.data);
  
        if (success) {
          // Handle success as needed
          alert(message);
        } else {
          // Handle failure as needed
          // console.error('Wallet payment failed:', message);
          alert('Insufficient funds in the wallet')
        }
      } else {
        console.error('Failed to process wallet payment. Status:', response.status);
        // Log the full response for debugging purposes
        console.error('Full response:', response);
  
        // Handle error as needed
      }
    } catch (error) {
      // Log the details of the AxiosError
      console.error('Error during wallet payment:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      // Handle error as needed
    }
  };
  

  



  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Choose your payment method</h1>
      <button style={styles.button} onClick={handleCheckoutClick}>
       Pay using Credit Card
      </button>
      <button style={styles.button} onClick={handleWallet}>
      Pay using Wallet
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px',
    margin: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },

};

export default Checkout;
