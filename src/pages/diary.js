import React, { useState } from 'react';
import './Diary.css';

const Diary = () => {
  const [entry, setEntry] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [entries, setEntries] = useState([]);
  const [viewEntry, setViewEntry] = useState(null);

  // Save a new diary entry with date, title, and content
  const handleSaveEntry = () => {
    if (entry.trim() && title.trim() && date) {
      const newEntry = {
        id: Date.now(),
        title,
        content: entry,
        date,
      };
      setEntries([...entries, newEntry]);
      setEntry('');
      setTitle('');
      setDate('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  // Show the list of all entries
  const handleShowEntries = () => {
    setViewEntry(null); // Show all entries when no entry is selected
  };

  // View a single diary entry
  const handleClickEntry = (id) => {
    const selectedEntry = entries.find((entry) => entry.id === id);
    setViewEntry(selectedEntry);
  };

  return (
    <div className="container">
      <h1>Diary Entry App</h1>

      {viewEntry === null ? (
        <>
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
            <button onClick={handleShowEntries}>Show All Entries</button>
          </div>

          <div className="entries">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="entry-item"
                  onClick={() => handleClickEntry(entry.id)}
                >
                  <h3>{entry.title}</h3>
                  <p>{entry.content.slice(0, 30)}...</p>
                  <small>{entry.date}</small>
                </div>
              ))
            ) : (
              <p>No entries yet.</p>
            )}
          </div>
        </>
      ) : (
        <div className="view-entry">
          <h2>{viewEntry.title}</h2>
          <p>{viewEntry.content}</p>
          <small>{viewEntry.date}</small>
          <button onClick={handleShowEntries}>Back to Entries</button>
        </div>
      )}
    </div>
  );
};

export default Diary;
