import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';

const PageHeader = () => {
  const [loginName, setLoginName] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('auth_name');
    if (username) {
      setLoginName(username);
    }
  }, []);

  const logoutSubmit = (e) => {
    e.preventDefault();

      axios.post(`/api/logout`).then(res => {
        console.log(res.data);
        if(res.data.status === 200) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
          setLoginName('');
        }
      }).catch(error => {
        console.log('Logout failed', error);
      })
  }


  return (
    <>
   <ul className='flex justify-center'>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800' to='/'>ホーム</Link>
    </li>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800 font bold' to='/movie/search'>検索</Link>
    </li>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800 font bold' to='/login'>ログイン</Link>
    </li>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800 font bold' to='/register'>登録</Link>
    </li>
    <li className='mr-6'>
    <div className='text-white font-bold'>
            {loginName ? (
              <>
              <span>こんにちは、{loginName}さん</span>
               <span className='ml-2' onClick={ logoutSubmit }>ログアウト</span>
              </>
            ) : (
              <span>ログインしていません</span>
            )}
          </div>
    </li>
   </ul>
    </>
  )
}

export default PageHeader
