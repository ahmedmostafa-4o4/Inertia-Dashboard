function Overlay(props) {
  const { handleSideBar } = props;
  return (
    <div
      className="overlay"
      onClick={(e) => {
        e.currentTarget.style.display = "none";
        handleSideBar && handleSideBar();
      }}
    ></div>
  );
}

export default Overlay;
