import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Offer from "../../UI/Offer/Offer";
import { getTikets, getToken } from "../../contexts/MainSlice";
import filter from "../../helperFunctions/filter";
import sort from "../../helperFunctions/sort";
import classes from "./Offer.module.css";

const Offers = () => {
  const { tabActive, transfers } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const { token, stop, pending } = useSelector((state) => state.main);

  useEffect(() => {
    if (!token) {
      dispatch(getToken());
    }
  }, [token]);
  useEffect(() => {
    if (token && !stop && !pending) {
      dispatch(getTikets());
    }
  }, [token, stop, pending]);
  const ticketsFromServer = useSelector(
    (state) => state.main.ticketsFromServer,
  );
  const [count, setCount] = useState(5);
  const sortedTickets = filter(
    sort([...ticketsFromServer], tabActive),
    transfers,
  );
  return (
    <div className={classes.Offers}>
      {!stop && <Spin />}
      {sortedTickets.length
        ? sortedTickets.map((offer, index) => {
            if (index >= count) return;
            return (
              <Offer
                data={offer}
                key={`${offer.price}${offer.carrier}${offer.segments[0].duration}`}
              />
            );
          })
        : transfers.every((el) => !el.status)
          ? "Вы не выбрали ни одного фильтра"
          : !stop
            ? "Ожидайте окончения поиска"
            : "Билетов по заданным параметрам не найденно."}
      {sortedTickets.length > count ? (
        <button
          className={classes.addTickets}
          onClick={() => setCount((count) => count + 5)}
        >
          Показать ещё 5 билетов
        </button>
      ) : null}
    </div>
  );
};

export default Offers;
