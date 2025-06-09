<template>
  <div class="chat">
    <h2>{{ roomName }}</h2>
    <div class="messages">
      <div
        class="message"
        v-for="message in messages"
        :key="message.id"
      >
        <strong>{{ message.user }}:</strong> {{ message.text }}
      </div>
    </div>
    <div class="send-box">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Type a message"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../firebase';
import { ref as dbRef, push, onValue } from 'firebase/database';

const route = useRoute();
const roomId = route.params.roomId;

const messages = ref([]);
const newMessage = ref('');

onMounted(() => {
  const r = dbRef(db, `rooms/${roomId}/messages`);
  onValue(r, snapshot => {
    messages.value = [];
    snapshot.forEach(child => {
      messages.value.push({ id: child.key, ...child.val() });
    });
  });
});

function send() {
  if (!newMessage.value) return;
  push(dbRef(db, `rooms/${roomId}/messages`), {
    sender: 'Anonymous',
    text: newMessage.value,
    timestamp: Date.now(),
  });
  newMessage.value = '';
}
</script>

<style scoped>
.chat {
  max-width: 700px;
  margin: 40px auto;
  padding: 1rem;
}

.chat h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.messages {
  max-height: 400px;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #fafafa;
}

.message {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.send-box {
  display: flex;
  gap: 10px;
}

.send-box input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 8px;
}

.send-box button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
