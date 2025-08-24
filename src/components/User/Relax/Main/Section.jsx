import React, { useState } from 'react'
import GocThuGian from './GocThuGian'

const Section = ({slug}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (itemIdx, itemType) => {
        if (itemType !== 'loihay') return;

        if (activeIndex === itemIdx) {
            setActiveIndex(null);
        } else {
            setActiveIndex(itemIdx);
        }
    };
    const popularSection = GocThuGian.find(section => section.slug === slug);
    return (
        <div className='relax-popular'>
            <div className='noidung-bottom'>
                {popularSection.items.slice(0, 4).map((item, itemIdx) => (
                    <div
                        key={itemIdx}
                        className={`${item.type} ${item.type === 'loihay' &&
                            activeIndex === itemIdx
                            ? 'show'
                            : ''
                            }`}
                        onClick={() => {
                            if (item.type === "loihay") {
                                handleClick(itemIdx, item.type);
                            } else if (item.url) {
                                window.open(item.url, "_blank");
                            }
                        }}
                        style={{ cursor: item.url || item.type === "loihay" ? "pointer" : "default" }}
                    >
                        <img src={item.img} alt={item.type} />
                        <div className='content-relax'>
                            <p>{item.text}</p>
                            {item.author && <h4>{item.author}</h4>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Section
