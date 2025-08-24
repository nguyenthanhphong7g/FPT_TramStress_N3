import React, { useState } from 'react'
import './Combobox.css'
import triangle_down from '../../../../assets/images/Consulting/triangle-down.png'
import star from '../../../../assets/images/Consulting/star.png'

const Stars = () => {
    const [open, setOpen] = useState(false); // mở/đóng dropdown
    const [selected, setSelected] = useState(""); // giá trị được chọn

    const toggleDropdown = () => setOpen(!open);
    const selectOption = (opt) => {
        setSelected(opt);
        setOpen(false); // đóng dropdown khi chọn
    };

    const options = [
        { label: "Đánh giá", img: null },
        { label: "1~2", img: star },
        { label: "2~3", img: star },
        { label: "3~4", img: star },
        { label: "4~5", img: star }
    ];

    return (
        <div className={`dropdown ${open ? 'open' : ''}`}>
            <div className="selected" onClick={toggleDropdown}>
                {selected ? (
                    <>
                        <span>{selected.label}</span>
                        {selected.img && (
                            <img src={selected.img} alt="star" className="option-icon" />
                        )}
                    </>
                ) : (
                    "Đánh giá"
                )}
                <span className="triangle-icon">
                    <img src={triangle_down} alt="" />
                </span>
            </div>
            {open && (
                <div className="options">
                    {options.map((opt, idx) => (
                        <div
                            key={idx}
                            className="option"
                            onClick={() => selectOption(opt)}
                        >
                            <span>{opt.label}</span>
                            {opt.img && (
                                <img src={opt.img} alt="star" className="option-icon" />
                            )}

                        </div>

                    ))}
                </div>
            )}
        </div>

    );
}

export default Stars
