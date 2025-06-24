import React, { useState } from "react";
import "./Flashcard.css";

const flashcardsData = require("./Quizlet_Ch10_15_full.json");

const multipleChoiceData = require("./Quizlet_Ch10_15_full.json");

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

function MultipleChoiceQuiz({ question, options, answer }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="multiple-choice-quiz">
      <div className="quiz-question">{question}</div>
      <div className="options-grid">
        {options.map((opt, idx) => (
          <div
            key={idx}
            className={`option ${
              selected === opt ? (opt === answer ? "correct" : "incorrect") : ""
            }`}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </div>
        ))}
      </div>
      {selected && (
        <div className="result-text">
          {selected === answer
            ? "Correct!"
            : "Incorrect. The right answer is: " + answer}
        </div>
      )}
    </div>
  );
}

export default function FlashcardApp() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);

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

  const toggleQuiz = () => setIsQuiz(!isQuiz);

  return (
    <div className="flashcard-app">
      <h1 className="app-title">Flashcard Quiz - Chapters 10–15</h1>
      <button
        className={`button-toggle ${isQuiz ? "button-active" : ""}`}
        onClick={toggleQuiz}
      >
        {isQuiz ? "Go to Flashcards" : "Take the Multiple Choice Quiz"}
      </button>
      {isQuiz ? (
        <MultipleChoiceQuiz {...multipleChoiceData[index]} />
      ) : (
        <Flashcard
          card={flashcardsData[index]}
          flipped={flipped}
          onFlip={() => setFlipped(!flipped)}
        />
      )}

      <div className="nav-buttons">
        {isQuiz ? (
          <button className="nav-button next-button" onClick={handleNext}>
            Next Question
          </button>
        ) : (
          <>
            <button className="nav-button prev-button" onClick={handlePrev}>
              Previous
            </button>
            <button className="nav-button next-button" onClick={handleNext}>
              Next
            </button>
          </>
        )}
      </div>

      <p className="counter">
        Card {index + 1} of {multipleChoiceData.length}
      </p>
    </div>
  );
}
