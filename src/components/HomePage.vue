<template>
  <div class="container">
    <h1>Are you ready?</h1>
    <p class="textInfo">The test contains 10 questions and there is no time limit. You will get 10 points for each correct answer.</p>
    <router-link to="/quiz">Play Game</router-link>
    <router-link to="/highscores">High Scores</router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
