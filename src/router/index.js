import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import RoomList from "../components/Room.vue";
import Chat from "../components/Chat.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/rooms", component: RoomList },
  { path: "/chat/:roomId", component: Chat, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
