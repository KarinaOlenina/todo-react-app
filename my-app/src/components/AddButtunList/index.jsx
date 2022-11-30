import React, {useEffect, useState} from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/icons/close.svg'
import './AddButtonList.scss'


const AddListButton = ({colors, onAdd}) => {
    const [state, setState] = useState(false);
    const [stateSelectColor, setStateSelectColor] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [placeHolder, setPlaceHolder] = useState('Название списка');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setStateSelectColor(colors[0].id);
        }
    }, [colors]); /* => Берем первый id первого элимента*/

    const addTask = () => {
        if (!inputValue) {
            setPlaceHolder('Введите название списка');
            return;
        }

        setIsLoading(true); /* => Идет загрузка*/

        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: stateSelectColor
            })
            .then(({data}) => {
                const color = colors.find(color => color.id === stateSelectColor); /* => нашли цвет по id*/
                const listObj = {...data, color: {name: color.name, hex: color.hex}, tasks: []}; /* => передали tasks как пустой оьект, и наш цвет как новый обьект со свойством name*/
                onAdd(listObj); /* => Добавили новый обьект*/
                onClose(); /* => Закрыли окошко*/
            })
            .catch(() => alert('Ошибка при добавлении списка'))
            .finally(() => {
                setIsLoading(false); /* => В любом случае, положительный ответ или нет, теперь false (снова можно 'добавить')*/
            });
    }

    const onClose = () => {
        setInputValue('');
        setState(false);
        setStateSelectColor(colors[0].id);
        setPlaceHolder('Название списка');
    }

    return (
        <div className='add-list'>
            <List onClick={() => setState(!state)}
                  items={[{
                      className: 'list__add-button',
                      icon: <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                      </svg>,
                      name: 'Добавить список',
                  }]}
            />
            {state && (
                <div className='add-list__popup'>
                    <img onClick={onClose}
                         src={closeSvg}
                         alt='Кнопка закрытия окна'
                         className="add-list__popup-close-btn"/>
                    <input
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addTask()
                            }
                        }}
                        onChange={e => setInputValue(e.target.value)}
                        className='field'
                        type='text'
                        placeholder={placeHolder}/>
                    <div className='add-list__popup-colors'>
                        {
                            colors.map(color =>
                                <Badge onClick={() => setStateSelectColor(color.id)}
                                       key={color.id}
                                       color={color.name}
                                       className={stateSelectColor === color.id && 'active'}
                                />)
                        }
                    </div>
                    <button
                        disabled={isLoading}
                        onClick={addTask}
                        className='button'>
                        {isLoading ? 'Добавление...' : ' Добавить'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddListButton;