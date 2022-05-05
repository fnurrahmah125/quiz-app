import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("./components/HomePage.vue"),
  },
  {
    path: "/quiz",
    name: "QuizPage",
    component: () => import("./components/QuizPage.vue"),
  },
  {
    path: "/highscores",
    name: "HighScores",
    component: () => import("./components/HighScores.vue"),
  },
  {
    path: "/save-answer",
    name: "SaveAnswer",
    component: () => import("./components/SaveAnswer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
