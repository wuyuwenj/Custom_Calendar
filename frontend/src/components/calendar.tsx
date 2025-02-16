import { useCalendarStore } from '../store'
import { Calendar as TimeSelect} from 'react-calendar';
import DailySchedule from './resource/resource'
import { useEffect } from 'react';
import './calendar.css'

export default function CustomCalendar(){
    const day = useCalendarStore((state)=>state.day);
    const updateDate = useCalendarStore((state) =>state.updateDate);
    useEffect(()=>{
        console.log(day,'day');
    },[day])
    return(
        
        <>
            <TimeSelect onChange={(value)=>updateDate(value as Date)} value={day} />
            <DailySchedule day={day}></DailySchedule>
        </>
    );
}