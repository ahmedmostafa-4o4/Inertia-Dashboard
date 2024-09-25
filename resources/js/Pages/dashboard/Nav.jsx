import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Overlay from "./Overlay";
import { useEffect, useState } from "react";
import UserDropDown from "./UserDropDown";

export default function Nav({ header }) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("dark");
    const changeMode = () => {
        if (mode === "dark") {
            setMode("white");
            document.documentElement.style.setProperty(
                "--dashboard-main-color",
                "#F5F5F5"
            );
            document.documentElement.style.setProperty(
                "--dashboard-sec-color",
                "rgb(214, 214, 214)"
            );
            document.documentElement.style.setProperty("--text-color", "black");
        } else {
            setMode("dark");
            document.documentElement.style.setProperty(
                "--dashboard-main-color",
                "rgb(1, 14, 51)"
            );
            document.documentElement.style.setProperty(
                "--dashboard-sec-color",
                "rgb(1, 1, 31)"
            );
            document.documentElement.style.setProperty("--text-color", "white");
        }
    };

    const handleSideBar = (isOpen = true) => {
        if (isOpen === false) {
            setIsOpen(true);
            document.querySelector(".dashboard-sidebar").classList.add("show");
            document
                .querySelector(".dashboard-sidebar")
                .classList.remove("hide");
            document
                .querySelector(".dashboard-body .sidebar-contain")
                .classList.add("show");
            document
                .querySelector(".dashboard-body .sidebar-contain")
                .classList.remove("hide");
        } else {
            document.querySelector(".dashboard-sidebar").classList.add("hide");
            document
                .querySelector(".dashboard-sidebar")
                .classList.remove("show");
            document
                .querySelector(".dashboard-body .sidebar-contain")
                .classList.add("hide");
            document
                .querySelector(".dashboard-body .sidebar-contain")
                .classList.remove("show");
            setIsOpen(false);
        }
    };

    const windowHandle = () => {
        window.innerWidth <= 768 ? setIsOpen(false) : setIsOpen(true);
    };

    useEffect(() => {
        windowHandle();
        handleSideBar();
    }, []);
    return (
        <>
            {isOpen && <Overlay handleSideBar={handleSideBar} />}
            <div
                className="dashboard-nav"
                style={
                    !isOpen ? { width: "calc(100% - 10px)", left: "5px" } : null
                }
            >
                <div>
                    <button
                        className="burger-btn"
                        onClick={() => handleSideBar(isOpen)}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <h1>Dashboard | {header}</h1>
                </div>
                <div className="actions">
                    <button
                        className="light-dark-mode"
                        onClick={() => changeMode()}
                    >
                        {mode === "dark" ? (
                            <FontAwesomeIcon icon={faMoon} />
                        ) : (
                            <FontAwesomeIcon icon={faSun} />
                        )}
                    </button>

                    <UserDropDown />
                </div>
            </div>
        </>
    );
}
