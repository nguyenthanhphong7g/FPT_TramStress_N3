import React from 'react'
import ConsultingNavbar from '../../components/User/Consulting/ConsultingNavbar/ConsultingNavbar'
import ConsultingFilter from '../../components/User/Consulting/Main/ConsultingFilter'
import ExpertList from '../../components/User/Consulting/Main/ExpertList'

const UserConsulting = () => {
  return (
    <div>
      <ConsultingNavbar/>
      <ConsultingFilter/>
      <ExpertList/>
    </div>
  )
}

export default UserConsulting
