<template>
  <input
    type="checkbox"
    v-model="question.correct"
    :checked="question.correct === index + 1"
    :name="`correct-${question.id}`"
    :value="index + 1"
  />
  <input
    type="text"
    v-model="question.answers[index]"
    spellcheck="false"
    ref="questionInput"
  />
  <button @click="deleteAnswer(question.id, index)">X</button>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import { deleteAnswer } from "../useQuiz";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
  },
});

// ------------ ELEMENT REF + LIFECYCLE HOOK

const questionInput = ref(null);

onMounted(() => {
  if (questionInput.value.value === "") {
    questionInput.value.focus();
  }
});
</script>

<style lang="scss">
.question-answer {
  border: 1px solid #b6b6b6;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  padding: 0 1em;

  input[type="checkbox"] {
    appearance: none;
    width: 1em;
    height: 1em;
    border: 1px solid #b6b6b6;
  }

  input[type="text"] {
    margin-left: 1em;
    padding: 1em;
    width: 100%;
  }
}
</style>
