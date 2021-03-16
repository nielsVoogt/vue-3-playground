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

<style lang="scss">
@import "style/reset";
@import "style/base";

.app {
  margin: 0 auto;
  max-width: 600px;
}
</style>
