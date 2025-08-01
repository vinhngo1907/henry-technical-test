import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../redux/authSlice';


const Login = () => {
    const {auth} = useSelector(state => state);
    const dispatch = useDispatch()
    const history = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: "", password: ""
    });
    const [typePass, setTypePass] = useState(false);
    const { email, password } = userLogin;
    useEffect(() => {
        if(auth.token) history.push("/")
    },[auth.token])
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userLogin))
    }
    const handleChangeInput = (e) => {
         const { name, value } = e.target
        setUserLogin({ ...userLogin, [name]: value });
    }
    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">V-Login</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                        aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />

                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" >Password</label>
                    <div className="pass">

                        <input type={typePass ? "text" : "password"}
                            className="form-control" id="exampleInputPassword1"
                            onChange={handleChangeInput} value={password} name="password" />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                </div>
                <button type="submit" className="btn btn-dark w-100"
                    disabled={email && password ? false : true}>
                    Login
                </button>

                <p className="my-2">
                    You don't have an account? <Link to="/register" style={{ color: "crimson" }}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login