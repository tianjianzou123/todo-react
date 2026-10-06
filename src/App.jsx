import { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import usePersistedState from "./hooks/usePersistedState";

const initialTasks = [
  {
    id: 0,
    name: "Eat",
    completed: true,
  },
  {
    id: 1,
    name: "Sleep",
    completed: false,
  },
  {
    id: 2,
    name: "Repeat",
    completed: false,
  },
];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {
  const [tasks, setTasks] = usePersistedState(
    "todo-tasks",
    initialTasks
  );

  const [filter, setFilter] = useState("All");

  function addTask(name) {
    const newTask = {
      id: Date.now(),
      name: name,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      })
    );
  }

  function deleteTask(id) {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  }

  function editTask(id, newName) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            name: newName,
          };
        }

        return task;
      })
    );
  }

  const tasksRemaining = tasks.filter(
    (task) => !task.completed
  ).length;

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list-heading">
        {tasksRemaining}{" "}
        {tasksRemaining === 1 ? "task" : "tasks"} remaining
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
