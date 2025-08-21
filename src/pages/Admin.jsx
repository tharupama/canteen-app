// src/pages/Admin.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in → fetch orders
        fetchOrders();
      } else {
        // No user → redirect to login
        navigate('/login');
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'orders'));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(list);
    } catch (error) {
      console.error("Error fetching orders: ", error);
      alert("Failed to load orders.");
    }
  };

  const handleMarkPrepared = async (id) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting order: ", error);
      alert("Failed to delete order.");
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-lg">No orders yet.</p>
      ) : (
        <div className="grid grid-3">
          {orders.map(order => (
          <div key={order.id} className="card">
  <div className="card-body">
    <h3 className="card-title">{order.mealName}</h3>
    <p><strong>Student ID:</strong> <span style={{ fontWeight: 'bold', color: '#1a73e8' }}>{order.studentId}</span></p>
    <p><strong>Quantity:</strong> {order.quantity}</p>
    <p><strong>Price:</strong> Rs. {order.price}</p>
    <p><strong>Comment:</strong> {order.comment || 'None'}</p>
    <p className="text-sm text-gray-500">
      {new Date(order.timestamp?.toDate()).toLocaleString()}
    </p>
    <button
      onClick={() => handleMarkPrepared(order.id)}
      className="btn btn-success"
    >
      Mark as Prepared
    </button>
  </div>
</div>
          ))}
        </div>
      )}
    </div>
  );
}