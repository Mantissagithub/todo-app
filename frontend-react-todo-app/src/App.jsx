import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodo] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    axios.get('http://localhost:3000/todos').then((response) => {
      setTodo(response.data);
    });
  }, []);

  const addTodo = () => {
    axios
      .post('http://localhost:3000/todos', { title, description })
      .then((response) => {
        setTitle('');
        setDescription('');
        axios.get('http://localhost:3000/todos').then((response) => {
          setTodo(response.data);
        });
      });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3000/todos/${id}`).then((response) => {
      axios.get('http://localhost:3000/todos').then((response) => {
        setTodo(response.data);
      });
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addTodo}>Add todo</button>
      </div>
      <div>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onDelete={() => deleteTodo(todo.id)} />
        ))}
      </div>
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      <div>Title: {props.todo.title}</div>
      <div>Description: {props.todo.description}</div>
      <div>ID : {props.todo.id}</div>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
}

export default App;
