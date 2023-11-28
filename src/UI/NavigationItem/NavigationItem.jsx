import { setTab } from "../../contexts/MainSlice";
import classes from "./NavigationItem.module.css";

const NavigationItem = ({ text, index, tabActive, dispatch }) => {
  function handleChangeTab() {
    dispatch(setTab(index));
  }
  return (
    <li
      className={`${classes.navigationItem} ${tabActive === index && "active"}`}
      onClick={handleChangeTab}
    >
      {text}
    </li>
  );
};

export default NavigationItem;
