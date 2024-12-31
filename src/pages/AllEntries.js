/*
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Diary.css';

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
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch all diary entries when the component mounts
    axios
      .get('http://127.0.0.1:5000/api/entries')
      .then((response) => {
        setEntries(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the entries:', error);
      });
  }, []);

  return (
    <div>
      <h1>All Diary Entries</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link to={`/entry/${entry.id}`}>
              <strong>{entry.title}</strong> - {entry.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllEntries;
