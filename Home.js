import React, { Component } from "react";
import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Character from "./Character";
import Home from "./Home";
import "./style.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      data: null
    };
    this.lower = 0;
    this.upper = 10;
    this.showMe = true;
  }

  componentDidMount = () => {
    fetch("https://www.breakingbadapi.com/api/characters")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      });
  };

  nextClick() {
    if (this.upper < this.state.data.length) {
      this.lower = this.lower + 10;
      this.upper = this.upper + 10;
      this.forceUpdate();
    }
  }

  prevClick() {
    if (this.lower >= 10) {
      this.lower = this.lower - 10;
      this.upper = this.upper - 10;
      this.forceUpdate();
    }
  }

  show() {
    this.showMe = false;
    this.forceUpdate();
  }

  render() {
    return (
      <Router>
        <Route path={"/char/:id"} exact component={Character} />
        <div>
          <div>
            {this.showMe &&
              this.state.data &&
              this.state.data.slice(this.lower, this.upper).map((user, idx) => (
                <Link
                  to={"/char/" + user.char_id}
                  style={{ textDecoration: "none" }}
                  onClick={this.show.bind(this)}
                >
                  <div class="gap">
                    <div id={user.char_id}>
                      <p class="col-md-3">
                        {user.char_id}. Name:{user.name}
                      </p>
                      &nbsp;&nbsp;
                      <p class="col-md-3"> Occupation : {user.occupation} </p>
                      &nbsp;&nbsp;
                      <p class="col-md-3">Birthday:{user.birthday + " "}</p>
                      &nbsp;&nbsp;
                      <p class="col-md-3">Status:{user.status}</p>&nbsp;&nbsp;
                      <p>
                        <button class="btn btn-success">More Info</button>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div>
            {this.state.data && this.showMe && (
              <button onClick={this.prevClick.bind(this)}>Previous</button>
            )}
            {this.state.data && this.showMe && (
              <button onClick={this.nextClick.bind(this)}>Next</button>
            )}
          </div>
          {!this.state.data && <p>Loading</p>}
        </div>
      </Router>
    );
  }
}
export default Home;
