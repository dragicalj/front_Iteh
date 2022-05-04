import logo from './logo.svg';
import './App.css';
import React from 'react';

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
    fetch("http://localhost:8080/api/login", {
  method: 'POST',
  headers: new Headers({
             'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
    }),
  body: "username=john&password=1234" // <-- Post parameters
})
.then(response => response.json())
        .then(data => this.setState({ access_token: data.access_token, refresh_token: data.refresh_token }))
.catch((error) => {
    console.error(error);
});
}
    
  
  render(){
    const { access_token, refresh_token } = this.state;
  return (
    <div className="App">
      <h1>
        {console.log(access_token)}
        {console.log(refresh_token)}
      </h1>
      <button onClick={this.componentDidCatch}> Click me! </button>
    </div>
  );
}
}

export default App;
