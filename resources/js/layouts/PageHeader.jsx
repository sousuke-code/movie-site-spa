import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import axios from "axios";

const PageHeader = () => {
    const [loginName, setLoginName] = useState("");
    const [login, setLogin] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleMenuOpen = () => {
        setOpenMenu(!openMenu);
    };

    useEffect(() => {
        const username = localStorage.getItem("auth_name");
        if (username) {
            setLoginName(username);
            setLogin(true);
        }
    }, []);

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then((response) => {
            const token = localStorage.getItem("auth_token");
            axios
                .post(
                    `/api/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status === 200) {
                        localStorage.removeItem("auth_token");
                        localStorage.removeItem("auth_name");
                        setLoginName("");
                        setLogin(false);
                    }
                })
                .catch((error) => {
                    console.log("Logout failed", error);
                });
        });
    };

    return (
        <>
            <nav className="bg-white shadow h-16 border-bottom flex">
                <ul className="flex w-full justfy-end items-center">
                    <li className="mr-6 ml-auto">
                        <div className="max-md:hidden">
                            <Link
                                className="text-black font-bold text-lg hover:text-blue-800"
                                to="/"
                            >
                                トップページ
                            </Link>
                        </div>
                    </li>

                    <li className="mr-6">
                        <div className="max-md:hidden">
                            <Link
                                className="text-black font-bold text-lg hover:text-blue-800 font bold"
                                to="/movie/search"
                            >
                                検索する
                            </Link>
                        </div>
                    </li>

                    <li></li>

                    <li className="mr-2 ">
                        {login ? (
                            <div onClick={logoutSubmit}>
                                <LuLogOut className="text-2xl" />
                                <p className="text-balck font-bold">logout</p>
                            </div>
                        ) : (
                            <>
                                <Link
                                    className="text-2xl text-black font-bold hover:text-blue-800 font bold"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </li>

                    <li className="items-right p-2">
                        <div className="lg:hidden flex items-center text-right">
                            <button
                                onClick={handleMenuOpen}
                                type="button"
                                className="z-20 ml-auto space-y-2"
                            >
                                <div
                                    className={
                                        openMenu
                                            ? "w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45"
                                            : "w-8 h-0.5 bg-gray-600"
                                    }
                                />
                                <div
                                    className={
                                        openMenu
                                            ? "opacity-0"
                                            : "w-8 h-0.5 bg-gray-600"
                                    }
                                />
                                <div
                                    className={
                                        openMenu
                                            ? "w-8 h-0.5 bg-gray-600 -rotate-45"
                                            : "w-8 h-0.5 bg-gray-600"
                                    }
                                />
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>

            {/* ハンバーガーメニュー（スマホ~タブレットサイズ） */}
            <nav
                className={
                    openMenu
                        ? "fixed bg-slate-50 right-0 top-0 w-8/12 h-screen  pt-8 px-3 z-10"
                        : "fixed right-[-100%]"
                }
            >
                <ul className="">
                    <li className="m-10 text-2xl">
                        <Link
                            onClick={handleMenuOpen}
                            className="text-black font-bold hover:text-blue-800"
                            to="/"
                        >
                            ホーム
                        </Link>
                    </li>
                    <li className="m-10 mr-6 text-2xl">
                        <Link
                            onClick={handleMenuOpen}
                            className="text-black font-bold hover:text-blue-800 font bold"
                            to="/movie/search"
                        >
                            検索する
                        </Link>
                    </li>

                    <li className="m-10 text-2xl">
                        {login ? (
                            <>
                                <Link
                                    onClick={handleMenuOpen}
                                    className="text-black hover:text-blue-800 font-bold"
                                    to="/homepage"
                                >
                                    マイページ
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default PageHeader;
