import calendar from "@/assets/images/img-calendar.png";

export default function NoScheduledVisits() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div>
        <img src={calendar} alt="" />
      </div>

      <div className="flex flex-col items-center justify-center gap-1">
        <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary">
          No Scheduled Visit
        </p>
        <p className="text-[12px] leading-4 text-text-secondary">
          Once your agent schedules a visit, it will appear here.
        </p>
      </div>
    </div>
  );
}
