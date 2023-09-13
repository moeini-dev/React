import './payment.css'
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useMemo } from "react";
import { useState, useRef } from "react";

export function Payment() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const bookIsbn = searchParams.get('bookIsbn');
  const userUuid = searchParams.get('userUuid');

  // const cardNumber = useRef('');
  // const cvv2 = useRef('');
  // const expirationMonth = useRef('');
  // const expirationYear = useRef('');
  // const password = useRef('');

  const [successStatus, setSuccessStatus] = useState(false);
  const [orderUuid, setOrderUuid] = useState('');
  const [transactionResult, setTransactionResult] = useState('');


  const addInitialOrder = async () => {
    try {
      const results = await axios.get(`/book/addInitialOrder?bookIsbn=${bookIsbn}&userUuid=${userUuid}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Results.data.id: ', results.data.id)
      setOrderUuid(results.data.id);

    } catch (err) {
      console.log('Error from axios: ', err)
    }
  }


  const handlePayment = async () => {
    console.log('Purchase button clicked')
    console.log('SuccessStatus: ', successStatus)
    console.log('orderUuid: ', orderUuid);

    if (successStatus === true) {
      try {
        const result = await axios.post(`/book/pay/${orderUuid}`, {
          successStatus: true
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // console.log('===== results from handlePayment: ', result.data[0]);
        setTransactionResult('Book payment done successfully!')

        setTimeout(() => {
          navigate('/');
        }, 5000)

      } catch (err) { console.log('===== Error from handlePayment: ', err); }
    }
    else {
      try {
        const result = await axios.post(`/book/pay/${orderUuid}`, {
          successStatus: false
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        setTransactionResult('Failure! Something went wrong while purchasing the book. Try again')

        setTimeout(() => {
          setTransactionResult('');
          navigate('/');
        }, 5000)

      } catch (err) { console.log('===== Error from handlePayment 2: ', err); }

    }


    // const formData = new FormData();
    // formData.append('cardNumber', Number(cardNumber?.current?.value))
    // formData.append('cvv2', Number(cvv2?.current?.value))
  }


  useEffect(() => {
    addInitialOrder();
  }, [])


  return (
    <>

      <div className="mainForm">
        <div>Payment page</div>

        {transactionResult !== '' ? (transactionResult == 'Book payment done successfully!' ? <>
          <div className="transactionResultMessage" style={{ backgroundColor: 'rgb(190, 255, 181)' }}>{transactionResult}</div>
          <div style={{ color: 'rgb(55,55,55)' }}>Redirecting to Home page...</div>
        </> : <>
            <div className="transactionResultMessage">{transactionResult}</div>
            <div style={{ color: 'rgb(55,55,55)' }}>Redirecting to Home page...</div>
          </>) : null}


        <form className="payment" method="POST" encType="multipart/form-data">
          <input type="text" name='cardNumber' className="cardNumber" placeholder="Credit card number"></input>
          <div className="twinGroupPayment">
            <input type="text" name='expirationMonth' className="expirationMonth" placeholder="Month"></input>
            <input type="text" name='expirationYear' className="expirationYear" placeholder="Year"></input>
          </div>
          <div className="twinGroupPayment">
            <input type="text" name='cvv2' className="cvv2" placeholder="CVV2" readOnly={true}></input>
            <input type="password" name='password' className="password" placeholder="Password" readOnly={true}></input>
          </div>
          <div className="checkboxDiv">
            <input type="checkbox" name='successOrFailure' id="successOrFailure" style={{ width: 15, marginRight: 10 }} onChange={() => { setSuccessStatus(!successStatus) }}></input>
            <label htmlFor="successOrFailure">Success</label>
          </div>
        </form>
        <button className="Pay" onClick={handlePayment}>Pay</button>

      </div>
    </>
  );
}