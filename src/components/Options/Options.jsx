import { useSelector } from "react-redux";

import Input from "../../UI/Input/Input";
import classes from "./Options.module.css";

const Options = () => {
  const { options, transfers } = useSelector((store) => store.main);
  return (
    <div className={classes.options}>
      <p>Количество пересадок</p>
      <div className={classes.inputsContainer}>
        <Input
          text="Все"
          name="all"
          key={"all"}
          checked={transfers.every((el) => el.status)}
        />
        {options.map((optionObj, index) => (
          <Input
            text={optionObj.text}
            index={index}
            name={optionObj.name}
            key={index}
            checked={transfers[index].status}
          />
        ))}
      </div>
    </div>
  );
};

export default Options;
