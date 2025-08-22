// src/pages/Home.jsx
import canteen_img from '../assets/canteen.jpg';
export default function Home() {
  return (
    <div className="text-center">
      <div className="welcome">
      <h2 className="text-3xl font-bold mb-4">Welcome to Faculty Canteen</h2>
      <p className="text-lg">Quick, tasty meals for busy students.</p>
      </div>

      <img
        src={canteen_img}
        alt="Canteen"
        style={{ /* width: '50%', height: '50%', objectFit: 'cover', borderRadius: '10px', display: 'flex',  position: 'absolute', left: '25%',top: '20%'  */}}
      />
    </div>
  );
}