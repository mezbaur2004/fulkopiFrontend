import React, {useRef} from "react";
import { Link } from "react-router-dom";
import { LoginRequest } from "../APIRequest/userAPIRequest.js";
import { ErrorToast, IsEmail, IsEmpty } from "../helper/formHelper";

const Login = () => {
    let emailRef=useRef(null);
    let passRef=useRef(null);


    const SubmitLogin = async () => {
        let email = emailRef.current.value;
        let pass = passRef.current.value;

        if (!IsEmail(email)) {
            ErrorToast("Invalid Email Address");
        } else if (IsEmpty(pass)) {
            ErrorToast("Password Required");
        } else {
            let result = await LoginRequest(email, pass);
            if (result) {
                window.location.href = "/";
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h3>SIGN IN</h3>
                                <br />
                                <input ref={emailRef} placeholder="User Email" className="form-control" type="email" />
                                <br />
                                <input ref={passRef} placeholder="User Password" className="form-control" type="password" />
                                <br />
                                <button onClick={SubmitLogin} className="btn btn-outline-info w-100 animated">Next</button>
                                <div className="mt-3">
                                    <span>
                                        <Link className="text-center ms-3 h6" to="/Registration">Sign Up</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
