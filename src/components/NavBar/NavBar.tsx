import React, { useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";

import Logo from '../../../public/icons/logo-temp.svg';
import SearchDropdown from "./SearchDropdown";

const Navbar = () => {
    const [, setOpen] = useSessionStorage("drawer", false);
    const toggleDrawer = () => setOpen((prev) => !prev);

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="w-full sticky top-0 navbar bg-base-100 z-50 lg:justify-around justify-between">
            <a href="/"><Image alt="G" height={45} src={Logo} /></a>

            <div className="flex-none hidden lg:flex gap-8 flex-row">
                <a href="/" className="text-white rounded-lg feed-btn">
                    FEED
                </a>
                <div className="dropdown dropdown-end">
                    <label className="flex justify-end items-center relative">
                        <input type="text" placeholder="Search" className="input input-bordered text-white" onChange={(e) => setSearchTerm(e.target.value)} />
                        <IoIosSearch color="white" className="absolute mr-2 w-10" />
                    </label>
                    <SearchDropdown searchTerm={searchTerm} />
                </div>
            </div>

            {/* Mobile menu button only shows for lg and below devices */}
            <div className="flex-none lg:hidden">
                <label className="btn btn-square btn-ghost text-base" onClick={toggleDrawer}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        color="white"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;