import React from 'react'
import "../../componentcss/reservationinfopagecomponentcss/CancelInfo.css"

const CancelInfo = () => {
  return (
    <div className='ci-cancelinfo'>
        <table className='ci-table'>
            <colgroup>
                <col style={{width:"260px"}} />
                <col style={{width:"180px"}} />
                <col style={{width:"180px"}} />
                <col style={{width:"180px"}} />
                <col style={{width:"180px"}} />
            </colgroup>
            <tbody>
                <tr className='ci-tr-title'>
                    <th>영화명</th>
                    <th>영화관</th>
                    <th>상영일시</th>
                    <th>취소일시</th>
                    <th>취소금액</th>
                </tr>
                <tr className='ci-tr'>
                    <td colSpan={5}>취소내역이 존재하지 않습니다.</td>
                </tr>
                <tr className='ci-tr'>
                    <td>길어지면 ... 처리</td>
                    <td>더 시네마 평촌</td>
                    <td>2025.06.22</td>
                    <td>2025.06.19</td>
                    <td>
                        <span className='ci-money'>15000</span>
                        <span>원</span>
                    </td>
                </tr>
                <tr className='ci-tr'>
                    <td>길어지면 ... 처리</td>
                    <td>더 시네마 평촌</td>
                    <td>2025.06.22</td>
                    <td>2025.06.19</td>
                    <td>
                        <span className='ci-money'>15000</span>
                        <span>원</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default CancelInfo