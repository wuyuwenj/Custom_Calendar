import { EVENTS } from "./constants";
import { Calendar as BigCalendar, Components, SlotPropGetter } from "react-big-calendar";
import { props } from "./props";
import "./index.css";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import utils from "./utils";
import AppointmentEvent from "../appointmentEvent/AppointmentEvent";
import { EventItem} from "./types";
import { useMemo, useEffect } from "react";
export const WORK_START_TIME = 9;
export const WORK_END_TIME = 19;

interface DailyScheduleProps {
  day: Date;
}
export default function DailySchedule({day}:DailyScheduleProps) {
  const min = utils.setTime(day, WORK_START_TIME);
  const max = utils.setTime(day, WORK_END_TIME);
  
  const components: Components<EventItem>  =useMemo(()=>({
    event: ({ event }: { event: EventItem }) => {
      const data = event?.data;
      if (data?.appointment)
        return <AppointmentEvent appointment={data?.appointment} />;
      return null;
    },
    }),[]);
  
  useEffect(()=>{//Add id to calendar slots and columns to apply custom styling
    utils.addIdtoColumn();
    utils.addIdtoSlot();
  },[])
  
  const resources = [//WorkingHours format: day of the week: array of slot numbers
    { id: 1, title: "Dr Alex", WorkingHours:{1:[1,2,3,4,5,6,7,8], 2:[7,8,9,10,11,12]}},
    { id: 2, title: "Dr John", WorkingHours:{3:[1,2,3,4,5,6,7,8], 4:[7,8,9,10,11,12]}},
    { id: 3, title: "Dr Chan", WorkingHours:{4:[1,2,3,4,5,6,7,8], 5:[7,8,9,10,11,12]}},
    { id: 4, title: "Dr Wong", WorkingHours:{6:[1,2,3,4,5,6,7,8], 7:[7,8,9,10,11,12]}},
  ];

  function highlightWorkingTimeSlots():void{

  }


  return (
    <>
      
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