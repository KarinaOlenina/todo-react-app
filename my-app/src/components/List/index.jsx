import React from "react";
import axios from "axios";
import classNames from 'classnames';

import './List.scss'
import '../AddButtunList'
import Badge from "../Badge";
import removeSvg from '../../assets/icons/remove.svg'

const List = ({items, isRemovable, onClick, onRemove, activeItem}) => {

    const isRemoveList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });/* => отправляем запрос на удаление нужного списка по id и вызываем onRemove() */
        }
    }


    return (
        <ul
            className='list'>
            {
                items.map((item, index) =>
                    <li
                        key={index}
                        className={classNames(item.className, {
                            active: item.active ? item.active : activeItem && activeItem.id === item.id /* => сравнивает id выбраного элемента и добавляет статус active*/
                        })}

                        onClick={() => onClick ? onClick(item) : null} /*=> Если f есть - вызови анонимную f */
                    >{/* classname не воспринимает булевые значения!*/}
                        <i>
                            {item.icon ? item.icon :
                                <Badge color={item.color.name}/>}
                        </i>
                        <span>{item.name} {item['tasks'] && `(${item['tasks'].length})`}</span>
                        {isRemovable &&
                            <img
                                className='list__remove-icon'
                                onClick={() => isRemoveList(item)}
                                src={removeSvg}
                                alt='Кнопка удалить задачу'/>
                        }
                        {/* Вставляем иконку если isRemovable, используя && */}
                    </li>
                )
            }
        </ul>
    )
}

export default List;