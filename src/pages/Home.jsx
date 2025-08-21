// src/pages/Home.jsx
export default function Home() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Faculty Canteen</h2>
      <p className="text-lg">Quick, tasty meals for busy students.</p>
      <img
        src="https://source.unsplash.com/random/800x400/?food,canteen"
        alt="Canteen"
        style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px', margin: '20px 0' }}
      />
    </div>
  );
}