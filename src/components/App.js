import React, { useEffect, useState } from "react"

import { fetchQuestions } from "../utils/fetchers"

import AdminNavBar from "./AdminNavBar"
import QuestionForm from "./QuestionForm"
import QuestionList from "./QuestionList"

function App() {
  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([])

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  useEffect(() => fetchQuestions(setQuestions), [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} />
      )}
    </main>
  )
}

export default App
