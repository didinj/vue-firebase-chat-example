import Vue from 'vue'
import Router from 'vue-router'
import Chat from './components/Chat.vue'
import Room from './components/Room.vue'
import AddRoom from './components/AddRoom.vue'
import Login from './components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/chat/:nickname/:roomid/:roomname',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/room/:nickname',
      name: 'RoomList',
      component: Room
    },
    {
      path: '/add-room',
      name: 'AddRoom',
      component: AddRoom
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
