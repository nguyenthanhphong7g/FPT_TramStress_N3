import React, { useState } from 'react'
import Search_GocThuGian from '../../components/Common/Search/Search_GocThuGian'
import XemTatCa from '../../components/User/Relax/Sub/SeeAll'

const UserRelaxSeeAll = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  return (
    <div>
      <Search_GocThuGian onSearch={handleSearch} />
      <XemTatCa searchTerm={searchTerm}/>
    </div>
  )
}

export default UserRelaxSeeAll