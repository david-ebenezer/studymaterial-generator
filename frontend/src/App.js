import './App.css';
import React, { useState } from 'react';

function App() {

  const [Text, setText] = useState("");

  const updateText = (event) => {
    setText(event.target.value);
  }

  const press = async () => {
    try {
      const response = await fetch('http://localhost:8000/generate_document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input_text: Text })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const firstWord = Text.split(' ')[0]; // Get the first word of the input text
        link.href = url;
        link.download = `${firstWord}.docx`; // Use the first word as the filename
        link.click();
      } else {
        console.error('Error:', response.statusText);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Notes Generator</h1>
      </div>
      <div className="content">
        <textarea placeholder="Start typing your Syllabus here..." onChange={updateText}></textarea>
      </div>
      <button className="rounded-button" onClick={press}>Generate</button>
    </div>
  );
}

export default App;
