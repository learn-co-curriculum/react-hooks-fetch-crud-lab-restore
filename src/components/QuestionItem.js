import React from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = (e) => {
    const options = {
      method: 'DELETE',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
    fetch(`http://localhost:4000/questions/${id}`, options)
    .then(_resp => e.target.parentElement.remove())
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
