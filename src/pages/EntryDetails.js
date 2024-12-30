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
