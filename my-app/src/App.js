import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";


import {AddListButton, List, Tasks} from './components';

import axios from "axios";
import Background from "./components/BuckgroundButton/Backgraund";


function App() {

    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [activeTask, setActiveTask] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        axios
            .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
            .then(({data}) => {
                setLists(data);
            });
        axios.get('http://localhost:3001/colors').then(({data}) => {
            setColors(data);
        });
    }, []);
    /* Хук, как только компонент отрэндэрился, вызови 1 раз то что в теле,
    в массив передаем то за чьим изменением мы будем следить (при изменении
    этого элемента - тело будет снова вызываться) */

    const onAddList = (obj) => {
        const newList = [...lists, obj];
        setLists(newList);
    }; /*Получили новый обьект из AddListButton*/

    const onAddTask = (listId, taskObj) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = [...list.tasks, taskObj] /*=> Берем старый tasks и добавляем новый*/
            }
            return list;
        })
        setLists(newList);
    };

    const onEditTask = (listId, taskObj) => {
        const newTaskText = window.prompt('Текст задачи', taskObj.text);

        if (!newTaskText) {
            return;
        }

        const newTask = {
            "ListId": listId,
            "text": newTaskText,
            "completed": taskObj.completed,
            "id": taskObj.id,
        }

        axios
            .patch('http://localhost:3001/tasks/' + taskObj.id, {
                text: newTaskText
            })
            .then(() => {
                const newList = lists.map(list => {
                    if (list.id === listId) {
                        list.tasks = list.tasks.map(task => {
                            if (task.id === taskObj.id) return newTask;
                            else return task;
                        });
                    }
                    return list;
                });
                setLists(newList);
            })
            .catch(() => {
                alert('Не удалось обновить задачу');
            });
    };

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Вы действительно хотите удалить задачу?')) {
            const newList = lists.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId)
                }
                return item;
            });
            setLists(newList);
            axios
                .delete('http://localhost:3001/tasks/' + taskId)
                .catch(() => alert('Не удалось удалить задачу'))
        }
    };

    const onEditListTitle = (id, title) => {
        const newList = lists.map(list => {
            if (list.id === id) {
                list.name = title;    /* => сравнивает id и если совпадение - меняет name*/
            }
            return list;
        });
        setLists(newList);
    };

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
        axios
            .patch('http://localhost:3001/tasks/' + taskId, {
                completed
            })
            .catch(() => {
                alert('Не удалось обновить задачу');
            });
    }

    const onClickItem = (list) => {
        navigate(`/lists/${list.id}`);
    };

    const onClickAllItems = () => {
        navigate(`/`);
    };

    useEffect(() => {
        const listId = location.pathname.split('lists/')[1];
        if (lists) {
            const list = lists.find(list => list.id === Number(listId));
            setActiveItem(list);
        }
    }, [lists, location.pathname])

    return (
        <div className='todo'>
            <div className='todo__sidebar'>
                <Background/>
                <List
                    onClick={onClickAllItems}
                    items={[
                        {
                            active: location.pathname === '/',
                            icon: <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                                    fill="black"/>
                            </svg>,
                            name: 'Все задачи',
                        },
                    ]}
                />
                <AddListButton onAdd={onAddList} colors={colors}/>
                {lists ? (
                    <List
                        items={lists}
                        onRemove={id => {
                            const newLists = lists.filter(item => item.id !== id);/* => выводим массив со списком без id удаляемого списка*/
                            setLists(newLists); /*=> и записываем его в состояние*/
                        }}
                        onClick={onClickItem}
                        activeItem={activeItem} /*=> передаем активный элемент списка */
                        isRemovable
                    />
                ) : (
                    'Загрузка...'
                )}
                {/*=> Добавили загрузку */}
            </div>
            <div className='todo__tasks'>
                <Routes>
                    <Route path='/' element={
                        lists && lists.map((list) => (
                            <Tasks key={list.id}
                                   list={list}
                                   onAddTask={onAddTask}
                                   onRemoveTask={onRemoveTask}
                                   onEditTask={onEditTask}
                                   onEditTitle={onEditListTitle}
                                   onCompleteTask={onCompleteTask}
                                   withoutEmpty
                            />
                        ))
                    }/>
                    <Route path='/lists/:id' element={lists && activeItem &&
                        <Tasks
                            list={activeItem}
                            onAddTask={onAddTask}
                            onRemoveTask={onRemoveTask}
                            onEditTask={onEditTask}
                            onEditTitle={onEditListTitle}
                            onCompleteTask={onCompleteTask}
                            activeTask={activeTask}/>
                    }/>
                </Routes>
            </div>
        </div>
    )
}

export default App;




