<ul className='flex justify-center items-center'>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800' to='/'>トップページ</Link>
    </li>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800 font bold' to='/movie/search'>検索する</Link>
    </li>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800 font bold' to='/login'>Login</Link>
    </li>
    <li className='mr-6'>
      <Link className='text-blue-500 hover:text-blue-800 font bold' to='/register'>登録</Link>
    </li>
    <li className='mr-6 '>
      <Link className='text-black hover:text-blue-800 font bold' to='/homepage'>ホームページ</Link>
    </li>
    <li className='mr-6'>
            {login ? (
               <>
               <LuLogOut />
              </>
            ) : (
              <Link className='text-blue-500 hover:text-blue-800 font bold' to='/login'>Login</Link>
            )}
          
    </li>
