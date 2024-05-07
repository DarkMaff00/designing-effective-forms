import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


// Konfiguracja Firebase

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#exampleInputEmail1");

const displayErrorMessage = (errorMessage) => {
    // Wyświetl komunikat błędu
    console.error(errorMessage);
    // Możesz również dodać logikę wyświetlającą komunikat dla użytkownika na stronie
};

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        console.log(user);

        // Wypełnienie pól formularza
        nameInput.value = user.displayName;
        emailInput.value = user.email;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Przechwyć błędy i wyświetl odpowiednie komunikaty
        if (errorCode === 'auth/popup-closed-by-user') {
            displayErrorMessage("Logowanie anulowane przez użytkownika.");
        } else {
            displayErrorMessage("Wystąpił błąd podczas logowania: " + errorMessage);
        }
    })
}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("Zostałeś wylogowany!");
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Przechwyć błędy i wyświetl odpowiednie komunikaty
        displayErrorMessage("Wystąpił błąd podczas wylogowywania: " + errorMessage);
    });
}

 
 onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
    }
 })

 
 signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);

