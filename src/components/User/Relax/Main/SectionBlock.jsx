// SectionBlock.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import icon_search from '../../../../assets/images/Relax/icon_search.png';
import Item from './Item';

const SectionBlock = ({ title, slug, data, refProp }) => (
  <div className="noidung" ref={refProp}>
    <div className="noidung-top">
      <h4>{title}</h4>
      <Link to={`/userlayout/relax/${slug}`} className="noidung-top-right">
        <h5>Xem tất cả</h5>
        <img src={icon_search} alt="" />
      </Link>
    </div>
    <div className='noidung-bottom'>
      {data.slice(0, 4).map((item, itemIdx) => (
        <Item key={item.id} item={item} itemIdx={itemIdx} />
      ))}
    </div>
  </div>
);

export default SectionBlock;
