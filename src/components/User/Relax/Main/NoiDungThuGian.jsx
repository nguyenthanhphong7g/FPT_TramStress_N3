import React, { useState, useEffect } from 'react';
import './NoiDungThuGian.css';
import { Link } from 'react-router-dom';
import SectionBlock from './SectionBlock';
import { getRelaxContent } from '../../../../services/activity/getRelaxContent';

const NoiDung = ({ refs }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelaxContent = async () => {
      try {
        const json = await getRelaxContent();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRelaxContent();
  }, []);
  const filterBySlug = (slug) => data.filter(item => item.slug === slug);
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  return (
    <div className='relax-content'>
      <SectionBlock
        title="Phổ biến"
        slug="popular"
        data={data}
        refProp={refs[1]}
      />
      <SectionBlock
        title="Bài tập"
        slug="exercise"
        data={filterBySlug('exercise')}
        refProp={refs[2]}
      />
      <SectionBlock
        title="Giai điệu"
        slug="music"
        data={filterBySlug('music')}
        refProp={refs[3]}
      />
      <SectionBlock
        title="Lời hay"
        slug="quote"
        data={filterBySlug('quote')}
        refProp={refs[4]}
      />
    </div>
  );
};
export default NoiDung;
