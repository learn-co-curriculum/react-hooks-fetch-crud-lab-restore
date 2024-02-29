import React, { useEffect, useState } from "react"; 
import QuestionItem from "./QuestionItem";

	const url =("http://localhost:4000/questions")

function QuestionList() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		fetch(url)
      .then((res) => res.json())
			.then((questions) => {
				setQuestions(questions)
			});
	}, []);

	const questionItems = questions.map((question) => <QuestionItem key={question.id} question={question} />);
		
  return (
    <section>
      <h1>Quiz Questions</h1>
			<ul>{questionItems}</ul>
			
		</section>
  );
}

export default QuestionList;
