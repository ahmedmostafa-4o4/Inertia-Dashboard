import { useEffect, useState } from "react";

export default function Notify({ title, message, onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }, []);

    return (
        <div
            className={`notify-2 fixed top-3 right-3 animate__animated ${
                isVisible ? "animate__bounceInRight" : "animate__bounceOutRight"
            }  z-50`}
        >
            {message}
            <div className={`progress-bar ${!isVisible ? "hidden" : ""}`} />
        </div>
    );
    // const [isAnimating, setIsAnimating] = useState(true);
    // const [isVisible, setIsVisible] = useState(true); // Track visibility

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setIsAnimating(false);
    //         setTimeout(() => {
    //             setIsVisible(false); // Hide notification after animation ends
    //         }, 500); // Wait for reverse animation to complete
    //     }, 3000); // Keep the notification visible for 3 seconds

    //     return () => clearTimeout(timeout);
    // }, []);

    // if (!isVisible) return null; // Don't render if not visible

    // return (
    //     <div className="notify-holder">
    //         <div
    //             className={`notify ${!isAnimating ? "fade-out" : ""}`}
    //             onClick={onClose}
    //         >
    //             {isAnimating ? (
    //                 <>
    //                     <strong>{title}</strong>
    //                     <br />
    //                     {message}
    //                 </>
    //             ) : null}
    //         </div>
    //         <div className={`progress-bar ${!isAnimating ? "hidden" : ""}`} />
    //     </div>
    // );
}
