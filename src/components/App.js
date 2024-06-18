import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questionsData) => setQuestions(questionsData));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    const updatedQuestions = questions.filter((questions) => questions.id !== id)
    setQuestions(updatedQuestions)
  }

  function handleAnswerChange(updatedQuestion) {
    const updateQuestions = questions.map((question) => {
     return question.id === updatedQuestion.id ? updatedQuestion : question
    })
    setQuestions(updateQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestions={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateAnswer={handleAnswerChange}
        />
      )}
    </main>
  );
}

export default App;

