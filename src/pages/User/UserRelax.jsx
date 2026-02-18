import React, { useRef, useEffect, useState } from 'react';
import BoLoc from '../../components/User/Relax/Main/BoLoc';
import NoiDung from '../../components/User/Relax/Main/NoiDungThuGian';
import Search_GocThuGian from '../../components/Common/Search/Search_GocThuGian';

const UserRelax = () => {
    const [isActive, setIsActive] = useState(0);

    const refs = [
        useRef(null), 
        useRef(null), 
        useRef(null), 
        useRef(null), 
        useRef(null), 
    ];

    const handleScrollToSection = (index) => {
        setIsActive(index);
        if (refs[index]?.current) {
            refs[index].current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY < 200 && isActive !== 0) {
                setIsActive(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isActive]);

    return (
        <div className='GocThuGian' style={{ background: '#fff' }}>
            <Search_GocThuGian/>
            <BoLoc onButtonClick={handleScrollToSection} isActive={isActive} />
            <NoiDung refs={refs} />
        </div>
    );
};

export default UserRelax;
