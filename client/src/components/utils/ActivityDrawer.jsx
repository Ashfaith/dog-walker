import { useContext } from "react";
import { DrawerContext } from "../dashboard/Record";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const ActivityDrawer = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(DrawerContext);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="bottom"
      className="activity-drawer"
    >
      <button onClick={toggleDrawer}>x</button>
      <div className="drawer-content">{children}</div>
    </Drawer>
  );
};

export default ActivityDrawer;
