import React, { useState, useEffect } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");	
    const [tasks, setTasks] = useState([]);

    const createUser = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow",
        };
        
        fetch("https://playground.4geeks.com/todo/users/Lc_Px", requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    };

    const getToDoList = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        
        fetch("https://playground.4geeks.com/todo/users/Lc_Px", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTasks(data.todos || []);
            })
            .catch((error) => console.error(error));
    };

    const createTasks = (taskLabel) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ label: taskLabel, is_done: false });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://playground.4geeks.com/todo/todos/Lc_Px", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                getToDoList();
            })
            .catch((error) => console.error(error));
    };

    const deleteTask = (taskId) => {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow",
        };
        
        fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setTasks(tasks.filter((task) => task.id !== taskId));
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getToDoList();
    }, []);

    return (
        <div className="container">
            <h1 className="title">todos</h1>
            <ul>
                <li>
                    <input
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyUp={(e) => {
                            if (e.key === "Enter" && inputValue.trim() !== "") {
                                createTasks(inputValue);
                                setInputValue("");
                            }
                        }}
                    />
                </li>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.label} 
                        <svg
                            onClick={() => deleteTask(task.id)} 
                            className="icon" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 384 512"
                        >
                            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                        </svg>
                    </li>
                ))}
            </ul>
            <div className="task-counter">{tasks.length} tasks</div>
        </div>
    );
};

export default Home;

