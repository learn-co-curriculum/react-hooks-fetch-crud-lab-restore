import React, { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "answers") {
      const updatedAnswers = [...formData.answers];
      const index = parseInt(event.target.dataset.index, 10);
      updatedAnswers[index] = value;
      setFormData({
        ...formData,
        answers: updatedAnswers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "correctIndex" ? parseInt(value, 10) : value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newQuestion = { ...formData };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    };

    fetch("http://localhost:4000/questions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error
        // You can add logic here to handle the response from the server.
        // Maybe reset the form or show a success message.
      });
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
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name="answers"
              data-index={index}
              value={answer}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
