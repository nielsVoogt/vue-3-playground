<template>
  <div class="question">
    <button @click="validateBeforeToggle" class="question-toggle">
      toggle
    </button>
    <div class="question-content">
      <div>
        <input type="text" v-model="question.question" ref="questionInput" />
        <div>{{ question.answers.length }} antwoorden</div>
      </div>
      <button @click="deleteQuestion">D</button>
    </div>
  </div>
  <div v-if="open" class="question-answers">
    <ul v-if="question.answers.length">
      <li
        v-for="(_, index) in question.answers"
        :key="index"
        class="question-answer"
      >
        <Answer :question="question" :index="index" />
      </li>
    </ul>
    <button
      @click="addAnswer(question.id)"
      v-if="question.answers.length < 4"
      :disabled="question.question === null"
      class="add-question"
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

<style lang="scss">
.question {
  display: flex;
  margin-bottom: 1em;

  .question-toggle {
    background: #b6b6b6;
  }
}

.question-content {
  display: flex;
  background: red;
  width: 100%;
  margin-left: 1em;

  > div {
    width: 100%;

    input[type="text"] {
      padding: 1em;
      width: 100%;
    }
  }
}

.question-answers {
  margin-left: 2em;
  position: relative;
  margin-top: 1em;

  &::before {
    content: "";
    top: 0;
    bottom: 0;
    left: -1.5em;
    width: 0.75em;
    border-radius: 0.75em;
    background: #b6b6b6;
    position: absolute;
  }

  .add-question {
    padding: 1em;
    border: 1px dashed red;
    width: 100%;
    border-radius: 0.4em;
    text-align: left;
  }
}
</style>
