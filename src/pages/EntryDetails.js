import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EntryDetails.css';

const EntryDetails = ({ entries }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const entry = entries.find((entry) => entry.id.toString() === id);

  if (!entry) {
    return <p className="not-found">Entry not found!</p>;
  }

  return (
    <div className="entry-details-container">
      <button className="back-button" onClick={() => navigate('/entries')}>
        Back to All Entries
      </button>
      <div className="entry-content-wrapper">
        <h1 className="entry-title">{entry.title}</h1>
        <p className="entry-date">{entry.date}</p>
        <div className="entry-content">{entry.content}</div>
      </div>
    </div>
  );
};

export default EntryDetails;
