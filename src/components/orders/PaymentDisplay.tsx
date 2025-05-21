import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";

interface PaymentDisplayProps {
  orderIsPaid: boolean;
}

export const PaymentDisplay = ({ orderIsPaid }: PaymentDisplayProps) => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": !orderIsPaid,
          "bg-green-700": orderIsPaid,
        }
      )}
    >
      <IoCartOutline size={30} />
      {orderIsPaid ? (
        <span className="mx-2 font-bold">Paid</span>
      ) : (
        <span className="mx-2">Pending payment</span>
      )}
    </div>
  );
};
