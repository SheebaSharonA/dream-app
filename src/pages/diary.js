import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Diary.css';

const Diary = ({ setEntries }) => {
  const [entry, setEntry] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  
  const navigate = useNavigate();

  // Save a new diary entry with date, title, and content
  const handleSaveEntry = () => {
    if (entry.trim() && title.trim() && date) {
      const newEntry = {
        id: Date.now(),
        title,
        content: entry,
        date,
      };
      setEntries((prevEntries) => [...prevEntries, newEntry]);
      setEntry('');
      setTitle('');
      setDate('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="container">
      <h1>Diary Entry App</h1>

      <input
        type="date"
        className="date-picker"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />
      <textarea
        className="entry-input"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your diary entry here..."
      />
      <div className="buttons">
        <button onClick={handleSaveEntry}>Save Entry</button>
        <button onClick={() => navigate('/entries')}>Show All Entries</button>
      </div>
    </div>
  );
};

export default Diary;
