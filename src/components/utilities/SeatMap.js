import React, { useContext, useEffect } from "react";
import BookerSVG from "../../../public/images/platsbokaren.svg";
import Floor4 from "../../../public/images/platsbokning.svg";
import Floor5 from "../../../public/images/platsbokning_p5.svg";
//import { selectedContext } from "../BookingFormV2";
import { selectedContext } from "../BookingFormV3";
import { useTransition, animated } from "react-spring";
import { languageContext } from "../../pages/_app";
import styles from "./seatMap.module.scss";
import Image from "next/image";

//const colorSelected = "#b9b9b9";
const colorInactive = "#b9b9b9"; // grå
const colorSelected = "#FFF068"; // gul
const colorReserved = "#E07979"; // röd
const colorAssigned = "#345f80"; // blå
const colorAvailable = "#89E17B"; // grön

// används inte längre, används i seatbooker
export function isReserved(seat, listOfReserved) {
  let isReserved = false;
  //console.log(listOfReserved);
  //console.log(seat);
  listOfReserved.forEach((booking) => {
    
    if (seat.seatID == booking.seatID && seat.floor == booking.floor) { // seat.level == booking.level
      isReserved = true;
      //console.log(seat);
    }
  });
  return isReserved;
}

export default function SeatMap({ seats, reservations, activeFloor, type }) {
  const [lang, setLang] = useContext(languageContext);

  const travelDst = 500;
  const floor5Transition = useTransition(activeFloor === 5, {
    from: { y: -travelDst, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -travelDst, opacity: 0 },
  });
  const floor4Transition = useTransition(activeFloor === 4, {
    from: { y: travelDst, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: travelDst, opacity: 0 },
  });

  // the selected type = "Brons", "Silver", "Guld"
  useEffect(() => {
    assignSeats();
    setSelected([]);
    selectedSeat.type !== type || isReserved(selectedSeat, reservations) ? setSelected([]) : null;
    console.log("selectedSeat: " + selectedSeat.type);
  }, [type, reservations]);

  // useEffect(() => {}, [type]);

  const [selectedSeat, setSelected] = useContext(selectedContext);
  const assignSeats = () => {
    seats.forEach((seat) => {
      const element = document.querySelector(`#${seat.id}`);
      if (!element) {
        console.error("Cant get element from id: " + seat.id);
        return;
      }
      // handle inactive seats
      element.classList.remove("seat-active");
      element.classList.add("seat-inactive");
      if (seat.type !== type) {
        //element.classList.add("seat-inactive");
        var color = colorInactive;
      // handle selected seat
      } else if (seat.id === selectedSeat.id) {
        element.classList.add("seat-active");
        element.classList.remove("seat-inactive");
        var color = colorSelected;
      // handle reserved seats
      } else if (isReserved(seat, reservations)) {
        var color = colorReserved;
      // handle assigned seats
      } else if (seat.type === "Brons") {
        var color = colorAssigned;
        //element.classList.remove("seat-active");
      // handle available seats
      } else {
        var color = colorAvailable;
        //element.classList.remove("seat-active");
      }
      // set color and make seat clickable
      element.style.fill = color;
       if (seat.type === type && type !== "Brons" && (!isReserved(seat, reservations))) {
        element.addEventListener("click", handleClick);
        element.classList.add("seat-animation");
      } else if(seat.type === type && type === "Brons") { // ser till att bronsplatserna studsar upp och ner
        element.classList.add("seat-active");
      } else {
        element.classList.remove("seat-active");
      }
    });
  };

  const handleClick = (e) => {
    const newSeat = seats.filter((seat) => {
      return seat.id === e.composedPath()[0].id;
    });

    setSelected(newSeat[0]);
  };

  const handleDeselectClick = (e) => {
    setSelected([]);
  }

  useEffect(() => {
    assignSeats();
  }, [selectedSeat]);

  return (
    <div className={styles.seatmap}>
      {floor4Transition(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <Floor4 />
            </animated.div>
          )
      )}
      {floor5Transition(
        (styles, item) =>
          item && (
            <animated.div style={styles}>
              <Floor5 />
            </animated.div>
          )
      )}
    </div>
  );
}
