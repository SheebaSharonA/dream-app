/*
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Diary.css';

const EntryDetails = ({ entries }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const entry = entries.find((entry) => entry.id.toString() === id);

  if (!entry) {
    return <p>Entry not found!</p>;
  }

  return (
    <div className="container">
      <h1>{entry.title}</h1>
      <p>{entry.content}</p>
      <small>{entry.date}</small>
      <button onClick={() => navigate('/entries')}>Back to All Entries</button>
    </div>
  );
};

export default EntryDetails;
*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EntryDetails = () => {
  const { id } = useParams();  // Get the entry ID from the URL
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    // Fetch the diary entry details when the component mounts
    axios
      .get(`http://127.0.0.1:5000/api/entries/${id}`)
      .then((response) => {
        setEntry(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the entry:', error);
      });
  }, [id]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{entry.title}</h1>
      <p><strong>Date:</strong> {entry.date}</p>
      <p>{entry.content}</p>
    </div>
  );
};

export default EntryDetails;
