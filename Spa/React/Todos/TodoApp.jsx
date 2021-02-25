import React, { Component } from "react";
import { hot } from "react-hot-loader";

export function Todo(props) {
    return (
        <li className="list-group-item">
            <input className="form-check-input"
                type="checkbox"
                id={props.id}
                checked={props.checked}
                onChange={() => props.onChange(props.id)}
                disabled={props.disabled} />
            <label className="form-check-label" htmlFor={props.id}>{props.value}</label>
            <button type="button" className="close" aria-label="Close" onClick={() => props.onDeleteClick(props.id, props.disabled)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </li>
    );
}

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            done: [],
            nextId: 0
        };
    }
    newTodo(newId, checked, value, disabled) {
        return (
            <Todo key={newId}
                id={newId}
                checked={checked}
                value={value}
                onChange={(id) => this.onChange(id)}
                disabled={disabled}
                onDeleteClick={(id, disabled) => this.onDeleteClick(id, disabled)} />
        );
    }
    onDeleteClick(id, disabled) {
        let list = [];
        const listToRemoveFrom = disabled ? this.state.done : this.state.todos;
        listToRemoveFrom.forEach((todo) => {
            if (todo.props.id !== id) list.push(todo);
        });

        if (disabled)
            this.setState({ done: list });
        else
            this.setState({ todos: list });

        this.inputBox.focus();
    }
    onChange(id) {
        let completed;
        let todos = [];
        this.state.todos.forEach((oldTodo) => {
            if (oldTodo.props.id === id) {
                completed = oldTodo;
            } else {
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
    onKeyPress(e) {
        if (e.charCode !== 13) return;

        const todo = e.target.value;
        if (todo == null || todo === "") return;

        let todos = this.state.todos.slice();
        const newId = this.state.todos.length + this.state.done.length;

        // TODO - setting the ID of a todo will be done by DB, but we'll fake it here for now
        todos.unshift(this.newTodo(this.state.nextId, false, e.target.value, false));
        this.setState(function (state, props) {
            return {
                todos: todos,
                nextId: state.nextId + 1
            };
        })

        e.target.value = "";
    }
    componentDidMount(){
        this.inputBox.focus();
    }
    render() {
        return (
            <div>
                <div className="row justify-content-center mb-2">
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
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <ul className="list-group list-group-flush">
                            {this.state.todos}
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <ul className="list-group list-group-flush">
                            {this.state.done}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
