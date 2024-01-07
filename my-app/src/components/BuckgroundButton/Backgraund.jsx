import React, { useState, useEffect } from "react";
import './Background.scss';
import closeSvg from "../../assets/icons/close.svg";

const backgrounds = Array.from({ length: 8 }, (_, index) => require(`../../assets/background/back-min/back${index + 1}_min.jpg`));

const Background = () => {
    const [state, setState] = useState(false);
    const [selectedBackground, setSelectedBackground] = useState(getSavedBackground() || 1);

    useEffect(() => {
        document.querySelector('.change-background').className = `change-background b${selectedBackground}`;
        document.body.className = `b${selectedBackground}`;
    }, [selectedBackground]);

    function getSavedBackground() {
        return parseInt(localStorage.getItem("selectedBackground"));
    }

    function saveBackgroundToLocalStorage(index) {
        localStorage.setItem("selectedBackground", index);
    }

    const onClose = () => {
        setState(false);
    }

    const onClick = (index) => {
        saveBackgroundToLocalStorage(index);
        setSelectedBackground(index);
        setState(false);
    }

    return (
        <div className={'change-background'} onClick={() => setState(!state)}>
            {state && (
                <div className='add-list__popup'>
                    <img onClick={onClose} src={closeSvg} alt='Close window button' className="add-list__popup-close-btn" />
                    <div className='add-list__popup-img'>
                        {backgrounds.map((background, index) => (
                            <img
                                key={index}
                                onClick={() => onClick(index + 1)}
                                className={`background__img ${selectedBackground === index + 1 ? 'selected' : ''}`}
                                src={background}
                                alt={`back${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Background;
