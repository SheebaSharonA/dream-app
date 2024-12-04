import React from 'react';
import { useParams } from 'react-router-dom'; // To get the entry ID from the URL

function EntryDetail() {
    const { id } = useParams(); // Access the dynamic 'id' from the URL

    // You would normally fetch the entry using the ID here
    // For now, we just simulate with dummy data
    const entry = {
        title: "Sample Entry",
        content: "This is the detailed content of the diary entry.",
        date: "12/04/2024",
    };

    return (
        <div className="container">
            <h1>Diary Entry Details</h1>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            <small>{entry.date}</small>
        </div>
    );
}

export default EntryDetail;
