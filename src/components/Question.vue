<template>
  <div class="question">
    <button @click="validateBeforeToggle">toggle</button>
    <div class="question-content">
      <div>
        <input type="text" v-model="question.question" ref="questionInput" />
        <div>{{ question.answers.length }} antwoorden</div>
      </div>
      <button @click="deleteQuestion">D</button>
    </div>
  </div>
  <div v-if="open" class="answers">
    <ul>
      <li v-for="(answer, index) in question.answers" :key="index">
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
          v-focus
          spellcheck="false"
        />
        <button @click="deleteAnswer(question.id, index)">X</button>
      </li>
    </ul>
    <button
      @click="addAnswer(question.id)"
      v-if="question.answers.length < 4"
      :disabled="question.question === null"
    >
      Add answer
    </button>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import { addAnswer, deleteAnswer, deleteQuestion } from "../useQuiz";

// ------------ PROPS

const props = defineProps({
  question: Object,
});

// ------------ STATE

const open = ref(false);

// ------------ METHODS

const validate = (e) => {
  console.log("blur", e.target.value);
};

const validateBeforeToggle = () => {
  if (!props.question.correct.length) {
    console.warn("Je moet een correct antwoord selecteren");
  } else {
    open.value = !open.value;
  }
};

// ------------ ELEMENT REF + LIFECYCLE HOOK

const questionInput = ref(null);

onMounted(() => {
  if (props.question.question === null) {
    open.value = true;
    questionInput.value.focus();
  }
});
</script>

<style></style>
