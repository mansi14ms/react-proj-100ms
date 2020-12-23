import React, { Component } from "react";
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Hello from "./Hello";
import Home from "./Home";
import "./style.css";

class Char extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      data: null
    };
    this.lower = 0;
    this.upper = 10;
    this.quotes = null;
  }

  componentDidMount = () => {
    fetch(
      "https://www.breakingbadapi.com/api/characters/" +
        this.props.match.params.id
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  };

  getQuotes(name) {
    fetch(
      "https://www.breakingbadapi.com/api/quote?author=" +
        name.replace(/ /g, "+")
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.quotes = data;
      });
    this.checkQuotes();
  }
  checkQuotes() {
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <div>
          {this.state.data &&
            this.state.data.map(user => (
              <div>
                
                <div class="bad">
                  <div class="box">
                  <img src={user.img} width="20%" height="20%" />
                </div>
                  <p>Name : {user.name}</p>
                  <p>Occupation : {user.occupation + ","} </p>
                  <p>DOB:{user.birthday + " "}</p>
                  <p>Status:{user.status}</p>
                  <p>Nickname:{user.nickname}</p>
                  <p>Category:{user.appearance}</p>
                  <p>Actor:{user.portrayed}</p>
                  {this.quotes && <p>Quotes:</p>}
                  {this.quotes &&
                    this.quotes.map(quote => <p>{quote.quote}</p>)}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default Char;
