import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'https://www.freecodecamp.org'
    }
};

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    alert('A URL was submitted: ' + this.state.value)
    event.preventDefault();
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>URL Shortener</h3>
        <form action="http://localhost:3001/api/shorturl/new" method="POST">
          <label>URL to be shortened</label><br />
          <input id="url_input" type="text" name="url" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="POST URL" />
        </form>
      </header>
    </div>
  );
  };
}

export default App;
