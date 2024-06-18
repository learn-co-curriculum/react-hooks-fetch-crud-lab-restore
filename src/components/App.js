import React, { useEffect, useState } from "react"

import { fetchQuestions } from "../utils/fetchers"

import AdminNavBar from "./AdminNavBar"
import QuestionForm from "./QuestionForm"
import QuestionList from "./QuestionList"

function App() {
  const [page, setPage] = useState("List")
  const [questions, setQuestions] = useState([])

  useEffect(() => fetchQuestions(setQuestions), [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm />
      ) : (
        <QuestionList questions={questions} />
      )}
    </main>
  )
}

export default App
