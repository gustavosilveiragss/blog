import { IoIosSearch } from "react-icons/io";

const NavBarPages = () => {
    return (
        <>
            <a href="/" className="text-white rounded-lg feed-btn">
                FEED
            </a>
            <div className="flex justify-end items-center relative">
                <input type="text" placeholder="Search" className="input input-bordered" />
                <IoIosSearch color="white" className="absolute mr-2 w-10"/>
            </div>
        </>
    )
};

export default NavBarPages;