import React from 'react'
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginModal = ({loginModal, setLoginModal}) => {
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();


	const onSubmit = (data) => {

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/login`, data).then(res => {
        console.log(res.data)
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_id', res.data.userid);
          console.log('success');
					reset();
					setLoginModal(false);
					location.reload();
        } else {
          console.log('login failed');
        }
      });
			reset();
    });
	}

	const closeModal = () => {
		setLoginModal(false);
};


	if(loginModal) {
		return (
			<div id="overlay" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div id="content" className="bg-white p-5 rounded-lg">
          <IoMdClose className="text-3xl right-1 absolute top-1 cursor-pointer" onClick={closeModal} />
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">メールアドレス</label>
              <input type="email" {...register('email')} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5" placeholder="メールアドレス" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">パスワード</label>
              <input type="password" {...register('password')} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5" required />
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5">ログイン</button>
          </form>
        </div>
      </div>

			
		
		)
	} else {
		return null;
	}

}

export default LoginModal;
