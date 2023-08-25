
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMDrOIGflTiqf5sIJbJBBetfsRfMIoas0",
  authDomain: "clerk-project-a1c9b.firebaseapp.com",
  projectId: "clerk-project-a1c9b",
  storageBucket: "clerk-project-a1c9b.appspot.com",
  messagingSenderId: "237054784436",
  appId: "1:237054784436:web:08fccf621924484f1778e1"
};

// Initialize Firebase
let app;
// if (!apps.length) {
  app = initializeApp(firebaseConfig);
// }



const functions = getFunctions();

const addMessageCallable = httpsCallable(functions, 'addmessage');
const addMessage = async (message) => addMessageCallable({ msg: message })



export {addMessage}
