import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get("https://dummyjson.com/todos");
    console.log(response.data.todos);
    setTodos(response.data.todos);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTodos = Array.from(todos);
    const [reorderedTodo] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, reorderedTodo);

    setTodos(updatedTodos);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundColor: index % 2 === 0 ? "blue" : "red",
                        padding: "20px",
                        marginBottom: "10px",
                        height: "20px",
                        listStyleType: "none",
                      }}
                    >
                      {todo.todo}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todo;
