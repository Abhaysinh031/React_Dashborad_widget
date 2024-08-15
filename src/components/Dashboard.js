import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from './Category';
import AddWidgetPage from './AddWidgetPage';
import { addWidget, removeWidget } from '../redux/widgetSlice';
import LoadingBar from 'react-top-loading-bar';
import './Dashboard.css';

function Dashboard() {
  const categories = useSelector((state) => state.widgets.categories);
  const dispatch = useDispatch();

  const [showAddWidgetPage, setShowAddWidgetPage] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddWidgetClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowAddWidgetPage(true);
  };

  const handleAddWidget = (categoryId, widgetName, widgetText) => {
    setLoading(true);
    const newWidget = {
      id: Date.now(),
      name: widgetName,
      text: widgetText,
      visible: true,
    };
    dispatch(addWidget({ categoryId, widget: newWidget }));
    setLoading(false);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const updateCategoryWidgets = (selectedWidgets) => {
    const updatedCategories = categories.map((category) => {
      const updatedWidgets = category.widgets.filter(
        (widget) => widget.id !== widget.Id // Only remove the specific widget
      );
      return { ...category, widgets: updatedWidgets };
    });
    dispatch({ type: 'widgets/updateCategories', payload: updatedCategories });
    setShowAddWidgetPage(false);
  };

  // Filter the widgets based on the search query
  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const hasWidgets = filteredCategories.some((category) => category.widgets.length > 0);
  const noResults = filteredCategories.length === 0;


  return (
    <div className='container' style={{ fontFamily: 'Roboto, sans-serif' }}>
      <LoadingBar
        color="#050F3C"
        progress={loading ? 70 : 100}
        onLoaderFinished={() => setLoading(false)}
      />
      <div className='widgets'>
        {showAddWidgetPage ? (
          <AddWidgetPage
            categories={filteredCategories}
            selectedCategoryId={selectedCategoryId}
            addWidget={handleAddWidget}
            updateCategoryWidgets={updateCategoryWidgets}
            onClose={() => setShowAddWidgetPage(false)}
          />
        ) : (
          <>
            <div className='search-Add_widget'>
              <div className='Dashboard'>
                <a href="/" className="dashboard-link">Dashboard</a>
              </div>
              <div className='search-add'>
                <input
                  type="text"
                  placeholder="Search widgets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => handleAddWidgetClick(null)}>
                  Add Widgets +
                </button>
              </div>
            </div>
            {hasWidgets || noResults ? ( // Show categories even if empty 
              <>
                {noResults && (
                  <p style={{ color: 'red', textAlign: 'center' }}>
                    No widgets found matching your search.
                  </p>
                )}
                {filteredCategories.map((category) => (
                  <div key={category.id}>
                    <Category
                      category={category}
                      addWidget={handleAddWidget}
                      removeWidget={handleRemoveWidget}
                    />
                  </div>
                ))}
              </>
            ) : (
              <p style={{ color: 'gray', textAlign: 'center' }}>
                No categories or widgets found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;