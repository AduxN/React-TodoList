import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList"
import uuid from 'react-uuid'
import "./css/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete //reverse checkbox
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name === '') return;
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div class="todos"><TodoList todos={todos} toggleTodo={toggleTodo} /></div>
      <div class="input"><input class="inText" ref={todoNameRef} type="text" /></div>
      <div class="buttons"><Button variant="outline-success" size="sm" onClick={handleAddTodo}>Add</Button>{' '}
      <Button variant="outline-warning" size="sm" onClick={handleClearTodos}>Clear Completed</Button></div>
      <div class="leftText">{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
