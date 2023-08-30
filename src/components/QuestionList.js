import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [reload]);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <QuestionForm onQuestionAdded={() => setReload(!reload)} />
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={() => setReload(!reload)}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
