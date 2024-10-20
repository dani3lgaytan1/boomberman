import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBhPQRqcRqvSOeyibwqMnUAxVU6mhpHkBw",
    authDomain: "bombermangame-add2a.firebaseapp.com",
    projectId: "bombermangame-add2a",
    storageBucket: "bombermangame-add2a.appspot.com",
    messagingSenderId: "1003395581361",
    appId: "1:1003395581361:web:0a65203216d8c0c276e990"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registrationForm = document.getElementById('registrationFrom');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Usuario registrado:', userCredential.user);
            alert('Usuario registrado:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error al registrar:', error);
            alert('Error al registrarse.');
        });
});
