import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBhdDIU5ybVg2XdiaxllKFJwrPTLrqksRA",
    authDomain: "scorebot-2020.firebaseapp.com",
    databaseURL: "https://scorebot-2020.firebaseio.com",
    projectId: "scorebot-2020",
    storageBucket: "scorebot-2020.appspot.com",
    messagingSenderId: "605189420637",
    appId: "1:605189420637:web:d6a91380790d6494bc3fb4"
};
const fire = firebase.initializeApp(config);

export default fire;
