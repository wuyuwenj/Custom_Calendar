import {SlotPropGetter} from "react-big-calendar";
import {WORK_START_TIME,WORK_END_TIME} from "./resource";

//set time to timeStr's time of the same date as date
function setTime(date:Date, timeInMilitary:number): Date{
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), timeInMilitary, 0, 0, 0); 
  }

//get all events from google cal of the day
function getEventsFromGoogleCal(day){
  
}

function GetterSlot():SlotPropGetter {
  const slotPropGetter =
    
    (date:Date) => ({
      className: 'slotDefault',
      ...(date.getHours() > 9 && date.getHours() < 12 &&{
        style: {
          backgroundColor: 'powderblue',
          color: 'black',
        },
      }),
      
    })
    return slotPropGetter;
}
function addIdtoColumn(): void{
    const columns:NodeListOf<Element> = document.querySelectorAll(".rbc-time-column")
    for(var i = 0; i < columns.length; i++){
      columns[i].id = "res"+i;
    }
  }
function addIdtoSlot(): void{
     const dayslots:NodeListOf<Element> = document.querySelectorAll(".rbc-time-slot")
      for(var j = 0; j < dayslots.length; j++){
        const slotnum = j%((WORK_END_TIME - WORK_START_TIME)*2);
        const resnum = Math.floor(j/((WORK_END_TIME - WORK_START_TIME)*2));
        dayslots[j].id = "slotnum"+slotnum+"res"+resnum
      }
  }


export default {setTime, getEventsFromGoogleCal, GetterSlot, addIdtoColumn, addIdtoSlot}