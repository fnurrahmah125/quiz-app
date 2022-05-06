<template>
  <div class="container">
    <h2>Leaderboard</h2>
    <ul v-for="item in users" :key="item.id">
      <li>{{ item.name }} - {{ item.score }}</li>
    </ul>
    <router-link to="/" class="btn-home">Go Home</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HighScores",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async loadData() {
      let result = await axios.get("https://tranquil-wildwood-76482.herokuapp.com/users");
      this.users = result.data.sort(function (x, y) {
        return y.score - x.score;
      });
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>
