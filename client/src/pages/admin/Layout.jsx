// Creating Layout for the Admin Pages

import { Outlet } from "react-router-dom"
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminSidebar from "../../components/admin/AdminSidebar"

const Layout = () => {

    return (
        <>
            <AdminNavbar />
            <div className="flex">
                {/* SIDEBAR */}
                <AdminSidebar />
                <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
                    {/* DASHBOARD / LIST / ADD SHOWS */}
                    <Outlet />
                </div>
            </div>
        </>
    )
}


export default Layout