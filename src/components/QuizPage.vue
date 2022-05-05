<template>
  <div class="container">
    <p class="question">{{ questions[idx]["question"] }}</p>

    <label v-for="(option, index) in questions[idx]['options']" :key="index">
      <span class="optionText">{{ option }}</span>
      <input type="radio" name="option" :id="index" :value="index" @change="answered($event)" />
      <span class="checkmark"></span>
    </label>

    <span class="infoSubmit">Click the button below to submit your answer.</span>
    <span class="infoEmpty hidden">You have to choose one of the four options.</span>

    <button @click="submitAnswer" class="btn-submit">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuizPage",
  data() {
    return {
      idx: 0,
      selectedAnswer: "",
      totalScore: 0,
      questions: [],
    };
  },
  async created() {
    try {
      const result = await axios.get("https://tranquil-wildwood-76482.herokuapp.com/questions");
      this.questions = result.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    answered(event) {
      this.selectedAnswer = event.target.value;
      if (this.selectedAnswer == this.questions[this.idx]["answer"]) {
        this.totalScore += 10;
      }
    },
    submitAnswer() {
      const infoSubmit = document.querySelector(".infoSubmit");
      const infoEmpty = document.querySelector(".infoEmpty");
      const answer = document.querySelector('input[name="option"]:checked');

      infoSubmit.classList.remove("hidden");
      infoEmpty.classList.add("hidden");

      if (answer != null) {
        if (this.idx >= this.questions.length - 1) {
          if (answer == null) {
            infoSubmit.classList.add("hidden");
            infoEmpty.classList.remove("hidden");
          } else {
            localStorage.setItem("score", this.totalScore);
            this.$router.push({ name: "SaveAnswer" });
          }
        }

        this.idx++;

        if (answer != null) {
          answer.checked = false;
        }
      }

      if (answer == null) {
        infoSubmit.classList.add("hidden");
        infoEmpty.classList.remove("hidden");
      }
    },
  },
};
</script>
