import React, { useState, useEffect } from 'react';
import './Todo.css';

function Item({ task, index, completeItem, deleteItem }) {
    return (
        <div style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
            {task.item_name}
            <button style={{ background: "red" }} onClick={() => deleteItem(index)}>x</button>
            <button onClick={() => completeItem(index)}>Complete / Reset Task</button>
        </div>
    );
}

function AddItem({ addItem }) {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!text) return;
        addItem(text);
        setText("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <center><input
                type="text"
                className="input"
                value={text}
                placeholder="Enter task"
                onChange={e => setText(e.target.value)}/>
            <button id="button" type="submit">Add Task</button></center>
        </form>
    );
}

function Todo() {
    const [itemsRemaining, setItemsRemaining] = useState(0);
    const [items,setItems] = useState([]);

    useEffect(() => { setItemsRemaining(items.filter(task => !task.isCompleted).length) });

    const addItem = item_name => {
        const newItems = [...items, { item_name, isCompleted: false }];
        setItems(newItems);
    };

    const completeItem = index => {
        const newItems = [...items];
        newItems[index].isCompleted =!newItems[index].isCompleted;
        setItems(newItems);
    };

    const deleteItem = index => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const resetList = () =>{
        setItems([]);
    };

    return (
        <><div><h1><center>TodoList</center></h1></div><div className="todo-container">
            <div className="header">Remanining number of tasks ({itemsRemaining})</div>
            <div className="task">
                <AddItem addItem={addItem} />
            </div>
            <center><div>
                {items.map((items, index) => (
                    <Item
                        task={items}
                        index={index}
                        completeItem={completeItem}
                        deleteItem={deleteItem}/>
                ))}
                <button onClick={() => resetList()}>Reset List</button>
            </div></center>
        </div></>
    );
}

export default Todo;