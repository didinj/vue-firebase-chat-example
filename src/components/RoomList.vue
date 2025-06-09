<template>
  <div class="room-list">
    <h2>Chat Rooms</h2>
    <ul>
      <li v-for="room in rooms" :key="room.id" @click="goToRoom(room.id)">
        {{ room.name }}
      </li>
    </ul>
    <router-link to="/add-room" class="add-room-link">+ Add Room</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getDatabase, ref as dbRef, onValue } from 'firebase/database'

// Reactive state
const rooms = ref([])
const router = useRouter()

// Fetch room list on mount
onMounted(() => {
  const db = getDatabase()
  const roomsRef = dbRef(db, 'rooms')

  onValue(roomsRef, snapshot => {
    const data = snapshot.val()
    rooms.value = Object.keys(data || {}).map(id => ({
      id,
      ...data[id],
    }))
  })
})

// Navigate to selected room
const goToRoom = room => {
  router.push(`/chat/${room.id}`)
}
</script>

<style scoped>
.room-list {
  max-width: 600px;
  margin: 40px auto;
  padding: 1rem;
}

.room-list h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.room-list ul {
  list-style: none;
  padding: 0;
}

.room-list li {
  padding: 12px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}

.room-list li:hover {
  background-color: #f5f5f5;
}

.add-room-link {
  display: inline-block;
  margin-top: 20px;
  text-align: center;
  color: #42b983;
  text-decoration: none;
}
</style>
