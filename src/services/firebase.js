// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { AxiosHeaders } from "axios";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPZZBHtc_fCm3mdyw1BLJDH51z6IJoPoM",
  authDomain: "gekapp-af106.firebaseapp.com",
  projectId: "gekapp-af106",
  storageBucket: "gekapp-af106.firebasestorage.app",
  messagingSenderId: "340151076360",
  appId: "1:340151076360:web:f6865292fd204fce37b3bd",
  measurementId: "G-S9VW0P7XR9",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const authFirebase = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Auth = {
  login: async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  checkIfLogin: async () => {
    return authFirebase.currentUser;
  },
  createTask: async (title, description, boardId, userId, date, time) => {
    try {
      const taskRef = collection(db, "tasks");
      await addDoc (taskRef, {
        title,
        description,
        boardId,
        userId,
        status: "todo",
        date,
        time,
        createAt: new Date(),
      })
    } catch (error) {
      console.error("Erro ao criar tarefa", error);
    }
  },
  
 getUserTasks: async (userId) => {
  try {
    const taskRef = collection(db, "tasks");
    const q = query(taskRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  } catch (error) {
    console.error("Erro ao buscar tarefas", error);
    return [];
  }
},

  updateTasksStatus: async(taskId, newStatus) => {
    try{
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, {
        status: newStatus,
      });
      console.log("Status de tarefa atualizado com sucesso")
    } catch (error) {
      console.error("Erro ao atualizar status de tarefa", error)
    }
  }
};


export default Auth;
