import React from "react";

import './Tasks.scss';
import editSvg from '../../assets/icons/edit.svg';
import removeSvg from '../../assets/icons/remove.svg';
import taskCheckedSvg from '../../assets/icons/task-check.svg'


const Task = ({id, text, list, completed, onRemove, onEdit, activeTask, onComplete}) => {

    const onChangeCheckBox = e => {
        onComplete(list.id, id, e.target.checked)
    }

    return (
        <div key={id} className="tasks__items-row">
            <div className="checkbox">
                <input onChange={onChangeCheckBox} id={`task-${id}`} type="checkbox"
                       checked={completed}/>
                <label htmlFor={`task-${id}`}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#999"
                              strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </label>
            </div>
            <p>{text}</p>

            <div className="tasks__items-row-actions">
                <div
                    className={`${activeTask ? 'active-div' : ''}`}
                    onClick={() => onEdit(list.id, {id, text})}>
                    <img
                        src={`${activeTask ? taskCheckedSvg : editSvg}`}
                        alt="Edit button"/>
                </div>
                <div
                    onClick={() => onRemove(list.id, id)}>
                    <img src={removeSvg}
                         alt="Delete button"/>
                </div>
            </div>
        </div>
    )
}

export default Task;