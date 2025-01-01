import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Diary.css';
import './AllEntries.css';


const AllEntries = ({ entries }) => {
  const navigate = useNavigate();

  // View a single diary entry
  const handleClickEntry = (id) => {
    navigate(`/entry/${id}`);
  };

  return (
    <div className="container">
      <h1>All Diary Entries</h1>

      {entries.length > 0 ? (
        entries.map((entry) => (
          <div
            key={entry.id}
            className="entry-item"
            onClick={() => handleClickEntry(entry.id)}
          >
            <h3>{entry.title}</h3>
            <small>{entry.date}</small>
          </div>
        ))
      ) : (
        <p>No entries yet.</p>
      )}
    </div>
  );
};

export default AllEntries;
