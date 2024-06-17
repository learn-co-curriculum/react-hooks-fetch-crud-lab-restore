import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questionsData) => setQuestions(questionsData))
  }, [])

  console.log(questions)
  const questionItems = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
      />
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
