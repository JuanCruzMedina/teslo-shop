"use client";

import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js/types/components/buttons";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending)
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 mt-3 bg-gray-300 rounded"></div>
      </div>
    );
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: roundedAmount.toString(),
          },
        },
      ],
      intent: "CAPTURE",
    });

    const saveTransactionId = await setTransactionId(orderId, transactionId);
    if (!saveTransactionId.ok) {
      throw new Error("Error saving transaction ID");
    }

    return transactionId;
  };
  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details) {
      return;
    }
    await paypalCheckPayment(details.id!);

    console.log("Payment completed successfully:", details);
  };
  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
