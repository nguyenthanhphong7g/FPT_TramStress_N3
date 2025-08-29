import React, { useState, useEffect } from 'react';
import './NoiDungThuGian.css';
import { Link } from 'react-router-dom';
import SectionBlock from './SectionBlock';
import { getData } from '../../../../services/apiService';

const NoiDung = ({ refs, searchTerm }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchRelaxContent = async () => {
      try {
        const json = await getData('relax_content');
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
  const filterBySearchTerm = (data) => {
    if (!searchTerm.trim()) return data;
    return data.filter(item =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  return (
    <div className='relax-content'>
      <SectionBlock
        title="Phổ biến"
        slug="popular"
        data={filterBySearchTerm(data)}
        refProp={refs[1]}
      />
      <SectionBlock
        title="Bài tập"
        slug="exercise"
        data={filterBySearchTerm(filterBySlug('exercise'))}
        refProp={refs[2]}
      />
      <SectionBlock
        title="Giai điệu"
        slug="music"
        data={filterBySearchTerm(filterBySlug('music'))}
        refProp={refs[3]}
      />
      <SectionBlock
        title="Lời hay"
        slug="quote"
        data={filterBySearchTerm(filterBySlug('quote'))}
        refProp={refs[4]}
      />
    </div>
  );
};
export default NoiDung;
