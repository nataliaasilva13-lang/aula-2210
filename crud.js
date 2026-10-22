// Importações do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCZE-o9hzD0SOZfDGtNcdth1ZVV2IWLL-4",
  authDomain: "aula-2110.firebaseapp.com",
  projectId: "aula-2110",
  storageBucket: "aula-2110.firebasestorage.app",
  messagingSenderId: "665684591127",
  appId: "1:665684591127:web:6259c9cb0079864324d252",

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colecaoPessoas = collection(db, "pessoas");

export async function criarPessoa(nome, idade) {
  return await addDoc(colecaoPessoas, { nome, idade });
}

export function escutarPessoas(callback) {
  onSnapshot(colecaoPessoas, (snapshot) => {
    const lista = [];
    snapshot.forEach((documento) => {
      lista.push({
        id: documento.id,
        ...documento.data()
      });
    });
    callback(lista); 
  });
}


export async function atualizarPessoa(id, nome, idade) {
  const pessoaRef = doc(db, "pessoas", id);
  return await updateDoc(pessoaRef, { nome, idade });
}


export async function excluirPessoa(id) {
  const pessoaRef = doc(db, "pessoas", id);
  return await deleteDoc(pessoaRef);
}