import { EVENTS } from "./constants";
import { Calendar as BigCalendar, Components } from "react-big-calendar";
import { props } from "./props";
import "./index.css";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import setTime from "./functions";
import AppointmentEvent from "../appointmentEvent/AppointmentEvent";
import { EventItem } from "./types";
import React from "react";
const WORK_START_TIME = "9AM";
const WORK_END_TIME = "7PM";

interface DailyScheduleProps {
  day: Date;
}
export default function DailySchedule({day}:DailyScheduleProps) {
  const min = setTime(day, WORK_START_TIME);
  const max = setTime(day, WORK_END_TIME);
  
  const components: any = {
    event: ({ event }: { event: EventItem }) => {
      const data = event?.data;
      if (data?.appointment)
        return <AppointmentEvent appointment={data?.appointment} />;
      return null;
    },
    timeSlotWrapper: ({
      children,
      value,
      resource,
    }: {
      children: JSX.Element;
      value: string;
      resource: number;
    }) => {
      return React.cloneElement(children, {
        onContextMenu: (e: MouseEvent) => {
          e.preventDefault();
          // setXPosition(`${e.clientX}px`);
          // setYPosition(`${e.clientY}px`);
          // setIsOpen(true);
          // setSelectedTime(value);
          // setResourceId(resource);
        },
      });
    },
  };

  const resources = [
    { id: 1, title: "Dr Alex", WorkingHours:{1:"10AM-3PM", 2:"1PM-4PM"}},
    { id: 2, title: "Dr John", WorkingHours:{3:"10AM-3PM", 4:"1PM-4PM"}},
    { id: 3, title: "Dr Chan", WorkingHours:{4:"10AM-3PM", 5:"1PM-4PM"}},
    { id: 4, title: "Dr Wong", WorkingHours:{6:"10AM-3PM", 7:"1PM-4PM"}},
  ];

  return (
    <>
      {/* <div style={{ zIndex: 10, position: "relative" }}>
      </div> */}
      
      <BigCalendar
        {...props}
        min={min}
        max={max}
        events={EVENTS}
        components={components}
        resources={resources}
        view={'day'}
      />
    </>
  );
}