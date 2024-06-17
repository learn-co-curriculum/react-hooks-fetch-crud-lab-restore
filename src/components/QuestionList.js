import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ setQuestions, questions }) {
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, [])

  function handleDelete(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question => {
          return (
            <QuestionItem key={question.id} question={question} onDelete={handleDelete}/>
          )
        }))}
      </ul>
    </section>
  );
}

export default QuestionList;
