import React from "react";
import axios from "axios";
import classNames from 'classnames';

import './List.scss'
import '../AddButtunList'
import Badge from "../Badge";
import removeSvg from '../../assets/icons/remove.svg'

const List = ({items, isRemovable, onClick, onRemove, activeItem}) => {

    const isRemoveList = (item) => {
        if (window.confirm('Do you really want to delete the list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
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
                            active: item.active ? item.active : activeItem && activeItem.id === item.id
                        })}

                        onClick={() => onClick ? onClick(item) : null}
                    >
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
                                alt='Delete task button'/>
                        }
                    </li>
                )
            }
        </ul>
    )
}

export default List;