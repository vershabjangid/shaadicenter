import { FaHome, FaInfo, FaLanguage, FaOm, FaUser, FaWallet } from "react-icons/fa";
import { FaBook, FaGlobe, FaPeopleGroup } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { IoColorPalette } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

export let sidebardata = [
    {
        Name: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />
    },
    {
        Name: "Home",
        path: "/dash-home",
        icon: <FaHome />
    },
    {
        Name: "About",
        path: "/dash-about",
        icon: <FaInfo />
    },
    {
        Name: "Users",
        path: "/dash-users",
        icon: <FaUser />
    },
    {
        Name: "Religions",
        path: "/dash-religions",
        icon: <FaOm />
    },
    {
        Name: "Mother Tongue",
        path: "/dash-mothertongue",
        icon: <FaLanguage />
    },
    {
        Name: "Caste",
        path: "/dash-caste",
        icon: <FaPeopleGroup />
    },
    {
        Name: "Regions",
        path: "/dash-regions",
        icon: <FaGlobe />
    },
    {
        Name: "Education",
        path: "/dash-education",
        icon: <FaBook />
    },
    {
        Name: "Occupation",
        path: "/dash-occupation",
        icon: <GrUserWorker />
    },
    {
        Name: "Themes",
        path: "/dash-themes",
        icon: <IoColorPalette />
    },
    {
        Name: "Payments",
        path: "/dash-payments",
        icon: <FaWallet />
    },
]