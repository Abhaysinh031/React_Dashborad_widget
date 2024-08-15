import React from 'react';
import './widget.css';

function Widget({ widget, removeWidget }) {
  const handleRemoveClick = () => {
    const isConfirmed = window.confirm("Are you sure you want to remove this widget?");
    if (isConfirmed) {
      removeWidget();
    }
  };

  return (
    <div className='container_box' style={{ width: '30vw', height: '25vh', margin: '15px', padding: '10px' }}>
      <div className='categories'>
        <h3>{widget.name}</h3>
        <button onClick={handleRemoveClick} style={{ color: 'red' }}>
          X
        </button>
      </div>
      <p>{widget.text}</p>
    </div>
  );
}

export default Widget;
