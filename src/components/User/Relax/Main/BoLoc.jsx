import React from 'react';
import './BoLoc.css';

const BoLoc = ({ onButtonClick, isActive }) => {
    const items = ['Tất cả', 'Phổ biến', 'Bài tập', 'Giai điệu', 'Lời hay'];

    return (
        <div className='BoLoc'>
            <ul>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={index === isActive ? 'active' : ''}
                        onClick={() => onButtonClick(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoLoc;
