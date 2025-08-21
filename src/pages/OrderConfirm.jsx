// src/pages/OrderConfirm.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function OrderConfirm() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [studentId, setStudentId] = useState(''); // ← New state

  useEffect(() => {
    const saved = localStorage.getItem('pendingOrder');
    if (saved) {
      setOrder(JSON.parse(saved));
      setQuantity(JSON.parse(saved).quantity || 1);
    } else {
      navigate('/menu');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!order || !studentId.trim()) {
      alert('Please enter your Student ID');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        mealName: order.name,
        price: order.price,
        quantity,
        comment,
        studentId, // ← Save student ID
        timestamp: new Date(),
      });
      alert('Order placed successfully!');
      navigate('/');
    } catch (e) {
      alert('Error placing order: ' + e.message);
      console.error(e);
    }
  };

  if (!order) return <p className="text-center">Loading...</p>;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold mb-4">Confirm Your Order</h2>
          <h3 className="card-title">{order.name}</h3>
          <p><strong>Price:</strong> Rs. {order.price}</p>

          <div className="form-group mt-4">
            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="form-group">
            <label>Student ID <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              placeholder="e.g. S2020100"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value.trim())}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="form-group">
            <label>Special Instructions (Optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-success"
            style={{ width: '100%' }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}