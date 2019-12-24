
import React, { Component } from "react";
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '', list: [] }

  };
  componentDidMount() {
    this.getting();
  }
  getting = () => {
    axios.get("http://localhost:8001/RUBY").then(result => {

      console.log(result.data);
      this.setState({
        //list:[this.state.list,result.data]
        list: result.data
      });
    });
  }


  handleChange = (e1) => {
    this.setState({
      input: e1.target.value
    })
  }

  submit = () => {
    axios.post("http://localhost:8001/RUBY", { content: this.state.input }).then(success => {
      this.setState({
        list: [...this.state.list, success.data],
        input: " "
      })
    })


    console.log("welcome to program world");

  };

  deleteList = (id1) => {
    axios.delete("http://localhost:8001/RUBY/" + id1).then(value => {

      this.setState({
        list: [...this.state.list, value],
      })
      this.getting();
    })
  }
  updateList = (id2, input1) => {
    var upt = prompt("Enter your value", input1)
    axios.put("http://localhost:8001/RUBY/" + id2, { content: upt }).then(value => {
      this.setState({
        list: [...this.state.list, value],


      })
      this.getting();

    })
  }


  render() {
    return (
      <div>
        <center><h1>Items</h1></center>
        <center><input type="text" onChange={this.handleChange} value={this.state.input}></input></center><br></br>
        <center><button onClick={this.submit}>Submit</button></center><br></br>

        <center><h3 >List Of items:</h3></center>
        {/* <center><span >{this.state.val}</span></center> */}
        {
          this.state.list.map((i) => {
            return (
              <li key={i.id}>{i.content}
                <center><button onClick={this.deleteList.bind(this, i.id)}>Delete</button></center><br></br>
                <center><button onClick={this.updateList.bind(this, i.id, i.content)}>Update</button></center>
              </li>
            )
          })
        }
      </div>
    );
  }
}
export default App;

