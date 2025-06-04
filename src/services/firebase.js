import { initializeApp } from "firebase/app";
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

const firebaseConfig = {
  apiKey: "AIzaSyBC14b2uWnpZ1cV9AhQgvga-nfOuWtRchI",
  authDomain: "geekapp1-3fd31.firebaseapp.com",
  projectId: "geekapp1-3fd31",
  storageBucket: "geekapp1-3fd31.firebasestorage.app",
  messagingSenderId: "396532800568",
  appId: "1:396532800568:web:8d545b798f74edda3b9acd",
  measurementId: "G-7KV4H3PGSY",
};

const appFirebase = initializeApp(firebaseConfig);
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
