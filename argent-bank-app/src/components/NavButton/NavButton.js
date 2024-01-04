import "./NavButton.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/**
 * NavButton Component
 * @param {string} label: Displayed text for the button
 * @param {string} to: The target URL to navigate to when the button is clicked
 * @param {IconDefinition} icon: The icon to display next to the label
 * @param {string} size: The size of the FontAwesome icon (default is "lg")
 * @param {function} onClick: The click event handler for the button
 * @returns {JSX.Element}: The JSX element representing the NavButton component
 */
export default function NavButton({ label, to, icon, size = "lg", onClick }) {
  return (
    <NavLink className="NavButton" onClick={onClick} to={to}>
      <FontAwesomeIcon icon={icon} size={size} /> {label}
    </NavLink>
  );
}
