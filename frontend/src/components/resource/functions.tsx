//set time to timeStr's time of the same date as date
export default function setTime(date:Date, timeStr:String): Date{
    const timeParts = timeStr.match(/(\d+):?(\d*)\s*(AM|PM)?/i);

  if (!timeParts) throw new Error("Invalid time format");

  let hours = parseInt(timeParts[1], 10);
  const minutes = timeParts[2] ? parseInt(timeParts[2], 10) : 0;
  const isPM = timeParts[3]?.toUpperCase() === "PM";

  if (isPM && hours !== 12) hours += 12; // Convert PM to 24-hour format
  if (!isPM && hours === 12) hours = 0;  // Convert 12 AM to 0

  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0); 
  }