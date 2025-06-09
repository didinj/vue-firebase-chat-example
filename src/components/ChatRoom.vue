<template>
  <div>
    <h2>Chat Room: {{ roomName }}</h2>
    <ul>
      <li v-for="msg in messages" :key="msg.timestamp">
        <strong>{{ msg.user }}:</strong> {{ msg.text }}
      </li>
    </ul>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type a message..."
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getDatabase, ref as dbRef, push, onChildAdded } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const route = useRoute()
const roomName = ref(route.params.roomId)
const messages = ref([])
const newMessage = ref('')

onMounted(() => {
  const db = getDatabase()
  const messagesRef = dbRef(db, `messages/${roomName.value}`)

  onChildAdded(messagesRef, snapshot => {
    messages.value.push(snapshot.val())
  })
})

const sendMessage = () => {
  const text = newMessage.value.trim()
  if (!text) return

  const auth = getAuth()
  const user = auth.currentUser
  const message = {
    text,
    user: user ? user.email : 'Anonymous',
    timestamp: Date.now(),
  }

  const db = getDatabase()
  const messagesRef = dbRef(db, `messages/${roomName.value}`)
  push(messagesRef, message)

  newMessage.value = ''
}
</script>
