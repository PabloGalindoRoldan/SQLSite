import React from "react";

export default function TaskList({ tasks, currentTask, onSelectTask }) {
  return (
    <div className="border rounded-md p-3 bg-white shadow-sm">
      <h2 className="font-bold mb-2">Exercises</h2>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li
            key={i}
            onClick={() => onSelectTask(task)}
            className={`cursor-pointer p-2 rounded ${
              currentTask === task ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}