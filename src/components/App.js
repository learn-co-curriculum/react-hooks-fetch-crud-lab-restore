import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  const handleAddQuestion = async (newQuestion) => {
    const response = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });

    const data = await response.json();
    setQuestions([...questions, data]);
  };

  const handleDeleteQuestion = async (id) => {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setQuestions(questions.filter((question) => question.id !== id));
    }
  };

  const handleUpdateCorrectAnswer = async (id, correctIndex) => {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    });

    if (response.ok) {
      const updatedQuestions = questions.map((question) =>
        question.id === id ? { ...question, correctIndex } : question
      );
      setQuestions(updatedQuestions);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onSubmit={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;

