import React from 'react'
import axios from 'axios';
import { useState } from 'react';


const http = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
});


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    http.get('http://localhost/api/users').then((res) => {
      setUsers(res.data);
    })
  }

  const login = () => {
    http.get('/sanctum/csrf-cookie').then((res) => {
      http.post('/api/login', {email, password}).then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Login error:', error);
        // エラー時の処理をここに追加
      });
    }).catch((error) => {
      console.error('CSRF cookie error:', error);
      // CSRFトークン取得時のエラー処理
    });
  }

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <>
    <div>
    <button onClick={login}>ログイン</button>
    <button onClick={getUsers}>User 一覧</button>
    </div>
    <div>
      <label>email</label>
        <input type="text" value={email} onChange={onChangeEmail}/>
        <label>password</label>
        <input type="password" value={password} onChange={onChangePassword}/>
    </div>
    <div>
        {
          users.map((user) => {
            return (
              <p key={user.email}>{user.name}</p>
            )
          })
        }
      </div>
    </>
  )
}

export default Login
