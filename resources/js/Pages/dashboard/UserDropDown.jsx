import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserDropDown() {
  return (
    <div className="user-dropdown">
      <button className="image">
        <img src="/images/default-user.jpg" alt="" />
        <FontAwesomeIcon icon={faSortDown} />
      </button>
    </div>
  );
}

export default UserDropDown;
