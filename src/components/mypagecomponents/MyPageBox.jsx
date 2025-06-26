import React from 'react'
import "../../componentcss/mypagecomponentcss/MyPageBox.css"

const MyPageBox = () => {
  return (
    <div className='mpb-bg'>
        <div className='mpb-myinfo-box'>
            <div className='mpb-top'>

            </div>
            <div className='mpb-bottom'>
                <div className='mpb-button'>예매내역</div>
                <div className='mpb-button'>
                    <span>쿠폰함</span>
                    <span>3</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyPageBox;