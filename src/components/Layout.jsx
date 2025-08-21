// src/components/Layout.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow">
        <div className="container flex justify-between align-center">
          <h1 className="text-xl font-bold">Faculty Canteen</h1>
          <nav>
            <ul className="flex">
              <li><Link to="/" className="btn btn-primary">Home</Link></li>
              <li><Link to="/menu" className="btn btn-primary">Menu</Link></li>
              <li><Link to="/about" className="btn btn-primary">About</Link></li>
              <li><Link to="/contact" className="btn btn-primary">Contact</Link></li>
              {currentUser ? (
                <li><Link to="/admin" className="btn btn-success">Admin</Link></li>
              ) : (
                <li><Link to="/login" className="btn btn-primary">Login</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mt-4 mb-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Faculty Canteen
      </footer>
    </div>
  );
}