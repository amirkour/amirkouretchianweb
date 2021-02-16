console.log("hi world from react TODOs!?");

import React, {Component} from "react";
import ReactDOM from "react-dom";
// import App from "./App.js";

// import Component from "react";
import { hot } from "react-hot-loader";
// import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>React, Hi World!?</h1>
            </div>
        );
    }
}

// export default App;

ReactDOM.render(<App />, document.getElementById("root"));