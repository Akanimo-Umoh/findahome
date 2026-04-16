// import addIcon from "@/assets/agentImages/icon-add-property.svg";
// import createAdIcon from "@/assets/agentImages/icon-create-ad.svg";
// import transactionsIcon from "@/assets/agentImages/icon-transactions.svg";
// import messageIcon from "@/assets/agentImages/icon-messages.svg";

// export default function QuickActions() {
//   return (
//     <div className="mx-6">
//       <p>Quick Actions</p>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex flex-col gap-2 p-1 items-center justify-center">
//           <div className="bg-success p-2 rounded-lg w-10 h-10">
//             <img src={addIcon} alt="" />
//           </div>

//           <p className="text-[12px] leading-4">Add Property</p>
//         </div>

//         <div className="flex flex-col gap-2 p-1 items-center justify-center">
//           <div className="bg-warning p-2 rounded-lg w-10 h-10">
//             <img src={createAdIcon} alt="" />
//           </div>

//           <p className="text-[12px] leading-4">Create Ad</p>
//         </div>

//         <div className="flex flex-col gap-2 p-1 items-center justify-center">
//           <div className="bg-button-bg p-2 rounded-lg w-10 h-10">
//             <img src={transactionsIcon} alt="" />
//           </div>

//           <p className="text-[12px] leading-4">Transactions</p>
//         </div>

//         <div className="flex flex-col gap-2 p-1 items-center justify-center">
//           <div className="bg-error p-2 rounded-lg w-10 h-10">
//             <img src={messageIcon} alt="" />
//           </div>

//           <p className="text-[12px] leading-4">Messages</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import addIcon from "@/assets/agentImages/icon-add-property.svg";
import createAdIcon from "@/assets/agentImages/icon-create-ad.svg";
import transactionsIcon from "@/assets/agentImages/icon-transactions.svg";
import messageIcon from "@/assets/agentImages/icon-messages.svg";

type Action = {
  icon: string;
  label: string;
  bg: string;
  link: string;
};

const actions: Action[] = [
  {
    icon: addIcon,
    label: "Add Property",
    bg: "bg-success",
    link: "/agent/add-property",
  },
  {
    icon: createAdIcon,
    label: "Create Ad",
    bg: "bg-warning",
    link: "/agent/create-ad",
  },
  {
    icon: transactionsIcon,
    label: "Transactions",
    bg: "bg-button-bg",
    link: "/agent/transactions",
  },
  {
    icon: messageIcon,
    label: "Messages",
    bg: "bg-error",
    link: "/agent/messages",
  },
];

export default function QuickActions() {
  return (
    <div className="mx-6">
      <p>Quick Actions</p>

      <div className="flex flex-wrap items-center justify-between mt-4">
        {actions.map((action) => (
          <Link
            to={action.link}
            key={action.link}
            className="flex flex-col gap-2 p-1 items-center justify-center transition-transform active:scale-95"
          >
            <div className={`${action.bg} p-2 rounded-lg w-10 h-10`}>
              <img src={action.icon} alt={action.label} />
            </div>

            <p className="text-[12px] leading-4 text-center whitespace-nowrap">
              {action.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
