import React, {useState} from "react";

import './Background.scss'
import closeSvg from "../../assets/icons/close.svg";
import background1 from "../../assets/background/back-min/back1_min.jpg";
import background2 from "../../assets/background/back-min/back2_min.jpg";
import background3 from "../../assets/background/back-min/back3_min.jpg";
import background4 from "../../assets/background/back-min/back4_min.jpg";
import background5 from "../../assets/background/back-min/back5_min.jpg";
import background6 from "../../assets/background/back-min/back6_min.jpg";
import background7 from "../../assets/background/back-min/back7_min.jpg";
import background8 from "../../assets/background/back-min/back8_min.jpg";

const Background = () => {
    const [state, setState] = useState(false);

    const onClose = () => {
        setState(false);
    }

    const onClick = (e) => {
        document.querySelector('.change-background').className=`change-background b${e}`;
        setTimeout(() => {document.body.className=`b${e}`}, 500)
    }

    return (
        <div className={'change-background'}
             onClick={() => setState(!state)}>
            {state && (
                <div className='add-list__popup'>
                    <img onClick={onClose}
                         src={closeSvg}
                         alt='Кнопка закрытия окна'
                         className="add-list__popup-close-btn"/>
                    <div className='add-list__popup-img'>
                        <img onClick={ () => {{onClick(1)}}}
                             className={'background__img'} src={background1} alt="back"/>
                        <img onClick={ () => {{onClick(2)}}}
                             className={'background__img'} src={background2} alt="back"/>
                        <img onClick={ () => {{onClick(3)}}}
                             className={'background__img'} src={background3} alt="back"/>
                        <img onClick={ () => {{onClick(4)}}}
                             className={'background__img'} src={background4} alt="back"/>
                        <img onClick={ () => {{onClick(5)}}}
                             className={'background__img'} src={background5} alt="back"/>
                        <img onClick={ () => {{onClick(6)}}}
                             className={'background__img'} src={background6} alt="back"/>
                        <img onClick={ () => {{onClick(7)}}}
                             className={'background__img'} src={background7} alt="back"/>
                        <img onClick={ () => {{onClick(8)}}}
                             className={'background__img'} src={background8} alt="back"/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Background;