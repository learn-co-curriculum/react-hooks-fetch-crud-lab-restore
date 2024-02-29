import React from "react";

function QuestionItem({ question, deleteItem }) {
	const { id, prompt, answers, correctIndex } = question;

	const options = answers.map((answer, index) => (
		<option key={index} value={index}>
			{answer}
		</option>
	));
		
	function handleDelete() {
		deleteItem(id)
	}

	return (
		<li>
			<h4>Question {id}</h4>
			<h5>Prompt: {prompt}</h5>
			<label>
				Correct Answer:
				<select defaultValue={correctIndex}>{options}</select>
			</label>
			<button onClick={handleDelete}>Delete Question</button>
		</li>
	);
}
export default QuestionItem;
