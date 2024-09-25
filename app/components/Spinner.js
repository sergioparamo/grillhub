'use client';
const Spinner = () => {
    return (
      <div className="spinner">
        <style jsx>{`
          .spinner {
            border: 16px solid #f3f3f3; /* Fondo */
            border-top: 16px solid #3498db; /* Color de la parte superior */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  };
  
  export default Spinner;  