import { PaymentDisplay } from "@/components/orders/PaymentDisplay";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <PaymentDisplay />
            <hr className="my-5" />
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
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
                  <p className="text-right">${product.price} x 3</p>
                  <p className="sm:col-span-2 font-bold">
                    Subtotal: ${product.price * 3}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Shipping address</h2>

            <div className="mb-10">
              <p className="text-xl">Juan Cruz Medina</p>
              <p>San José, Costa Rica</p>
              <p>123 Main St, Apt 4B</p>
              <p>Postal Code: 12345</p>
              <p>Email: juan.cruz@example.com</p>
              <p>Phone: +506 1234 5678</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>Number of products</span>
              <span className="text-right">3 articles</span>
              <span>Subtotal</span>
              <span className="text-right">$99.99</span>
              <span>Taxes</span>
              <span className="text-right">$9.99</span>
              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$109.98</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <PaymentDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
