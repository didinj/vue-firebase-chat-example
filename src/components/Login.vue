<template>
  <div class="login">
    <h2>Login</h2>
    <input v-model="username" type="text" placeholder="Enter your username" />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Refs
const email = ref('')
const password = ref('')
const router = useRouter()

// Login function
const login = async () => {
  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/chat')
  } catch (err) {
    alert(err.message)
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 80px auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  text-align: center;
}

.login h2 {
  margin-bottom: 1.5rem;
}

.login input {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 8px;
}

.login button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
