import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const PaymentComponent = () => {
    const [invoiceNo, setInvoiceNo] = useState('');
    const [itemSize, setItemSize] = useState('medium');
    const [total, setTotal] = useState(1500); // Amount in cents
    const [paymentMethod, setPaymentMethod] = useState('');
    const [status, setStatus] = useState('Pending');
    const [orderId, setOrderId] = useState('');
    const [itemDescription, setItemDescription] = useState(''); // New state for item description

    const handlePayment = async (event) => {
        event.preventDefault();
        const stripe = await stripePromise;

        // Create a payment method
        const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
            type: 'card',
            card: {
                // Card details should be collected here
            },
        });

        if (error) {
            console.error(error);
            return;
        }

        setPaymentMethod(pm.id);

        // Send payment data to backend
        const paymentData = {
            invoice_no: invoiceNo,
            itemSize: itemSize,
            total: total,
            payment_method: pm.id,
            status: status,
            order_id: orderId,
            item_description: itemDescription, // Include item description
        };

        const response = await fetch('http://localhost:4000/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        const result = await response.json();
        console.log(result);
    };


    return (
        <form onSubmit={handlePayment}>
            <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="Invoice No" required />
            <select value={itemSize} onChange={(e) => setItemSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            <input type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="Total Amount" required />
            <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Order ID" required />
            <input type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder="Item Description" required /> {/* New input for item description */}
            <button type="submit">Pay Now</button>
            <button type="submit">Forgot Something?</button>
        </form>
    );
};

export default PaymentComponent;