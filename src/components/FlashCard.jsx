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

function MultipleChoiceQuiz({
  question,
  options,
  answer,
  selected,
  setSelected,
}) {
  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="multiple-choice-quiz">
      <div className="quiz-question large-question">{question}</div>
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
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [showAll, setShowAll] = useState(false); // New state for showing all questions and answers

  const handleNext = () => {
    setSelected(null);
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
  const toggleShowAll = () => setShowAll(!showAll); // Toggle function for showing all questions and answers

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
        <MultipleChoiceQuiz
          {...multipleChoiceData[index]}
          selected={selected}
          setSelected={setSelected}
        />
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

      {/* Button to show all questions and answers */}
      <button className="button-show-all" onClick={toggleShowAll}>
        {showAll
          ? "Hide All Questions and Answers"
          : "Show All Questions and Answers"}
      </button>

      {/* Display all questions and answers if showAll is true */}
      {showAll && (
        <div className="all-questions-answers">
          {flashcardsData.map((card, idx) => (
            <div key={idx} className="question-answer-pair">
              <div className="question">{card.question}</div>
              <div className="answer">Answer: {card.answer}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
