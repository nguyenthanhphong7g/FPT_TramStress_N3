import React from 'react'
import './ConsultingNavbar.css'
import Search_GocThuGian from '../../../Common/Search/Search_GocThuGian'
import chatting from '../../../../assets/images/Consulting/chatting.png'
import calendar from '../../../../assets/images/Consulting/calendar.png'

const ConsultingNavbar = () => {
    return (
        <div className='consulting-navbar'>
            <Search_GocThuGian />
            <div className='consulting-navbar-right'>
                <div>
                    <img src={chatting} alt="" />
                </div>
                <div>
                    <img src={calendar} alt="" />
                </div>
            </div>

        </div>
    )
}

export default ConsultingNavbar
