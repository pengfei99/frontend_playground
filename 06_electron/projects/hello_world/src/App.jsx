import React, { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '4rem' }}>
      <h1>Hello, React!</h1>
      <p>You clicked {count} times.</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '0.6rem 1.2rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#007bff',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Click Me
      </button>
    </div>
  );
};

export default App;
