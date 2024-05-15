import React from "react";

function QuestionItem({ question, onDelete, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = async () => {
    onDelete(id); // Trigger delete function passed from QuestionList.js
  };

  const handleChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value);
    onUpdateCorrectAnswer(id, newCorrectIndex); // Trigger update function with ID and new correct index
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
