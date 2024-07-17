import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCSEX9WWz6JWrRMgxmh5BkmxDqXj5WkpS4",
  authDomain: "news-aggregator-50ad8.firebaseapp.com",
  projectId: "news-aggregator-50ad8",
  storageBucket: "news-aggregator-50ad8.appspot.com",
  messagingSenderId: "332923924249",
  appId: "1:332923924249:web:2ac4b6e3481fd9cf06df88"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider,db};
