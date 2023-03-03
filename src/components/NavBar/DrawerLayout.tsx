import React from "react";
import Navbar from "./NavBar";
import { useSessionStorage } from "usehooks-ts";
import NavBarPages from "./NavBarPages";
type Props = {
    children: React.ReactNode;
};

const DrawerLayout = ({ children }: Props) => {
    const [open, setOpen] = useSessionStorage("drawer", false);

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
                    <label
                        className="drawer-overlay"
                        onClick={() => setOpen(false)}
                    ></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-neutral">
                        <NavBarPages />
                    </ul>
                </div>
            </div>
        </>
    );
};
export default DrawerLayout;