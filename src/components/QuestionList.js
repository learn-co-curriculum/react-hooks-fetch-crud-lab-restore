import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  function handleDeleteQuestion(id) {
    const requestOptions = {
      method: "DELETE",
    };

    fetch(`http://localhost:4000/questions/${id}`, requestOptions).then(
      (response) => {
        if (response.status === 200) {
          setQuestions(questions.filter((question) => question.id !== id));
        }
      }
    );
  }

  function handleUpdateCorrectAnswer(id, correctIndex) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    };

    fetch(`http://localhost:4000/questions/${id}`, requestOptions).then(
      (response) => {
        if (response.status === 200) {
          setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
              question.id === id ? { ...question, correctIndex } : question
            )
          );
        }
      }
    );
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion} // Pass the delete function
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
