function Overlay({ handleSideBar, style }) {
    return (
        <div
            className="overlay"
            onClick={(e) => {
                e.currentTarget.style.display = "none";
                handleSideBar && handleSideBar();
            }}
            style={style}
        ></div>
    );
}

export default Overlay;
