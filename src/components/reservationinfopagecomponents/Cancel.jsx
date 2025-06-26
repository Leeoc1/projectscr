import React from 'react'
import "../../componentcss/reservationinfopagecomponentcss/Cancel.css"

const Cancel = () => {
  return (
        <div className='rd-buttons'>
          <div className='rd-receipt-print'>영수증출력</div>
          <div className='rd-reservation-print'>예매정보 출력</div>
          <div className='rd-reservation-cancel'>예매취소</div>
        </div>
  )
}

export default Cancel