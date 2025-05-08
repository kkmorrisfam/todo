export function TodoList ({todos}) {
    return <ul className="list">
    {todos.length == 0 && "No Todos"}
  {todos.map(todo => {
    return (
    <TodoList id={todo.id} 
    completed={todo.completed} 
    title={todo.title} 
    key={todo.id} 
    />
)
  })}     
  </ul>
}