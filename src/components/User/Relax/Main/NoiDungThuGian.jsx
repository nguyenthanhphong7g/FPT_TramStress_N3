import React, { useState } from 'react'
import './NoiDungThuGian.css'
import icon_search from '../../../../assets/images/Relax/icon_search.png'
import GocThuGian from './GocThuGian'

const NoiDung = ({ refs }) => {
  const [activeIndex, setActiveIndex] = useState(null); // ảnh "Lời hay" đang mở
  const [activeSection, setActiveSection] = useState(null); // phần nào đang mở

  const handleClick = (sectionIdx, itemIdx, itemType) => {
    if (itemType !== 'loihay') return;

    if (activeIndex === itemIdx && activeSection === sectionIdx) {
      setActiveIndex(null); // click lại để đóng
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
            <div className='noidung-top-right'>
              <h5>Xem tất cả</h5>
              <img src={icon_search} alt="" />
            </div>
          </div>

          <div className='noidung-bottom'>
            {section.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className={`${item.type} ${
                  item.type === 'loihay' &&
                  activeIndex === itemIdx &&
                  activeSection === sectionIdx
                    ? 'show'
                    : ''
                }`}
                onClick={() => handleClick(sectionIdx, itemIdx, item.type)}
              >
                <img src={item.img} alt="" />
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

