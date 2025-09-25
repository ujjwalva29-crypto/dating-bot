import React from 'react';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <h1>💕 Dating Coach AI</h1>
        <p>Your Personal Dating & Profile Expert</p>
      </div>
      <ChatBot />
    </div>
  );
}

export default App;
