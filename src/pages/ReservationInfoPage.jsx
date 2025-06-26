import React from 'react'
import Header from '../pubcomponent/Header'
import ReservationDetail from '../pubcomponent/ReservationDetail'
import Cancel from '../components/reservationinfopagecomponents/Cancel'

import "../pagecss/ReservationInfoPage.css"
import CancelInfo from '../components/reservationinfopagecomponents/CancelInfo'

const ReservationInfoPage = () => {
  return (
    <div>
        <Header />
        <div className='rip-content'>
            <div className='rip-title'>예매내역</div>
            <ul>
                <li>
                    <ReservationDetail />
                    <Cancel />
                </li>
                <li>
                    <ReservationDetail />
                    <Cancel />
                </li>
            </ul>
            
            <div className='rip-title'>취소내역</div>
            <CancelInfo />
        </div>
        
    </div>
  )
}

export default ReservationInfoPage