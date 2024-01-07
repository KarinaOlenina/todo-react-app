import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import AddTaskForm from '../Tasks/AddTaskForm'
import './Tasks.scss';
import penSvg from '../../assets/icons/edit.svg';
import Task from "./Task";


const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onEditTask, activeTask, onCompleteTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Name of the list', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle,
                })
                .catch(() => alert('Failed to update the name of the list'))
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{color: list.color.hex}} className='tasks__title'>
                    {list.name}
                    <img id='penSvg' onClick={editTitle}
                         src={penSvg} alt='The button will fix'/>
                </h2>
            </Link>

            <div className="tasks__items">
                {list['tasks'] && !list['tasks'].length && !withoutEmpty &&
                    <h2>There are no active tasks</h2>}
                {list['tasks'] && list['tasks'].map(task =>
                    <Task
                        key={task.id}
                        onRemove={onRemoveTask}
                        onEdit={onEditTask}
                        activeTask={activeTask}
                        onComplete={onCompleteTask}
                        {...task}
                        list={list}
                    />)
                }
            </div>
            <AddTaskForm
                key={list.id}
                list={list}
                onAddTask={onAddTask}/>
        </div>
    )
}

export default Tasks;