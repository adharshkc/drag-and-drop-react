import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Drag = () => {
  const [boxes, setBoxes] = useState([
    {
      id: "1",
      bg: "red",
    },
    {
      id: "2",
      bg: "blue",
    },
  ]);
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await axios.get("https://dummyjson.com/todos");
    console.log(response.data.todos);
    setTodos(response.data.todos);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <div>
      <h1>Drag</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="boxes">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
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
                    >
                      <div
                        style={{
                          height: "100px",
                          width: "200px",
                          marginBottom: "5px",
                          //   backgroundColor: bg,
                        }}
                      >
                        {todo.todo}
                      </div>
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

export default Drag;
