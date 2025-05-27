import { getOrderById } from "@/actions/order/get-order-by-id";
import { PaymentDisplay } from "@/components/orders/PaymentDisplay";
import { PaypalButton } from "@/components/paypal/PaypalButtons";
import { Title } from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils/currencyFormat";

import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = await params;

  const getOrderResponse = await getOrderById(id);
  console.log(getOrderResponse);
  if (!getOrderResponse.ok) {
    redirect("/");
  }
  const { order } = getOrderResponse;
  const address = order!.OrderAddress;

  console.log(address);
  console.log(order);

  const productsInCart = order?.OrderItem.map((item) => ({
    title: item.product.title,
    price: item.price,
    size: item.size,
    quantity: item.quantity,
    images: item.product.images.map((image) => image.url),
    slug: item.product.slug,
  }));

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <PaymentDisplay orderIsPaid={order!.isPaid} />
            <hr className="my-5" />
            {productsInCart?.map((product) => (
              <div
                key={`${product.slug}-${product.size}`}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 w-full">
                  <p className="sm:col-span-3 text-md">{product.title}</p>
                  <p className="text-right">
                    ${product.price} x {product.quantity}
                  </p>
                  <p className="sm:col-span-2 font-bold">
                    Subtotal: ${product.price * product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Shipping address</h2>

            <div className="mb-10">
              <p className="text-xl">
                {address?.firstName} {address?.lastName}
              </p>
              <p>
                {address?.address} {address?.address2}
              </p>
              <p>
                {address?.country.name}, {address?.city}
              </p>
              <p>Postal Code: {address?.postalCode}</p>
              <p>Phone: {address?.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>Number of products</span>
              <span className="text-right">{order?.itemsInOrder} articles</span>
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>
              <span>Taxes</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <PaymentDisplay orderIsPaid={order!.isPaid} />
              ) : (
                <div className="relative z-0">
                  <PaypalButton orderId={order!.id} amount={order!.total} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
