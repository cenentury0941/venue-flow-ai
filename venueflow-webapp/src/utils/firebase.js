import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { system_id } from "./urls";

const firebaseConfig = {
    apiKey: "AIzaSyDIj5uMkVgm9hJwXyoI8TW9yPzG3gU7GHU",
    authDomain: "venue-flow-ai.firebaseapp.com",
    databaseURL: "https://venue-flow-ai-default-rtdb.firebaseio.com",
    projectId: "venue-flow-ai",
    storageBucket: "venue-flow-ai.firebasestorage.app",
    messagingSenderId: "725802916522",
    appId: "1:725802916522:web:e6b2c8246d7c69b8b38ed3"
  };
  
const app = initializeApp(firebaseConfig);

function getCameraState(updateState){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${system_id}/cameras`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        updateState(JSON.parse(snapshot.val()))
        console.log("Retrieved Flow State")
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}

function setCameraState(state){
    const db = getDatabase();
    set(ref(db, `${system_id}/cameras`), JSON.stringify(state));
    console.log("Updated Flow State")
}

function getEdgeState(updateState){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${system_id}/edges`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        updateState(JSON.parse(snapshot.val()))
        console.log("Retrieved Flow State")
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
}

function setEdgeState(state){
    const db = getDatabase();
    set(ref(db, `${system_id}/edges`), JSON.stringify(state));
    console.log("Updated Flow State")
}


export {getCameraState , setCameraState, getEdgeState, setEdgeState}