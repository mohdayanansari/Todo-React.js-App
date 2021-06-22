import firebase from "firebase/app";
import "firebase/auth";
import { useEffect } from "react";
import './Login.css';
import googleIcon from "./google.svg"

export default function Login(props) {
   useEffect(function(){
    let u = JSON.parse(localStorage.getItem("user"));
    if(u) props.history.push("/todo")
   },[]) 
    
  function googleLogin() {

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    firebase.auth().languageCode = "en";
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();

    provider.setCustomParameters({
      login_hint: "user@example.com",
    });

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(result);
        console.log(token);
        localStorage.setItem("user", JSON.stringify(user));
        props.history.push("/todo");

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
  return (
    <div className="Login-Container">
        <h1>The Todo App</h1>
      <button className="Google-Login-btn" onClick={googleLogin}><img src={googleIcon} alt="" /> Login with Google</button>
      <h5>Designed by Ayan Ansari with ❤️</h5>
    </div>
  );
}
