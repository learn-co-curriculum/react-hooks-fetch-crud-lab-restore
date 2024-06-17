import React, { useState } from "react";

function QuestionItem({ question, onQuestionDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correctAns, setCorrectAns] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => onQuestionDelete(question))
  }
  
  const handleUpdateAnswer = (e) => {
    setCorrectAns(e.target.value)
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "correctIndex": e.target.value
      })
    })
     .then(res => res.json())
     .then(() => onUpdate(question, e.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctAns} onChange={handleUpdateAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
