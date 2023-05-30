import React, { useState } from 'react';
import axios from 'axios';
import './app.css';

function App() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const url = 'http://localhost:9000/openai';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url, { prompt: text });
      const newHistory = [...history, { prompt: text, response: response.data.response }];
      setHistory(newHistory);
      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setText(event.target.value.slice(0, 100));
  };

  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit}>
        <h2>Write Something</h2>
        <input type="text" value={text} onChange={handleChange} maxLength={100} wrap="soft" />
        <button type='submit'>Submit</button>
      </form>
      <div className='history-wrapper'>
        {history.map((item, index) => (
          <div key={index}>
            <p><strong>Prompt:</strong> {item.prompt}</p>
            <p><strong>Response:</strong> {item.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
