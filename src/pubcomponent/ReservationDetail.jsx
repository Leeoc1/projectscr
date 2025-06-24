import React from 'react'
import "../pubcomponentcss/ReservationDetail.css";

const ReservationDetail = () => {
  return (
    <div className='rd-history-reservation'>
        <div className='rd-bokdinfo'>
          <div className='rd-reservation-num'>
            <span className='rd-num' style={{fontWeight:"bold"}}>예매번호</span>
            <span className='rd-num'>0101-2929-9292</span>
          </div>

          <div className='rd-infodetail'>
            <div className='rd-poster'>
              <img className='rd-img' src='/images/28Years.png' alt='28년 후' />
            </div>
            <div className='rd-info'>
              <table className='rd-table'>
                <colgroup>
                  <col style={{width:"70px"}} />
                  <col style={{width:"200px"}} />
                  <col style={{width:"100px"}} />
                </colgroup>
                <tbody>
                  <tr className='rd-tr'>
                    <th>영화명</th>
                    <td colSpan={3}>룩백</td>
                  </tr>
                  <tr className='rd-tr'>
                    <th>관람극장</th>
                    <td>더시네마 평촌</td>
                    <th>관람인원</th>
                    <td>일반 2</td>
                  </tr>
                  <tr className='rd-tr'>
                    <th>상영관</th>
                    <td>6관 9층</td>
                    <th>관람좌석</th>
                    <td>C3-4</td>
                  </tr>
                  <tr className='rd-tr'>
                    <th>관람일시</th>
                    <td colSpan={3}>2025.06.19(목) 22:20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='rd-bokdpayinfo'>
          <div className='rd-totalpay'>총 결제금액</div>
          <div>
            <span className='rd-paymethod'>신용카드</span>
            <span className='rd-money'>15000</span>
            <span className='rd-money'>원</span>
          </div>
        </div>
    </div>
  )
}

export default ReservationDetail