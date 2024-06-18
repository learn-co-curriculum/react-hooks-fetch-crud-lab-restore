const questionsUrl = "http://localhost:4000/questions"

export const fetchQuestions = (setQuestions) => {
  fetch(questionsUrl)
    .then((response) => response.json())
    .then(setQuestions)
}

export const createQuestion = (questionData) => {
  return fetch(questionsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(questionData),
  }).then((response) => response.json())
}
