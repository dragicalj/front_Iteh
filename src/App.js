import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  
  
  
  constructor(props) {
    super(props);

    this.state={
      access_token:null,
      refresh_token:null
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
.then((response) => {response.text())
.then((responseText) => {
  console.log(responseText);
}).then(data => this.setState({ access_token: data.t, refresh_token: data.re })
.catch((error) => {
    console.error(error);
}));
}
    
  
  render(){
  
  return (
    <div className="App">
      
      <button onClick={this.componentDidCatch}> Click me!{this.state} </button>
    </div>
  );
}
}

export default App;
