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
    </div>
  );
};

export default NoiDung;