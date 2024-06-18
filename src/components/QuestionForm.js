import React, { useState } from "react"

import { createQuestion } from "../utils/fetchers"

const initialState = {
  prompt: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  correctIndex: 0,
}

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState(initialState)
  const { prompt, answer1, answer2, answer3, answer4, correctIndex } = formData

  const resetForm = () => setFormData(initialState)

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const sanitizeInput = () => ({
    prompt: prompt,
    answers: [answer1, answer2, answer3, answer4],
    correctIndex: correctIndex,
  })

  function handleSubmit(event) {
    event.preventDefault()

    const questionData = sanitizeInput()

    createQuestion(questionData).then(onAddQuestion).then(resetForm)
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  )
}

export default QuestionForm
