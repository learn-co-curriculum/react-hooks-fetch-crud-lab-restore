export const fetchQuestions = (setQuestions) => {
  fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then(setQuestions)
}
