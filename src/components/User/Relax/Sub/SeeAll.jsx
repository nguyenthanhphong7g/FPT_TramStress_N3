import React, { useState, useEffect } from 'react';
import '../Main/NoiDungThuGian.css';
import './SeeAll.css';
import return_relax from '../../../../assets/images/Relax/return_relax.png';
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../../Common/Pagination/Pagination';
import Item from '../Main/Item';
import { getData } from '../../../../services/apiService';

const XemTatCa = ({ searchTerm }) => {
  const { slug } = useParams();

  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allContent = await getData('relax_content');
        const filtered = slug === "popular"
          ? allContent
          : allContent.filter(item => item.slug === slug);
        setData(filtered);
        setCurrentPage(1); // Reset về page 1 khi slug thay đổi
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        setData([]);
      }
    };
    fetchData();
  }, [slug]);


  const handleClick = (itemIdx, itemType) => {
    if (itemType !== 'quote') return;
    setActiveIndex(activeIndex === itemIdx ? null : itemIdx);
  };
  const filterBySearchTerm = (data) => {
    if (!searchTerm || !searchTerm.trim()) return data;
    return data.filter(item =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = filterBySearchTerm(data);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(startIndex, endIndex);

  return (
    <div className='see-all'>
      <div className="see-all-text">
        <Link to="/userlayout/relax">
          <img src={return_relax} alt="Quay lại" />
        </Link>
        <h4>
          {slug === "popular"
            ? "Phổ biến"
            : (data.length > 0 ? data[0].type : "Đang tải...")}
        </h4>

      </div>

      <div className="see-all-content">
        <div className='noidung-bottom'>
          {currentItems.map((item, itemIdx) => (
            <Item
              key={item.id}
              item={item}
              itemIdx={itemIdx}
              activeIndex={activeIndex}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default XemTatCa;
