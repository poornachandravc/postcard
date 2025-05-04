import React from 'react';

// Accept props, including onEdit and onDelete
function PostcardItem({ postcard, onEdit, onDelete }) {

  // Basic check if postcard data exists
  if (!postcard) {
    return <div>Loading postcard...</div>;
  }

  const handleEditClick = () => {
    if (onEdit) {
      // Pass the full postcard object to the handler
      onEdit(postcard);
    }
  };

  // Handler for delete button click
  const handleDeleteClick = () => {
    // Confirm before deleting
    if (window.confirm(`Are you sure you want to delete "${postcard.title}"?`)) {
      if (onDelete) {
        onDelete(postcard.id); // Pass only the id
      }
    }
  };

  return (
    // Add className and remove inline styles
    <div className="postcard-item">
      <h3>{postcard.title}</h3>
      <p>{postcard.content}</p>
      {/* Add button classes */}
      <div> {/* Wrap buttons for better spacing/layout if needed */}
        <button onClick={handleEditClick} className="button button-edit">Edit</button>
        <button onClick={handleDeleteClick} className="button button-delete">Delete</button>
      </div>
    </div>
  );
}

export default PostcardItem;
