import React, { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");	
  const [tasks, setTasks] = useState([]);

  return (
    <div ClassName="container">
      <h1 ClassName="title">todos</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyUp={(e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                setTasks([...tasks, inputValue]);
                setInputValue("");
              }
            }}
          />
        </li>
        {tasks.map((task, index) => (
			<li key={index}>
				{task} 
        <svg onClick={() => setTasks(tasks.filter((tasks, currentIndex) => index != currentIndex))} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
			</li>
        ))}
      
      </ul>
      <div className="task-counter">{tasks.length} tasks</div>
    </div>
  );
};

export default Home;

