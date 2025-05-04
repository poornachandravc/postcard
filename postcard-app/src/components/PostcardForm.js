import React, { useState, useEffect } from 'react'; // Import useEffect

// Accept onFormSubmit and editingPostcard props
function PostcardForm({ onFormSubmit, editingPostcard }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  // Effect to populate form when editingPostcard changes
  useEffect(() => {
    if (editingPostcard) {
      setTitle(editingPostcard.title);
      setContent(editingPostcard.content);
      setError(null); // Clear error when switching to edit
    } else {
      // Clear form if we are creating or after finishing editing
      setTitle('');
      setContent('');
      setError(null); // Clear error when switching to create
    }
  }, [editingPostcard]); // Dependency array

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    const postcardData = { title, content };
    const isEditing = !!editingPostcard; // Check if we are editing

    const url = isEditing
      ? `http://localhost:8080/posts/${editingPostcard.id}`
      : 'http://localhost:8080/posts';

    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postcardData),
    })
      .then(response => {
        if (!response.ok) {
          // Throw error to be caught below
          return response.text().then(text => { throw new Error(text || `HTTP error! status: ${response.status}`) });
        }
        // For PUT, response might be empty or status 204, handle accordingly
        if (method === 'PUT' && response.status === 204) {
            return {}; // Return empty object for consistency or handle as needed
        }
        // For POST or PUT with body response
         return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Don't clear fields here, useEffect handles it based on editingPostcard
        if (onFormSubmit) {
          onFormSubmit(); // Close form, trigger refresh in App.js
        }
      })
      .catch(error => {
        console.error(`Error ${isEditing ? 'updating' : 'creating'} postcard:`, error);
        setError(`Failed to ${isEditing ? 'update' : 'create'} postcard: ${error.message}`);
        // Optionally call onFormSubmit even on error if you want the form to close
        // if (onFormSubmit) {
        //   onFormSubmit();
        // }
      });
  };

  // Handle Cancel button click
  const handleCancel = () => {
    if (onFormSubmit) {
      onFormSubmit(); // Simply call the submit handler to close/reset
    }
  };

  return (
    // Add className to the wrapper div, remove inline style
    <div className="postcard-form">
      {/* Update heading based on mode */}
      <h2>{editingPostcard ? 'Edit Postcard' : 'Create New Postcard'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* No className needed on form itself unless specifically targeted */}
      <form onSubmit={handleSubmit}>
        {/* Remove inline style from div */}
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginLeft: '5px', width: '80%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ marginLeft: '5px', width: '80%', minHeight: '60px', verticalAlign: 'top' }}
          />
        </div>
        {/* Update button text and add Cancel button */}
        <button type="submit">{editingPostcard ? 'Update Postcard' : 'Create Postcard'}</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
}

export default PostcardForm;
