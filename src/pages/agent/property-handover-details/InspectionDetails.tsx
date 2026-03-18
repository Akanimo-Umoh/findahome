import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg";
import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg";
import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg";

export default function InspectionDetails() {
  const indpectionDetails = [
    {
      icon: blueCalendarIcon,
      title: "Date",
      detail: "14th Nov, 2025",
    },
    {
      icon: timeIcon,
      title: "Time",
      detail: "10:00am",
    },
    {
      icon: locationIcon,
      title: "Location",
      detail: "Lekki Toll Gate",
    },
  ];

  return (
    <div>
      {/* inspection details */}
      <div className="mt-6">
        {/* now, the p tag below shows depending on what transaction details the user is opening */}
        <p>Schedule Details</p>

        <div className="mt-2 space-y-2">
          {indpectionDetails.map((inspectionDetail, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-7.5 h-7.5 rounded-full bg-bg-accent flex items-center justify-center">
                <img src={inspectionDetail.icon} alt="" />
              </div>

              <div>
                <p className="text-[12px] leading-4 text-text-secondary">
                  {inspectionDetail.title}
                </p>
                <p className="text-[14px]">{inspectionDetail.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
