import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import PostcardItem from './PostcardItem';

// Accept onPostCreated, onEdit, and onDelete props
function PostcardList({ onPostCreated, onEdit, onDelete }) {
  const [postcards, setPostcards] = useState([]);
  const [error, setError] = useState(null); // State for fetch errors

  // Function to fetch postcards
  const fetchPostcards = useCallback(() => {
    setError(null); // Clear previous errors
    console.log("Fetching postcards..."); // Log when fetching
    fetch('http://localhost:8080/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPostcards(data);
      })
      .catch(error => {
        console.error('Error fetching postcards:', error);
        setError(`Failed to fetch postcards: ${error.message}`); // Set error state
      });
  }, []); // No dependencies, fetch logic itself doesn't depend on props/state

  // useEffect to fetch postcards initially and when onPostCreated changes
  useEffect(() => {
    fetchPostcards();
  }, [fetchPostcards, onPostCreated]); // Depend on fetchPostcards and onPostCreated

  return (
    // Add className to the main div
    <div className="postcard-list">
      {/* <h2>Postcards</h2>  Let's remove this heading as App.js has the main one */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display fetch error */}
      {postcards.length > 0 ? (
        postcards.map(postcard => (
          // Pass onEdit and onDelete props down to PostcardItem
          <PostcardItem
            key={postcard.id}
            postcard={postcard}
            onEdit={onEdit}
            onDelete={onDelete} // Pass onDelete prop
          />
        ))
      ) : (
        <p>No postcards yet!</p> // Message if no postcards
      )}
    </div>
  );
}

export default PostcardList;
