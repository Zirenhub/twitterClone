import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCTVwCY9nKM-z__ZB5NRjvm1nYWr-I9TlY',

  authDomain: 'twitter-clone-a79a8.firebaseapp.com',

  projectId: 'twitter-clone-a79a8',

  storageBucket: 'twitter-clone-a79a8.appspot.com',

  messagingSenderId: '128656031080',

  appId: '1:128656031080:web:4fe8b51537e2c1427daadd',
};

const app = initializeApp(firebaseConfig);

export { app };
