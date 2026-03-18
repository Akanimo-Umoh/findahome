import { useNavigate } from "react-router-dom";
import blueNaira from "@/assets/images/icon-naira.svg";
import propertyImg from "@/assets/images/property.jpg";
import goBack from "@/assets/images/icon-back.svg";
import iconNotification from "@/assets/images/icon-notification.svg";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import greyNaira from "@/assets/images/icon-chat-naira.svg";
import blackNaira from "@/assets/images/icon-black-naira.svg";
import greyInfo from "@/assets/images/icon-grey-info.svg";
import downloadIcon from "@/assets/images/icon-download.svg";
import cancelIcon from "@/assets/images/icon-cancel-payment.svg";
// import PropertyPaymentSuccessful from "./PropertyPaymentSuccessful";

export default function PropertyPayment() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Property Payment
        </p>

        <div className="flex items-center justify-center gap-4 absolute right-0">
          <button>
            <img src={iconNotification} alt="notifications" />
          </button>
        </div>
      </div>

      {/* property details */}
      <div className="mt-4 flex items-center rounded-xl gap-2 border border-bg-accent p-2">
        <img
          src={propertyImg}
          alt=""
          className="w-15 h-15 rounded-lg object-cover"
        />

        <div className="flex flex-col justify-center">
          <p className="font-raleway font-semibold text-[14px] tracking-[1px] line-clamp-2">
            Luxury 4 Bed-room Apartment
          </p>
          <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
            Lekki Phase 1, Lagos.
          </p>
          <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg flex items-center">
            <img src={blueNaira} alt="" className="w-4 h-4" />
            <span>3M/yr</span>
          </p>
        </div>
      </div>

      {/* agent details */}
      <div className="flex items-center gap-2 mt-2">
        <img
          src={agentAvatar}
          alt=""
          className="w-7.5 h-7.5 object-cover rounded-full"
        />

        <div>
          <p className="text-[12px] font-semibold">Maryann Kikomu</p>
          <p className="text-[12px] leading-4">Verified Agent</p>
        </div>
      </div>

      {/* payment breakdown */}
      <div className="rounded-xl border border-bg-accent p-2 flex flex-col gap-2 mt-6.5">
        <p>Payment Breakdown</p>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            {/* property cost */}
            <p className="text-[12px] leading-4 text-text-secondary">
              Property Cost
            </p>
            <p className="text-[12px] leading-4 text-text-secondary flex items-center">
              <img src={greyNaira} alt="" />
              <span>3M/yr</span>
            </p>
          </div>

          {/* escrow fee */}
          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4 text-text-secondary">
              <span>Escrow fee</span>
              <img src={greyInfo} alt="" />
            </p>
            <p className="text-[12px] leading-4 text-text-secondary flex items-center">
              <img src={greyNaira} alt="" />
              <span>60,000</span>
            </p>
          </div>

          {/* total */}
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold tracking-[1px]">
              Total Fee
            </p>
            <p className="text-[14px] font-raleway font-semibold tracking-[1px] flex items-center">
              <img src={blackNaira} alt="" />
              <span>3,060,000</span>
            </p>
          </div>
        </div>
      </div>

      {/* payment method */}
      <div className="mt-4 space-y-2">
        <p>Payment Method</p>

        <div className="flex flex-col">
          <label
            htmlFor="payViaEscrow"
            className="px-2 py-3 bg-bg-accent border border-button-bg rounded-xl flex gap-2 items-center"
          >
            <input
              type="radio"
              name="paymentMethod"
              id="payViaEscrow"
              className="w-5 h-5"
            />

            <p>Pay from Escrow Wallet</p>
          </label>

          <div className="text-text-secondary text-[12px] leading-4 flex items-center mt-1">
            <p>Available balance:&nbsp;</p>
            <p className="flex items-center">
              <img src={greyNaira} alt="" />
              <span>4M</span>
            </p>
          </div>

          <label
            htmlFor="fundWallet"
            className="px-2 py-3 bg-bg-accent border border-button-bg rounded-xl flex gap-2 items-center mt-2"
          >
            <input
              type="radio"
              name="paymentMethod"
              id="fundWallet"
              className="w-5 h-5"
            />

            <p>Fund Wallet</p>
          </label>
        </div>
      </div>

      {/* legal documentation */}
      <div className="mt-6.5 rounded-xl p-2 border border-bg-accent flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-black">Legal Documentation</p>

          <div className="bg-bg-accent p-2 rounded-lg flex flex-col gap-1">
            <p className="text-[14px]">Property Legal Summary</p>

            <div className="text-[12px] leading-4 text-text-secondary">
              <p>
                This property has a valid Certificate of Occupancy (C of O) and
                is free from legal encumbrances. The property title is clean and
                verified by our legal team.
              </p>

              <ul className="list-disc pl-5">
                <li>Valid Certificate of Occupancy</li>
                <li>Clean property title</li>
                <li>No outstanding liens or disputes</li>
                <li>Verified ownership documentation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" name="" id="legal" className="w-4 h-4" />

          <label
            htmlFor="legal"
            className="text-[12px] leading-4 text-text-secondary"
          >
            I have reviewed and agree to the legal terms and conditions
          </label>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <img src={downloadIcon} alt="" />
        <p className="text-[12px] leading-4 text-button-bg">
          Download Full Legal Document
        </p>
      </div>

      {/* confirm payment */}
      <div className="mt-11 flex flex-col gap-2 mb-10">
        <div className="flex flex-col gap-3">
          <button className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] bg-[#E2EEFF] rounded-lg w-full">
            Confirm and pay N3,060,000
          </button>

          <button className="h-[45px] bg-button-disabled rounded-lg border border-text-secondary w-full flex items-center justify-center text-[14px] tracking-[1px] font-raleway font-semibold">
            <img src={cancelIcon} alt="" />
            <span>Cancel Payment</span>
          </button>
        </div>

        <p className="text-[12px] leading-4 text-text-secondary text-center">
          Having issues with agent?{" "}
          <span className="text-button-bg">Open a dispute</span>
        </p>
      </div>

      {/* if the payment is successful, show this successful component */}
      {/* <PropertyPaymentSuccessful /> */}
    </div>
  );
}
