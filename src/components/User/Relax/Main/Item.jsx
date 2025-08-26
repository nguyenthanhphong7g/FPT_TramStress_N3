import React, { useState } from 'react'

const Item = ({ item, itemIdx }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (itemIdx, itemType) => {
        if (itemType !== 'quote') return;

        if (activeIndex === itemIdx) {
            setActiveIndex(null);
        } else {
            setActiveIndex(itemIdx);
        }
    };
    return (
        <div
            key={itemIdx}
            className={`${item.slug} ${item.slug === 'quote'
                && activeIndex === itemIdx ? 'show' : ''}`
            }
            onClick={() => {
                if (item.slug === "quote") {
                    handleClick(itemIdx, item.slug);
                } else if (item.url) {
                    window.open(item.url, "_blank");
                }
            }}
            style={{ cursor: item.url || item.slug === "quote" ? "pointer" : "default" }}
        >
            <img src={item.img} alt={item.type} />
            <div className='content-relax'>
                <p>{item.text}</p>
                {item.author && <h4>{item.author}</h4>}
            </div>
        </div>
    )
}

export default Item
