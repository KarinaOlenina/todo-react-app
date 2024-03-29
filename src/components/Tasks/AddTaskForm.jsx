import React, {useState} from "react";
import axios from "axios";

import './Tasks.scss';
import addSvg from '../../assets/icons/add.svg';


const AddTaskForm = ({list, onAddTask}) => {

    const [formVisible, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [placeHolder, setPlaceHolder] = useState('Текст задачи');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setFormVisible(!formVisible);
        setInputValue('');
        setPlaceHolder('Task text');
    }

    const addTask = () => {
        if (!inputValue) {
            setPlaceHolder('Enter the task text');
            return;
        }

        setIsLoading(true);

        const newTask = {
            "listId": list.id,
            "text": inputValue,
            "completed": false,
        }

        axios
            .post('http://localhost:3001/tasks', newTask)
            .then(({data}) => {
                onAddTask(list.id, data);
                console.log(data)
                toggleFormVisible();
            })
            .catch(() => alert('Error when adding a task'))
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="tasks__form">
            {!formVisible
                ? (<div
                    onClick={toggleFormVisible}
                    className="tasks__form-new">
                    <img src={addSvg} alt='Add task button'/>
                    <span>Add a task</span>
                </div>)
                : (<div className="tasks__form-add">
                    <input
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addTask()
                            }
                        }}
                        className='field'
                        type='text'
                        placeholder={placeHolder}
                        onChange={e => setInputValue(e.target.value)}/>
                    <button
                        disabled={isLoading}
                        onClick={addTask}
                        className='button'>
                        {isLoading ? 'Addition...' : ' Add a task'}
                    </button>
                    <button
                        onClick={toggleFormVisible}
                        className='button button-grey'>
                        Cancellation
                    </button>
                </div>)}
        </div>
    )
}

export default AddTaskForm;