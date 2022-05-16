import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState} from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
  

  constructor(props) {
    super(props);

    this.state={
      access_token:null,
      refresh_token : null
    }
  }

  

  componentDidMount() {
    // Simple POST request with a JSON body using fetch
    fetch("http://localhost:8090/api/login", {
  method: 'POST',
  headers: new Headers({
             'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
    }),
  body: "username=john&password=1234" // <-- Post parameters
})
.then(response => response.json())
        .then(data => this.setState({ access_token: data.access_token, refresh_token: data.refresh_token }))
        .then(
          console.log("radi"))
.catch((error) => {
    console.error(error);
});
}
    
  
  render(){
    const { access_token, refresh_token } = this.state;
  return (
    <div className="App">
      
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          
        </div>
        <div className="button-container">
          <button onClick={this.componentDidCatch}> Login </button>
        </div>
      {console.log(access_token)}
      
    </div>
  );
}
}

export default App;
