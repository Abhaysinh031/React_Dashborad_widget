import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Widget from './Widget';
import { addWidget, removeWidget } from '../redux/widgetSlice';
import LoadingBar from 'react-top-loading-bar';
import './Category.css';

function Category({ category }) {
  const dispatch = useDispatch();  // Initialize dispatch
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [showAddWidgetForm, setShowAddWidgetForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const loadingBarRef = useRef(null);  // Reference for the loading bar

  const handleAddWidget = () => {
    if (!widgetName) {
      setErrorMessage('Widget Name is required.');
      return;
    }

    if (!widgetText) {
      setErrorMessage('Widget Text is required.');
      return;
    }

    // Start the loading bar
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    // Simulate an async operation 
    setTimeout(() => {
      const newWidget = {
        id: Date.now(),
        name: widgetName,
        text: widgetText,
      };

      dispatch(addWidget({ categoryId: category.id, widget: newWidget })); // Dispatch addWidget action

      // Reset the form and hide the loading bar
      setWidgetName('');
      setWidgetText('');
      setErrorMessage('');
      setShowAddWidgetForm(false);

      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }, 1000); 
  };

  const handleRemoveWidget = (widgetId) => {
    // Start the loading bar
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    // Simulate an async operation 
    setTimeout(() => {
      dispatch(removeWidget({ categoryId: category.id, widgetId })); 
      // Hide the loading bar
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }, 1000);
  };

  return (
    <div className='dashboard_box' style={{ fontFamily: 'Roboto, sans-serif' }}>
      <LoadingBar color="#050F3C" ref={loadingBarRef} />
      <h2>{category.name}</h2>
      <div className='dashboard_widget_box'>
      {category.widgets.map((widget) => (
        <Widget
          key={widget.id}
          widget={widget}
          removeWidget={() => handleRemoveWidget(widget.id)}
        />
      ))}
      {showAddWidgetForm ? (
        <div className='particular_add_widget'>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <input
            type="text"
            placeholder="Widget Name"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Widget Text"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
          />
          <div className='addWidget_cancel'>
          <button className='add-widget_btn' onClick={handleAddWidget}>Add Widget</button>
          <button className='cancel' onClick={() => setShowAddWidgetForm(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className='Add_widget'>
        <button onClick={() => setShowAddWidgetForm(true)}>+ Add Widget</button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Category;
