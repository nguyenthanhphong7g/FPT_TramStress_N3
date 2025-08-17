import React from 'react'

import '../Main/NoiDungThuGian.css'
import './XemTatCa.css'
import return_relax from '../../../../assets/images/Relax/return_relax.png'
import lake from '../../../../assets/images/Relax/lake.png'
import rain from '../../../../assets/images/Relax/rain.png'
import sea from '../../../../assets/images/Relax/sea.png'
import sky from '../../../../assets/images/Relax/sky.png'
import sunset from '../../../../assets/images/Relax/sunset.png'
import yoga from '../../../../assets/images/Relax/yoga.png'
import { Link, useLocation, useParams } from 'react-router-dom'
import GocThuGian from '../Main/GocThuGian'

const XemTatCa = () => {
    const { slug } = useParams();
    const section = GocThuGian.find(sec => sec.slug === slug);

    if (!section) return <h2>Không tìm thấy nội dung</h2>;
    return (
        <div className='see-all'>
            <div className="see-all-text">
                <Link to="/userlayout/relax">
                    <img src={return_relax} alt="Quay lại" />
                </Link>
                <h4>{section.title}</h4>
            </div>

            <div className="see-all-content">
                <div className="noidung-bottom">
                    {section.items.map((item, idx) => (
                        <div key={idx} className={item.type}>
                            <img src={item.img} alt={item.type} />
                            <div className='content'>
                                <p>{item.text}</p>
                                {item.author && <h4>{item.author}</h4>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default XemTatCa
