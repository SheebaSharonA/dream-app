
/*
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
*/

import React, { useState, useEffect } from "react";
import "./Diary.css";

const Diary = () => {
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [viewEntry, setViewEntry] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://127.0.0.1:5000/entries"; // Backend API URL

  // Save a new diary entry
  useEffect(() => {
    fetch("/entries")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data); // Log the retrieved JSON to the console
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  
  const handleSaveEntry = async () => {
    if (entry.trim() && title.trim() && date) {
      try {
        const newEntry = {
          title,
          content: entry,
          date,
        };

        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        });

        if (response.ok) {
          const savedEntry = await response.json();
          setEntries((prevEntries) => [
            ...prevEntries,
            { id: savedEntry.id, ...newEntry },
          ]);
          setEntry("");
          setTitle("");
          setDate("");
        } else {
          alert("Failed to save entry. Please try again.");
        }
      } catch (error) {
        alert("Error saving entry. Please try again.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Fetch all diary entries from the backend
  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const fetchedEntries = await response.json();
        setEntries(fetchedEntries);
      } else {
        alert("Failed to fetch entries. Please try again.");
      }
    } catch (error) {
      alert("Error fetching entries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete an entry
  const handleDeleteEntry = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
      } else {
        alert("Failed to delete entry.");
      }
    } catch (error) {
      alert("Error deleting entry.");
    }
  };

  // Show the list of all entries
  const handleShowEntries = () => {
    setViewEntry(null);
  };

  // View a single diary entry
  const handleClickEntry = (id) => {
    const selectedEntry = entries.find((entry) => entry.id === id);
    setViewEntry(selectedEntry);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

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
            <button onClick={fetchEntries}>Refresh Entries</button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="entries">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="entry-item"
                  >
                    <h3 onClick={() => handleClickEntry(entry.id)}>{entry.title}</h3>
                    <p>{entry.content ? entry.content.slice(0, 30) : "No content"}...</p>
                    <small>
                      {entry.date
                        ? new Date(entry.date).toLocaleDateString()
                        : "No date available"}
                    </small>
                    <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
                  </div>
                ))
              ) : (
                <p>No entries yet.</p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="view-entry">
          <h2>{viewEntry.title}</h2>
          <p>{viewEntry.content}</p>
          <small>
            {viewEntry.date
              ? new Date(viewEntry.date).toLocaleDateString()
              : "No date available"}
          </small>
          <button onClick={handleShowEntries}>Back to Entries</button>
        </div>
      )}
    </div>
  );
};

export default Diary;
