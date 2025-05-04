import React, { useState } from 'react'; // Import useState
import './App.css';
import PostcardList from './components/PostcardList';
import PostcardForm from './components/PostcardForm'; // Import PostcardForm

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingPostcard, setEditingPostcard] = useState(null); // State for editing

  // Function to handle successful form submission (Create or Update)
  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingPostcard(null); // Clear editing state
    setRefreshTrigger(prev => prev + 1);
    console.log("Form submitted, triggering refresh...");
  };

  // Function to handle edit button click in PostcardItem
  const handleEdit = (postcard) => {
    setEditingPostcard(postcard); // Set the postcard to edit
    setShowForm(true); // Show the form
  };

  // Function to toggle form visibility (for Add New)
  const toggleForm = () => {
    if (showForm) {
      setEditingPostcard(null); // Clear editing state if closing form
    }
    // If opening the form via this button, ensure it's for creation
    if (!showForm) {
      setEditingPostcard(null);
    }
    }
    setShowForm(!showForm);
  };

  // Function to handle delete button click in PostcardItem
  const handleDelete = (id) => {
    console.log(`Attempting to delete postcard with id: ${id}`);
    fetch(`http://localhost:8080/posts/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        // If response is not ok, throw an error
        return response.text().then(text => { throw new Error(text || `HTTP error! status: ${response.status}`) });
      }
      console.log(`Postcard with id: ${id} deleted successfully`);
      // Trigger refresh after successful deletion
      setRefreshTrigger(prev => prev + 1);
    })
    .catch(error => {
      console.error('Error deleting postcard:', error);
      // Optionally trigger refresh even if delete failed on backend,
      // or handle error display
      // setRefreshTrigger(prev => prev + 1);
    });
  };


  return (
    <div className="App">
      <h1>Postcard App</h1>
      {/* Pass onPostCreated, onEdit, and onDelete props */}
      <PostcardList
        onPostCreated={refreshTrigger}
        onEdit={handleEdit}
        onDelete={handleDelete} // Pass handleDelete function
      />

      {/* Button to toggle form visibility */}
      {/* Add button classes */}
      <button onClick={toggleForm} className="button button-add">
        {showForm ? 'Cancel Add/Edit' : 'Add New Postcard'}
      </button>

      {/* Conditionally render the form */}
      {showForm && (
        <PostcardForm
          onFormSubmit={handleFormSubmit}
          editingPostcard={editingPostcard}
        />
      )}
    </div>
  );
}

export default App;
