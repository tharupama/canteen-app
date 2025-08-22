// src/pages/Menu.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import chicken from '../assets/chicken.png';
import fish from '../assets/fish.jpg';
import egg from '../assets/egg.jpg';
import kottu from '../assets/kottu.jpg';

const menuItems = [
  { id: 1, name: 'Rice and curry with chicken', price: 150, image:chicken },
  { id: 2, name: 'Rice and curry with fish', price: 200, image: fish },
  { id: 3, name: 'Rice and curry with egg', price: 180, image: egg },
  { id: 4, name: 'Kottu', price: 30, image:kottu },
];

export default function Menu() {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: { ...item, quantity: (prev[item.id]?.quantity || 0) + 1 }
    }));
  };

  const handleOrderClick = (item) => {
    const orderData = { ...item, quantity: (cart[item.id]?.quantity || 1) };
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Our Menu</h2>
      <div className="grid grid-3">
        {menuItems.map(item => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} />
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-text"><strong>Price:</strong> Rs. {item.price}</p>
              <p><strong>In Cart:</strong> {cart[item.id]?.quantity || 0}</p>
              <div className="flex justify-between align-center">
                <button onClick={() => addToCart(item)} className="btn btn-primary">Add</button>
                <Link to="/order-confirm" onClick={() => handleOrderClick(item)} className="btn btn-success">
                  Order
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}