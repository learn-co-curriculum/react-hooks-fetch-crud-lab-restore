import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [list, setList] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then(questions => setList(questions))
  }, [])

  const handleFormSubmit = (newQuestion) => {
    fetch('http://localhost:4000/questions',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "prompt": newQuestion.prompt,
        "answers": [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3, newQuestion.answer4],
        "correctIndex": newQuestion.correctIndex
      })
    })
      .then(res => res.json())
      .then(question => setList([...list, question]))
  }

  const handleQuestionDelete = (question) => {
    setList(list.filter(item => item.id !== question.id))
  }

  const handleQuestionUpdate = (question, correctAns) => {
    setList(list.map(item => {
      if(item.id === question.id){
        return {
          ...item,
          correctIndex: correctAns
        }
      } else {
        return item
      }
    }))
  }
   
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm onFormSubmit={handleFormSubmit} /> 
        : <QuestionList 
            onQuestionDelete={handleQuestionDelete} 
            qList={list} 
            onUpdate={handleQuestionUpdate}
          />}
    </main>
  );
}

export default App;
