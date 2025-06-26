import React from 'react'
import Header from '../pubcomponent/Header'
import MyPageBox from '../components/mypagecomponents/MyPageBox'
import MyPageContents from '../components/mypagecomponents/MyPageContents'
import MyAccount from '../components/mypagecomponents/MyAccount'
import '../pagecss/MyPage.css'

const MyPage = () => {
  return (
    <div>
        <Header />
        <MyPageBox />

        <div className='myp-content'>
            <MyPageContents />
            <MyAccount />
        </div>
        
    </div>
  )
}

export default MyPage