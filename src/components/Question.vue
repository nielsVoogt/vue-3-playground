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
          type="radio"
          v-model="question.correct"
          :checked="answer.correct === index"
          :name="'correct-' + question.id"
          :value="index"
        />
        <input type="text" v-model="question.answers[index]" />
        <button @click="deleteAnswer(index)">X</button>
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
import { defineProps, defineEmit, ref, onMounted } from 'vue'

// ------------ PROPS

const props = defineProps({
  question: Object,
});

// ------------ STATE

const open = ref(false);

// ------------ METHODS

const validate = (e) => {
  console.log("blur", e.target.value);
}

const validateBeforeToggle = () => {
  if (!props.question.correct) {
    console.warn("Je moet een correct antwoord selecteren");
  } else {
    open.value = !open.value;
  }
}

// We define emits like this:

const emit = defineEmit(['deleteAnswer', 'deleteQuestion', 'addAnswer'])

const deleteAnswer = (index) => {
  emit("deleteAnswer", props.question.id, index);
}

const deleteQuestion = () => {
  emit("deleteQuestion", props.question.id);
}

const addAnswer = () => {
  emit("addAnswer", props.question.id);
}

// ------------ ELEMENT REF + LIFECYCLE HOOK

const questionInput = ref(null)

onMounted(() => {
    if (props.question.question === null) {
      open.value = true;
      questionInput.value.focus()
    }
})
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
