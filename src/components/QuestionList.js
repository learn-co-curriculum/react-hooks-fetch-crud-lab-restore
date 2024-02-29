import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/questions/")
			.then((res) => res.json())
			.then((questions) => {
				setQuestions(questions);
			});
	}, []);

	function handleDelete(id) {
		fetch(`http://localhost:4000/questions/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(() => {
				const remainingQuestions = questions.filter((question) => question.id !== id);
				setQuestions(remainingQuestions);
			});
	}
	
	function handleAnswerChange(id, correctIndex) {
		fetch(`http://localhost:4000/questions/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ correctIndex }),
		})
			.then((r) => r.json())
			.then((updatedQuestion) => {
				const updatedQuestions = questions.map((q) => {
					if (q.id === updatedQuestion.id)
						return updatedQuestion;
					else
						return q;
				});
				setQuestions(updatedQuestions);
			});
	}

	const questionItems = questions.map((question) => (
		<QuestionItem
			key={question.id}
			question={question}
			deleteItem={handleDelete}
			onAnswerChange={handleAnswerChange}
		/>
	));

	return (
		<section>
			<h1>Quiz Questions</h1>
			<ul>{questionItems}</ul>
		</section>
	);
}

export default QuestionList;
