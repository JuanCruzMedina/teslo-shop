import { getCountries } from "@/actions/country/get-countries";
import { Title } from "@/components/ui/title/Title";
import { Country } from "@/interfaces/country.interface";
import { AddressForm } from "./ui/AddressForm";

export default async function AddressPage() {
  const countries: Country[] = await getCountries();
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Address" subtitle="Delivery Address" />
        <AddressForm countries={countries} />
      </div>
    </div>
  );
}
