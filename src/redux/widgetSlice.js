import { createSlice } from '@reduxjs/toolkit';
import dashboardData from '../dashboardData.json';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('widgets');
    if (serializedState === null) {
      return dashboardData; // Return the initial JSON data if no state is saved
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return dashboardData;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('widgets', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

const initialState = loadState();

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
      saveState(state);  // Save state to localStorage after adding widget
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
      saveState(state);  // Save state to localStorage after removing widget
    },
    updateCategories: (state, action) => {
      state.categories = action.payload;
      saveState(state);  // Save state to localStorage after updating categories
    },
  },
});

export const { addWidget, removeWidget, updateCategories } = widgetSlice.actions;

export default widgetSlice.reducer;
