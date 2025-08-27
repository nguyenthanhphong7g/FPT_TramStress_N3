import React, { useState } from 'react'
import { useAuth } from "../../../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getThumbnailVideo } from '../../../../services/activity/getThumbnailVideo'

const Item = ({ item, itemIdx }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const { user } = useAuth();

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
            
            className={`${item.slug} ${item.slug === 'quote'
                && activeIndex === itemIdx ? 'show' : ''}`
            }
            onClick={() => {
                console.log(itemIdx)
                if (itemIdx !== 0 && !user) {
                    toast.error("Bạn cần đăng nhập để tiếp tục!!!");
                    return;
                }
                if (item.slug === "quote") {
                    handleClick(itemIdx, item.slug);
                } else if (item.url) {
                    console.log("item.url:", item.url);
                    window.open(item.url, "_blank");
                }
            }}
            style={{ cursor: item.url || item.slug === "quote" ? "pointer" : "default" }}
        >
            <img
                src={item.url ? getThumbnailVideo(item.url) : item.img}
                alt={item.type}
            />
            <div className='content-relax'>
                <p>{item.text}</p>
                {item.author && <h4>{item.author}</h4>}
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default Item
