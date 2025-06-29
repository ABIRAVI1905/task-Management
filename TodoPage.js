import React, { useState, useEffect } from 'react';
import './App.css';
import backgroundImage from './assets/background.jpg';

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = input;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, done: false }]);
    }

    setInput('');
  };

  const handleToggle = (i) => {
    const updated = [...tasks];
    updated[i] = { ...updated[i], done: !updated[i].done };
    setTasks(updated);

    if (updated[i].done) {
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  };

  const handleEdit = (i) => {
    setInput(tasks[i].text);
    setEditIndex(i);
  };

  const handleDelete = (i) => {
    const updated = tasks.filter((_, idx) => idx !== i);
    setTasks(updated);
    setInput('');
    setEditIndex(null);
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const pendingCount = tasks.filter((t) => !t.done).length;
  const totalTasks = tasks.length;

  return (
    <div
      className="todo-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      

      <div className="sidebar">
        <h2>Task Summary</h2>
        <p>Total: {totalTasks}</p>
        <p>Completed: {completedCount}</p>
        <p>Pending: {pendingCount}</p>
      </div>

      <div className="main">
        <h1>TaskSphere</h1>
        <div className="input-row">
          <input
            type="text"
            placeholder="Enter your task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleAddOrUpdate}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <div className="task-list">
          {tasks.map((task, i) => (
            <div key={i} className={`task-item ${task.done ? 'done' : ''}`}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggle(i)}
                />
                <span className={task.done ? 'task-done' : ''}>
                  {task.text}
                </span>
              </label>
              <div className="actions">
                <button onClick={() => handleEdit(i)}>✎</button>
                <button onClick={() => handleDelete(i)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
