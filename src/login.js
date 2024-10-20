import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhPQRqcRqvSOeyibwqMnUAxVU6mhpHkBw",
    authDomain: "bombermangame-add2a.firebaseapp.com",
    projectId: "bombermangame-add2a",
    storageBucket: "bombermangame-add2a.appspot.com",
    messagingSenderId: "1003395581361",
    appId: "1:1003395581361:web:0a65203216d8c0c276e990"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Iniciar sesión con Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Usuario autenticado:', userCredential.user);
            alert('Inicio sesión con éxito.');
            window.location.href = "../index.html";
        })
        .catch((error) => {
            alert('Error al iniciar sesion.');
            console.error('Error al iniciar sesión:', error);
            if (error.code === 'auth/user-not-found') {
                alert('Usuario no encontrado. Verifica tu correo o regístrate.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Contraseña incorrecta. Inténtalo de nuevo.');
            } else {
                alert('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
            }
        });
});
