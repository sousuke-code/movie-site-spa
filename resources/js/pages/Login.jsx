import React, {useState} from "react";
import axios from "axios";

function Login() {
  const [Login, setLogin] = useState({
    email: '',
    password: '',
  })

  const handleInput = (e) => {
    setLogin({...Login, [e.target.name] : e.target.value});
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: Login.email,
      password: Login.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/login`, data).then(res => {
        if(res.data.status === 200){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          console.log('success');
          history.push('/');
          location.reload();
      } else if (res.data.status === 401){
          console.log('failed');
      } else {
          setLogin({...loginInput, error_list: res.data.validation_errors});
       }
      });
    });
  }


  return(
    <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h4>Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={loginSubmit}>
                                <div className="form-group mb-3">
                                    <label>Mail Address</label>
                                    <input type="email" name="email" onChange={handleInput} value={Login.email} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={handleInput} value={Login.password} className="form-control" />
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Login;