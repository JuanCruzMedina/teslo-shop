"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PaypalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending)
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 mt-3 bg-gray-300 rounded"></div>
      </div>
    );
  return <PayPalButtons />;
};
