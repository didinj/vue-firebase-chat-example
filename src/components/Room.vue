<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
        <b-link href="/add-room">(Add Room)</b-link>
      </h2>
      <b-list-group>
          <b-list-group-item v-for="room in rooms" :key="room.key" :to="{name: 'Chat', params: {nickname: nickname, roomid: room.key, roomname: room.roomName}}" action>
              {{room.roomName}}
          </b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'

export default {
  name: 'BoardList',
  data () {
    return {
      nickname: this.$route.params.nickname,
      rooms: [],
      errors: [],
      ref: firebase.database().ref('chatrooms/')
    }
  },
  created () {
    this.ref.on('value', (snapshot) => {
      this.rooms = [];
      snapshot.forEach((doc) => {
        let item = doc.val()
        item.key = doc.key
        this.rooms.push(item)
      });
    });
  }
}
</script>

<style>
  .table {
    width: 96%;
    margin: 0 auto;
  }
</style>