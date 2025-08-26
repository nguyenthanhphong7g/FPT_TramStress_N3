import React, { useState } from 'react'
import './NoiDungThuGian.css'
import { Link } from 'react-router-dom';
import dataExercise from '../../../../data/contentRelax/dataExercise'
import dataMusic from '../../../../data/contentRelax/dataMusic'
import dataQuote from '../../../../data/contentRelax/dataQuote'
import popularContent from '../../../../data/contentRelax/popularContent'
import SectionBlock from './SectionBlock';

const NoiDung = ({ refs }) => {
  return (
<<<<<<< HEAD
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
=======
    <div className='relax-content'>
      <SectionBlock
        title="Phổ biến"
        slug="popular"
        data={popularContent}
        refProp={refs[1]}
      />
      <SectionBlock
        title="Bài tập"
        slug="exercise"
        data={dataExercise}
        refProp={refs[2]}
      />
      <SectionBlock
        title="Giai điệu"
        slug="music"
        data={dataMusic}
        refProp={refs[3]}
      />
      <SectionBlock 
        title="Lời hay"
        slug="quote"
        data={dataQuote}
        refProp={refs[4]}
      />
>>>>>>> 9a35a2bb3174dec17a591e814ab8dc240c917cb3
    </div>
  );
};

export default NoiDung;

