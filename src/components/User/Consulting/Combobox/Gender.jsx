import React, { useState } from 'react'
import './Combobox.css'
import triangle_down from '../../../../assets/images/Consulting/triangle-down.png'

const Gender = () => {
    const [open, setOpen] = useState(false); // mở/đóng dropdown
    const [selected, setSelected] = useState(""); // giá trị được chọn

    const toggleDropdown = () => setOpen(!open);
    const selectOption = (opt) => {
        setSelected(opt);
        setOpen(false); // đóng dropdown khi chọn
    };

    const options = ["", "Nam", "Nữ"];
    return (
        <div className={`dropdown ${open ? 'open' : ''}`}>
            <div className="selected" onClick={toggleDropdown}>
                {selected || "Giới tính"}
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
                            {opt || "Giới tính"}
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}

export default Gender
