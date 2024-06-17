import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({allQuestions, setAllQuestions}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(r=> setAllQuestions(r))
  }, [])

  const displayQuestions = () => {
    return(
      allQuestions.map(question => <QuestionItem key={question.id} question={question} />)
    )
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions()}</ul>
    </section>
  );
}

export default QuestionList;
