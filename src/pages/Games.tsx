import React, { useState, useEffect } from "react";
import "./Games.css";

export default function EducationalGames() {
  return (
    <div className="games-container">
      <h1>🎮 Educational Games</h1>
      <div className="games-list">
        <MathQuiz />
        <WordScramble />
        <MemoryGame />
        <TypingSpeedTest />
      </div>
    </div>
  );
}

function MathQuiz() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setQuestion(`${num1} + ${num2} = ?`);
    setAnswer((num1 + num2).toString());
    setUserInput("");
    setMessage("");
  };

  const checkAnswer = () => {
    if (userInput === answer) {
      setMessage("✅ Correct!");
    } else {
      setMessage("❌ Incorrect, try again!");
    }
  };

  return (
    <div className="game-card">
      <h2>🧮 Math Quiz</h2>
      <p>{question}</p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={checkAnswer}>Submit</button>
      <button onClick={generateQuestion}>New Question</button>
      <p>{message}</p>
    </div>
  );
}

function WordScramble() {
  const words = ["react", "javascript", "developer", "education", "learning"];
  const [scrambled, setScrambled] = useState("");
  const [answer, setAnswer] = useState("");
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateWord();
  }, []);

  const generateWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setAnswer(word);
    setScrambled(word.split("").sort(() => Math.random() - 0.5).join(""));
    setUserInput("");
    setMessage("");
  };

  const checkWord = () => {
    if (userInput.toLowerCase() === answer) {
      setMessage("✅ Correct!");
    } else {
      setMessage("❌ Incorrect, try again!");
    }
  };

  return (
    <div className="game-card">
      <h2>🔤 Word Scramble</h2>
      <p>Unscramble: {scrambled}</p>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={checkWord}>Submit</button>
      <button onClick={generateWord}>New Word</button>
      <p>{message}</p>
    </div>
  );
}

// Add more games like MemoryGame and TypingSpeedTest here!

function MemoryGame() {
  return (
    <div className="game-card">
      <h2>🧠 Memory Game</h2>
      <p>Coming Soon!</p>
    </div>
  );
}

function TypingSpeedTest() {
  return (
    <div className="game-card">
      <h2>⌨️ Typing Speed Test</h2>
      <p>Coming Soon!</p>
    </div>
  );
}
