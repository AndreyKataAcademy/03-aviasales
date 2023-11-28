import Navigation from "../../components/Navigation/Navigation";
import Offers from "../../components/Offers/Offers";
import Options from "../../components/Options/Options";
import classes from "./styles/MainContent.module.css";

const MainContent = () => {
  return (
    <div className={classes.mainContent}>
      <Options />
      <div className={classes.content}>
        <Navigation />
        <Offers />
      </div>
    </div>
  );
};

export default MainContent;
