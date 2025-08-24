import React, { useState } from 'react'
import './NoiDungThuGian.css'
import icon_search from '../../../../assets/images/Relax/icon_search.png'
import GocThuGian from './GocThuGian'
import { Link } from 'react-router-dom';
import Section from './Section';

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
          <Section slug={section.slug} />
        </div>
      ))}
    </div>
  );
};

export default NoiDung;

