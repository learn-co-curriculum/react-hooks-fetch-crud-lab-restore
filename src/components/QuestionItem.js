import React from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  if (!question) {
    // Handle the case where 'question' is undefined or null
    return null;
  }

  const { id, prompt, answers, correctIndex } = question;

  // Add checks for the existence of 'answers' array and 'correctIndex'
  const promptText = prompt || "N/A";
  const correctAnswer =
    answers && answers.length > correctIndex ? answers[correctIndex] : "N/A";

  const handleDeleteClick = () => {
    onDeleteQuestion(id);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {promptText}</h5>
      <label>Correct Answer: {correctAnswer}</label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
