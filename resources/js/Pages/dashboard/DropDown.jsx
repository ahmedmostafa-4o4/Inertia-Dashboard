import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function DropDown(props) {
    console.log();
    return (
        <DropdownButton
            id="dropdown-basic-button"
            title={`${props.title}`}
            className="sort-by"
        >
            {props.items &&
                props.items.map((item, index) => (
                    <Dropdown.Item href={`#/action-${index}`} key={item.id}>
                        {item.item}
                    </Dropdown.Item>
                ))}
        </DropdownButton>
    );
}
