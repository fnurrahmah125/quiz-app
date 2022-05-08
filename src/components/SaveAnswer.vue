<template>
  <div class="container">
    <p class="totalScore">Total score</p>
    <h1>{{ totalScore }}</h1>
    <input type="text" v-model="name" placeholder="Enter your name" autofocus />
    <span class="infoSave">The name is not available</span>
    <button @click="saveName()" class="btn-save">Save</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SaveAnswer",
  data() {
    return {
      name: "",
      totalScore: "",
      questions: [],
      users: [],
    };
  },
  async created() {
    try {
      const res_ques = await axios.get("https://aqueous-escarpment-94313.herokuapp.com/questions");
      const res_users = await axios.get("https://aqueous-escarpment-94313.herokuapp.com/users");
      this.questions = res_ques.data;
      res_users.data.forEach((item) => {
        this.users.push(item.name.toLowerCase());
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async saveName() {
      if (this.name != "" && !this.users.includes(this.name.toLowerCase())) {
        const result = await axios.post("https://aqueous-escarpment-94313.herokuapp.com/users", {
          name: this.name,
          score: this.totalScore,
        });

        if (result.status == 201) {
          this.totalScore = localStorage.removeItem("score");
          this.$router.push({ name: "HomePage" });
        }
      } else {
        const info = document.querySelector(".infoSave");
        info.style.display = "block";
      }
    },
  },
  mounted() {
    this.totalScore = localStorage.getItem("score");
  },
};
</script>
