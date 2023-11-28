import { format } from "date-fns";

import OfferInfoSection from "../OfferInfoSection";
import classes from "./Offer.module.css";

const Offer = ({ data }) => {
  const dateFrom = new Date(data.segments[0].date);
  const dateFromDuration = data.segments[0].duration * 1000 * 60;
  const dateTo = new Date(data.segments[1].date);
  const dateToDuration = data.segments[1].duration * 1000 * 60;

  return (
    <div className={classes.offer}>
      <div className={classes.price}>
        <p>{data.price} ₽</p>
        <img src={`https://pics.avs.io/99/36/${data.carrier}.png`} />
      </div>
      <div className={classes.offerInfo}>
        <OfferInfoSection
          text={`${data.segments[0].origin} - ${data.segments[0].destination}`}
          value={`${format(dateFrom, "HH:mm")} - ${format(
            new Date(dateFrom.getTime() + dateFromDuration),
            "HH:mm",
          )}`}
          text2={`${data.segments[1].origin} - ${data.segments[1].destination}`}
          value2={`${format(dateTo, "HH:mm")} - ${format(
            new Date(dateTo.getTime() + dateToDuration),
            "HH:mm",
          )}`}
        />
        <OfferInfoSection
          text="в пути"
          value={format(dateFromDuration, "HHч mmм")}
          text2="в пути"
          value2={format(dateToDuration, "HHч mmм")}
        />
        <OfferInfoSection
          text={`${data.segments[0].stops.length} ${
            data.segments[0].stops.length === 1
              ? "Пересадка"
              : data.segments[0].stops.length === 0
                ? "Пересадок"
                : "Пересадки"
          }`}
          value={data.segments[0].stops.join(", ")}
          text2={`${data.segments[1].stops.length} ${
            data.segments[1].stops.length === 1
              ? "Пересадка"
              : data.segments[1].stops.length === 0
                ? "Пересадок"
                : "Пересадки"
          }`}
          value2={data.segments[1].stops.join(", ")}
        />
      </div>
    </div>
  );
};

export default Offer;
