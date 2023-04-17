import { useState } from 'react'
import googleLogo from '../src/assets/google.png'
import signOutIcon from '../src/assets/signout.png'
import './App.css'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './Firebase/firebase.config';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSign = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
      setUser(loggedUser)
    })
    .catch(error => {
      console.log(error);
    })
  }

  const handleSignOut = () =>{
    signOut(auth).then((result) => {
      // Sign-out successful.
      setUser(null)
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  return (
    <div className="App">
      <h2>Firebase Authentication</h2>
      {
        user && <div  className='card'>
          <img src={user.photoURL} alt="" className='profile'/>
          <h4>User: {user.displayName}</h4>
          <h4>Email: {user.email}</h4>
          <h4>Status: Active</h4>
        </div>
      }

      {/* user ? logout : signin */}
      {
        user ? <div>
            <button onClick={handleSignOut} className='signout btn'><img src={signOutIcon} alt="" className='google' /><span>SignOut</span></button></div> : <div>
            <button onClick={handleGoogleSign} className='signin btn'><img src={googleLogo} alt="" className='google' /><span>Google Sign In</span></button></div>
      }

    </div>
  )
}

export default App
