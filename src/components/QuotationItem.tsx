import { QuotationProduct } from "@/types/types";
import ProductCard from "@/components/ProductCard";
import { Currency } from "@/utils";

interface QuotationItemProps {
  item: QuotationProduct;
}

const time = (duration: number, unit: 'day' | 'week' | 'month') => {
  const units: { [key in 'day' | 'week' | 'month']: [string, string] } = {
    day: ['día', 'días'],
    week: ['semana', 'semanas'],
    month: ['mes', 'meses'],
  };
  const [singular, plural] = units[unit];
  return `${duration} ${duration == 1 ? singular : plural}`;
};

export default function QuotationItem({ item }: QuotationItemProps) {
  return (
    <article className="max-w-6xl mb-8 mx-auto bg-white shadow-lg py-6">
      <section className="px-7 pb-5">
        <div className="flex justify-between gap-10">
          <div>
            <h3 className="text-lg text-blue-900">Medicamento indicado:</h3>
            <p className="text-gray-800 font-bold">{item.prescription.productName}</p>
          </div>
          <div>
            <h3 className="text-lg text-blue-900">Duración del tratamiento:</h3>
            <p className="text-gray-800 font-bold">
              {item.prescription.unitsPerDay} pastillas al día durante {time(item.prescription.treatmentDuration, item.prescription.treatmentDurationUnit)}
            </p>
          </div>
          <div>
            <h3 className="text-lg text-blue-900">Cajas necesarias:</h3>
            <p className="text-gray-800 text-right font-bold">{item.productQuantity}</p>
          </div>
          <div>
            <h3 className="text-lg text-blue-900">Costo total del producto:</h3>
            <p className="text-gray-800 text-right font-bold">{Currency.format(item.totalPrice)}</p>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3">
        <div>
        <p className="text-lg font-bold py-4 text-blue-900">Selección de Búho</p>
        <ProductCard product={item.selectedProduct} higlighted />
        </div>
        <div className="col-span-2">
        <p className="text-lg font-bold py-4 text-blue-900">Otras opciones</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {item.alternatives.map((alternative, index) => (
            <ProductCard key={index} product={alternative} />
          ))}
        </div>
        </div>
      </div>
    </article>
  );
}