import React, { useState } from 'react'
import './NoiDungThuGian.css'
import icon_search from '../../../../assets/images/Relax/icon_search.png'
import GocThuGian from './GocThuGian'
import { Link } from 'react-router-dom';

const NoiDung = ({ refs }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const handleClick = (sectionIdx, itemIdx, itemType) => {
    if (itemType !== 'loihay') return;

    if (activeIndex === itemIdx && activeSection === sectionIdx) {
      setActiveIndex(null);
      setActiveSection(null);
    } else {
      setActiveIndex(itemIdx);
      setActiveSection(sectionIdx);
    }
  };

  return (
    <div className='all'>
      {GocThuGian.map((section, sectionIdx) => (
        <div key={sectionIdx} ref={refs[sectionIdx + 1]} className='noidung'>
          <div className='noidung-top'>
            <h4>{section.title}</h4>
            <Link
              to={`/userlayout/relax/${section.slug}`}
              state={{ title: section.title }}
              className='noidung-top-right'
            >
              <h5>Xem tất cả</h5>
              <img src={icon_search} alt="" />
            </Link>
          </div>

          <div className='noidung-bottom'>
            {section.items.slice(0, 4).map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={`${item.type} ${item.type === 'loihay' &&
                  activeIndex === itemIdx &&
                  activeSection === sectionIdx
                  ? 'show'
                  : ''
                  }`}
                onClick={() => {
                  if (item.type === "loihay") {
                    handleClick(sectionIdx, itemIdx, item.type);
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
      ))}
    </div>
  );
};

export default NoiDung;

