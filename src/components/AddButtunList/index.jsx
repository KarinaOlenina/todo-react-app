import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "../List";
import Badge from "../Badge";
import closeSvg from '../../assets/icons/close.svg'
import './AddButtonList.scss'

const AddListButton = ({ colors, onAdd }) => {
    const [state, setState] = useState(false);
    const [stateSelectColor, setStateSelectColor] = useState(colors && colors.length > 0 ? colors[0].id : null);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors) && colors.length > 0) {
            setStateSelectColor(colors[0].id);
        }
    }, [colors]);

    const addTask = () => {
        if (!inputValue) {
            setInputValue('');
            return;
        }

        setIsLoading(true);

        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: stateSelectColor
            })
            .then(({ data }) => {
                const color = colors.find(c => c.id === stateSelectColor);
                const listObj = { ...data, color: { name: color.name, hex: color.hex }, tasks: [] };
                onAdd(listObj);
                onClose();
            })
            .catch(() => alert('Error adding list'))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const onClose = () => {
        setInputValue('');
        setState(false);
        setStateSelectColor(colors && colors.length > 0 ? colors[0].id : null);
    }

    return (
        <div className='add-list'>
            <List
                onClick={() => setState(!state)}
                items={[{
                    className: 'list__add-button',
                    icon: (
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ),
                    name: 'Add list',
                }]}
            />
            {state && (
                <div className='add-list__popup'>
                    <img onClick={onClose} src={closeSvg} alt='Close window button' className="add-list__popup-close-btn" />
                    <InputField
                        value={inputValue}
                        onChange={setInputValue}
                        onKeyDown={(e) => { if (e.key === 'Enter') addTask() }}
                        placeholder='Name of the list'
                    />
                    <div className='add-list__popup-colors'>
                        {colors && colors.map(color => (
                            <Badge
                                key={color.id}
                                color={color.name}
                                onClick={() => setStateSelectColor(color.id)}
                                className={stateSelectColor === color.id && 'active'}
                            />
                        ))}
                    </div>
                    <button
                        disabled={isLoading}
                        onClick={addTask}
                        className='button'
                    >
                        {isLoading ? 'Addition...' : ' Add'}
                    </button>
                </div>
            )}
        </div>
    );
}

const InputField = ({ value, onChange, onKeyDown, placeholder }) => (
    <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className='field'
        type='text'
        placeholder={placeholder}
    />
);

export default AddListButton;
