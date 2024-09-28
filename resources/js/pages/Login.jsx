import React  from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login () {
  const {register, handleSubmit, reset} = useForm();

  const onSubmit = (data) => {
    
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/login`, data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_id', res.data.userid);
          console.log('success');
          location.reload();
      } else {
          console.log('login failed');
       }
      });
    });

    reset();
  }


  return(
    
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                 ログイン
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">メールアドレス</label>
                      <input type="email" {...register('email')} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="メールアドレス" required  />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">パスワード</label>
                      <input type="password"{...register('password')} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>

                  <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ログイン</button>
                  <Link to='/register'>
                  <p className="text-blue-800 font-bold mt-5">アカウントを作成する</p></Link>
              </form>
          </div>
      </div>
  </div>
  );
}

export default Login;