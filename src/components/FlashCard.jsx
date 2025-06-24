import React, { useState } from "react";
import "./Flashcard.css";

const flashcardsData = require("./Quizlet_Ch10_15_full.json");

function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className="flashcard-container" onClick={onFlip}>
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="card-face card-front">
          <div className="card-question">{card.question}</div>
          <div className="options-grid">
            {card.options.map((opt, idx) => (
              <div key={idx} className="option">
                {opt}
              </div>
            ))}
          </div>
          <div className="hint-text">Click to flip</div>
        </div>

        {/* Back */}
        <div className="card-face card-back">
          <div className="answer-label">Answer:</div>
          <div className="answer-text">{card.answer}</div>
          <div className="hint-text">Click to flip back</div>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardApp() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcardsData.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setIndex(
      (prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length
    );
  };

  return (
    <div className="flashcard-app">
      <h1 className="app-title">Flashcard Quiz - Chapters 10–15</h1>
      <Flashcard
        card={flashcardsData[index]}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
      />

      <div className="nav-buttons">
        <button className="nav-button prev-button" onClick={handlePrev}>
          Previous
        </button>
        <button className="nav-button next-button" onClick={handleNext}>
          Next
        </button>
      </div>

      <p className="counter">
        Card {index + 1} of {flashcardsData.length}
      </p>
    </div>
  );
}
