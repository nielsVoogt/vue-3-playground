<template>
  <button @click="addQuestion">Add question</button>
  <ul v-if="quiz.length">
    <li v-for="(question, index) in quiz" :key="index">
      <Question :question="question" />
    </li>
  </ul>

  {{ quiz }}
</template>

<script setup>
import Question from "./components/Question.vue";
import { quiz, addQuestion } from "./useQuiz";
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
