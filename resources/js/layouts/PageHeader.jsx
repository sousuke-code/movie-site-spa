import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PageHeader = () => {
  const [loginName, setLoginName] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('auth_name');
    if (username) {
      setLoginName(username);
    }
  }, []);


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
              <span>こんにちは、{loginName}さん</span>
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
