import React, { useState, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import './Addwidgetpage.css';

function AddWidgetPage({ categories = [], addWidget, onClose }) {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loadingBarRef = useRef(null); 

  const handleConfirm = () => {
    if (!widgetName) {
      setErrorMessage('Widget Name is required.');
      return;
    }

    if (!widgetText) {
      setErrorMessage('Widget Text is required.');
      return;
    }

    if (!selectedCategoryId) {
      setErrorMessage('Please select a category.');
      return;
    }

    // Start the loading bar
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    // Simulate a delay for loading
    setTimeout(() => {
      // If all validations pass, add the widget
      addWidget(parseInt(selectedCategoryId), widgetName, widgetText);

      // Reset form and close the dialog
      setWidgetName('');
      setWidgetText('');
      setSelectedCategoryId('');
      setErrorMessage('');
      onClose();

      // Complete the loading bar after processing is done
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }, 1000); 
  };

  const handleCancel = () => {
    // Start the loading bar
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    // Simulate a delay for canceling
    setTimeout(() => {
      onClose();

      // Complete the loading bar after processing is done
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }, 1000); 
  };

  return (
    <div className='add_widget_page' style={{ fontFamily: 'Roboto, sans-serif' }}>
      <LoadingBar color="#050F3C" ref={loadingBarRef} />
      <div className='add-widget_page2'> 
      <h2>Add Widget</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className='widget_name'>
        <input
          type="text"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
      </div>
      <div className='widget_text'>
        <input
          type="text"
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
      </div>
      <div className='select_category'>
        <label>Select Category:</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='confirm_cancel'>
        <button onClick={handleConfirm}>Confirm</button>
        <button className='cancel' onClick={handleCancel}>Cancel</button>
      </div>
      </div>
    </div>
  );
}

export default AddWidgetPage;
