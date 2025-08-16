import "./SidebarFormLayout.css";
import { NavLink } from "react-router-dom";

const SidebarFormLayout = ({ sidebarItems = []}) => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                "sidebar-item" + (isActive ? " active" : "")
              }
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarFormLayout;
