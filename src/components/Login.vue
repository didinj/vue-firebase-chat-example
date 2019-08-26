<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Login
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-form-input id="nickname" v-model.trim="login.nickname" placeholder="Enter your nickname"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="!login.nickname">Login</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import router from '../router'

export default {
  name: 'AddBoard',
  data () {
    return {
      login: { nickname: '' }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()

      router.push({
        name: 'RoomList',
        params: { nickname: this.login.nickname }
      })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>