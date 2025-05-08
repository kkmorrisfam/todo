import { useEffect, useState } from "react"
import "./styles.css"
import NewTodoForm from "./NewTodoForm"
import { TodoList } from "./TodoList"

export default function App() {
  
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  //save new values into local storage
  useEffect(()=> {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])
  function addTodo(title) {
    setTodos((currentTodos)=> {
      return [
        ...currentTodos,    //creating a whole new todo object array with new values
        {id: crypto.randomUUID(), 
          title, 
          completed: false},
      ]
    })

  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo=> {
        if (todo.id === id) {
          return { ...todo, completed} //creating a brand new state object, not mutating original
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos=> {
      return currentTodos.filter(todo=> todo.id !== id) //if id is not equal to current id, then I want to keep it, otherwise don't add to new array of objects
    })
  }
  // console.log(todos)

  return (
//can call onSubmit whatever you want, just match in props. object
//pass addTodo results to NewTodoForm via props
    <>           
    <NewTodoForm onSubmit={addTodo} />   
    <h1 className="header" >To Do List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}