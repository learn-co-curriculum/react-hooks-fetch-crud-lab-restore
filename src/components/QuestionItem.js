import React from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers && Array.isArray(answers)
    ? answers.map((answer, index) => (
        <option key={index} value={index}>
          {answer}
        </option>
      ))
    : [];

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if(response.ok) {
        console.log("Question deleted")
        onDelete()
      } else {
        throw new Error("Can't delete question.")
      }
    })
    .catch((error) => console.error("error", error))
  }

  function handleCorrectIndexChange(event) {
    const newCorrectIndex = parseInt(event.target.value);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex
      }),
    })
    .then((response) => {
      if (response.ok) {
        console.log("Question updated")
        question.correctIndex = newCorrectIndex; // Update the state locally
      } else {
        throw new Error("Failed to update question.")
      }
    })
    .catch((error) => console.error("error", error))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectIndexChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
