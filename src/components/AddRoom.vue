<template>
  <div class="add-room">
    <h2>Add New Room</h2>
    <input v-model="roomName" type="text" placeholder="Room name" />
    <button @click="createRoom">Create Room</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getDatabase, ref as dbRef, push } from 'firebase/database'

const router = useRouter()
const roomName = ref('')

const createRoom = () => {
  const name = roomName.value.trim()
  if (!name) return

  const db = getDatabase()
  const roomsRef = dbRef(db, 'rooms')
  push(roomsRef, { name })

  roomName.value = ''
  router.push('/rooms')
}
</script>

<style scoped>
.add-room {
  max-width: 400px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  text-align: center;
}

.add-room h2 {
  margin-bottom: 1.5rem;
}

.add-room input {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 8px;
}

.add-room button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
