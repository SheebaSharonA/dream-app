import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link component from React Router
import './Diary.css';

function Diary() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [entries, setEntries] = useState([]);

    const handleSave = () => {
        if (title && content) {
            const newEntry = {
                id: entries.length + 1, // Give each entry a unique ID
                title,
                content,
                date: new Date().toLocaleDateString(),
            };
            setEntries([newEntry, ...entries]); // Adds the new entry at the top
            setTitle('');
            setContent('');
        } else {
            alert("Please fill in both the title and content!");
        }
    };

    return (
        <div className="container">
            <h1>My Diary</h1>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title of your diary entry"
                />
            </div>
            <div>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your diary entry here"
                ></textarea>
            </div>
            <button onClick={handleSave}>Save Entry</button>

            <h2 style={{ marginTop: '40px' }}>Previous Entries</h2>
            <div className="entries-list">
                {entries.length > 0 ? (
                    entries.map((entry, index) => (
                        <div key={index} className="entry">
                            <p>
                                <span className="brackets">[</span>{' '}
                                <strong>{entry.title}</strong> - {entry.content}{' '}
                                <span className="brackets">]</span>
                            </p>
                            <small>{entry.date}</small>
                            {/* Link to navigate to the entry detail page */}
                            <Link to={`/entry/${entry.id}`}>View Entry</Link>
                        </div>
                    ))
                ) : (
                    <p>No entries yet!</p>
                )}
            </div>
        </div>
    );
}

export default Diary;
