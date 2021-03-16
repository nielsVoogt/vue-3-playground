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
    <ul v-if="question.answers.length">
      <li v-for="(_, index) in question.answers" :key="index">
        <Answer :question="question" :index="index"/>
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
import Answer from "./Answer.vue";

// ------------ PROPS

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
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
