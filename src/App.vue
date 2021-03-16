<template>
<button @click="addQuestion">Add question</button>
<ul v-if="quiz.length">
  <li v-for="(question, index) in quiz" :key="index">
    <Question
      :question="question"
      @add-answer="addAnswer"
      @delete-answer="deleteAnswer"
      @delete-question="deleteQuestion"
    />
  </li>
</ul>
</template>

<script setup>
import Question from "./components/Question.vue";
import { reactive } from "vue";

const quiz = reactive([
  {
    id: 1,
    question: "Dit is een vraag",
    answers: ["a", "b", "c"],
    correct: 1,
  },
]);

const addQuestion = () => {
  quiz.push({
    id: Math.floor(Math.random() * 10000),
    question: null,
    answers: [],
    correct: false,
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
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
