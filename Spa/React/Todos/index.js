import React, {Component} from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

function Todo(props){
    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
                <div className="form-check pt-3">
                    <input className="form-check-input" 
                        type="checkbox" 
                        id={props.id} 
                        checked={props.checked} 
                        onChange={() => props.onChange(props.id)}
                        disabled={props.disabled} />
                    <label className="form-check-label" htmlFor={props.id}>{props.value}</label>
                </div>
            </div>
        </div>
    );
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            done: []
        };
    }
    newTodo(newId,checked,value,disabled){
        return (
            <Todo key={newId}
                id={newId}
                checked={checked}
                value={value}
                onChange={(id) => this.onChange(id)}
                disabled={disabled} />
        );
    }
    onChange(id){
        let completed;
        let todos = [];
        this.state.todos.forEach((oldTodo) => {
            if(oldTodo.props.id === id){
                completed = oldTodo;
            }else{
                todos.push(oldTodo);
            }
        });

        let done = this.state.done.slice();
        done.unshift(this.newTodo(completed.props.id, true, completed.props.value, true));
        this.setState({
            todos: todos,
            done: done
        });

        this.inputBox.focus();
    }
    onKeyPress(e){
        if(e.charCode !== 13) return;

        const todo = e.target.value;
        if(todo == null || todo === "") return;

        let todos = this.state.todos.slice();
        const newId = this.state.todos.length + this.state.done.length;
        todos.unshift(this.newTodo(newId, false, e.target.value, false));
        this.setState({todos: todos});

        e.target.value = "";
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <input autoFocus 
                               type="text" 
                               className="form-control" 
                               aria-label="Default" 
                               placeholder="What do you want to do!?" 
                               onKeyPress={(e) => this.onKeyPress(e)}
                               ref={(input) => this.inputBox = input} />
                    </div>
                </div>
                {this.state.todos}
                <hr/>
                {this.state.done}
            </div>
        );
    }
}

// export default App;

ReactDOM.render(<App />, document.getElementById("root"));