import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBsj_8W9G6OPp2tILLgsJMC1kyEGiDuTo4",
  authDomain: "vue-chat-app-88c82.firebaseapp.com",
  databaseURL: "https://vue-chat-app-88c82.firebaseio.com/",
  projectId: "vue-chat-app-88c82",
  storageBucket: "gs://vue-chat-app-88c82.appspot.com/"
};
firebase.initializeApp(config);

export default firebase;