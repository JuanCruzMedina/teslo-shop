import { titleFont } from "@/config/fonts";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`${className} mt-3`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
      >
        {title}
      </h1>
      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
};
