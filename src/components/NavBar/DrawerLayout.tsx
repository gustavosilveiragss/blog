import React from "react";
import Navbar from "./NavBar";
import { useSessionStorage } from "usehooks-ts";
import NavBarPages from "./NavBarPages";
import { IoIosClose, IoIosSearch } from "react-icons/io";
import { useRouter } from "next/router";
type Props = {
    children: React.ReactNode;
};

const DrawerLayout = ({ children }: Props) => {
    const [open, setOpen] = useSessionStorage("drawer", false);
    const router = useRouter();
    const searchClass = open ? "relative" : "hidden";
    const searchIconClass = open ? "absolute" : "hidden";

    return (
        <>
            <div className="drawer drawer-end z-50">
                <input
                    id="app-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                    onChange={() => { }}
                    checked={open}
                />

                <div className="drawer-content flex flex-col">
                    <Navbar />
                    {children}
                </div>

                <div className="drawer-side">
                    <ul className="menu p-4 overflow-y-auto w-full l bg-neutral">
                        <div className="flex justify-end mb-6">
                            <button onClick={() => setOpen(false)}><IoIosClose size={36} /></button>
                        </div>
                        <div className={"flex justify-end items-center mb-3 " + searchClass}>
                            <input type="text" placeholder="Search" className="input input-bordered w-full" />
                            <IoIosSearch color="white" className={"mr-2 w-10 " + searchIconClass} />
                        </div>
                        <button onClick={() => {
                            router.push("/");
                            setOpen(false);
                        }} className="text-white rounded-lg feed-btn outline outline-1">
                            FEED
                        </button>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default DrawerLayout;