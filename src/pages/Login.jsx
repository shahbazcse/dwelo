import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import Logo from "../assets/logo.png"
import { loginUser } from "../services/authService";
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const setTestUser = () => {
        setForm({
            email: "john@email.com",
            password: "john@123",
        });
    };

    const handleLogin = async () => {
        setLoading(true);
        const response = await dispatch(loginUser(form, rememberMe));
        if (response.token) {
            setTimeout(() => {
                navigate("/");
                setLoading(false);
            }, 3000)
        }
        else setLoading(false);
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-indigo-400 to-indigo-700 items-center justify-center font-[raleway]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className='flex items-center justify-center gap-2'>
                    <img src={Logo} alt="logo" className='h-8 w-8 shadow-xl rounded-full' />
                    <span className='font-[poppins] font-bold tracking-wide text-xl text-[#7950F2]'>dwelo</span>
                </div>
                <h1 className="text-2xl font-bold text-left my-6">
                    Login
                </h1>
                <div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            placeholder="john@email.com"
                            type="email"
                            className="w-full border border-gray-400 p-2 rounded-md"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: String(e.target.value) })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            placeholder="**********"
                            type="password"
                            className="w-full border border-gray-400 p-2 rounded-md"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: String(e.target.value) })
                            }
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex justify-between items-center gap-0.5">
                            <input
                                type="checkbox"
                                id="remember-me"
                                value={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label
                                className="ml-2 block text-sm text-gray-900"
                                htmlFor="remember-me"
                            >
                                Remember Me
                            </label>
                        </div>
                        <div
                            onClick={setTestUser}
                            className="text-xs bg-orange-100 hover:bg-orange-200 cursor-pointer rounded-md px-1 py-0.5"
                        >
                            Test Credentials
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            disabled={loading}
                            onClick={handleLogin}
                            className="flex justify-center items-center w-full hover:bg-[#5e62d4] bg-[#7377db] text-white p-3 rounded-md"
                        >
                            {loading ? (<TailSpin visible={true}
                                height="24"
                                width="24"
                                color="#FFFFFF"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperClass="" />) : "Login"}

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
