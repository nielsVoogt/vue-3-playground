import { reactive } from "vue";

const quiz = reactive([
  {
    id: 1,
    question: "Dit is een vraag",
    answers: ["a", "b", "c"],
    correct: [1],
  },
]);

const addQuestion = () => {
  quiz.push({
    id: Math.floor(Math.random() * 10000),
    question: null,
    answers: [],
    correct: [],
  });
};

const getQuestionIndex = (id) => {
  return quiz.findIndex((question) => question.id == id);
};

const deleteAnswer = (id, index) => {
  quiz[getQuestionIndex(id)].answers.splice(index, 1);
};

const deleteQuestion = (id) => {
  quiz.splice(getQuestionIndex(id), 1);
};

const addAnswer = (id) => {
  quiz[getQuestionIndex(id)].answers.push("");
};

export { quiz, addQuestion, deleteAnswer, deleteQuestion, addAnswer };
