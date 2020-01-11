import React, { Component } from "react";
import { Button } from "components";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };

    this.handleButton = this.handleButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleButton() {
    window.alert(`Name: ${this.state.name}`);
  }

  handleInput(event) {
    const name = event.target.value;
    this.setState({
      name
    });
  }

  async componentDidMount() {
    console.log(`Fs: ${new Date()}`);
    await this.sss();
    console.log(`Sn: ${new Date()}`);
  }

  sss = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("some"));
      }, 5000);
    });
  };

  render() {
    return (
      <div>
        <Button content="Click btn" onClick={this.handleButton} />
        {/* <Button onClick={this.handleButton} content="Click btn" /> */}
        {/* <div>
          <label>Name</label>
          <Input onChange={this.handleInput} value={this.state.name} />
        </div> */}
      </div>
    );
  }
}

export default App;
