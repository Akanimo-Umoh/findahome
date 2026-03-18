import { useState, type SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PickDate() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date: SetStateAction<Date | null>) => setSelectedDate(date)}
        showTimeSelect
        timeIntervals={30}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Choose date and time"
        className="w-full h-[45px] px-4 border border-text-secondary rounded-lg outline-none"
        minDate={new Date()}
        minTime={new Date(0, 0, 0, 7, 0)}
        maxTime={new Date(0, 0, 0, 18, 0)}
        popperPlacement="bottom-start"
      />
    </div>
  );
}
