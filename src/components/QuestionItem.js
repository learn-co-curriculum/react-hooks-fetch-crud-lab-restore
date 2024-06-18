import React from "react"
import { deleteQuestion, updateQuestion } from "../utils/fetchers"

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ))

  const handleChange = (event) => {
    const correctIndex = event.target.value

    updateQuestion(question.id, { correctIndex })
  }

  const handleDelete = () => {
    deleteQuestion(question.id).then(() => onDelete(question))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  )
}

export default QuestionItem
