import { Product } from "@/types/types";
import { Currency } from "@/utils";

interface ProductCardProps {
  product: Product;
  higlighted?: boolean;
}

export default function ProductCard({ product, higlighted }: ProductCardProps) {
  const placeholderImage = "/product-placeholder.webp";

  return (
    <article className={`rounded hover:shadow-xl hover:transform hover:scale-105 duration-300`}>
      <a href="#">
        <div className="relative flex items-end overflow-hidden rounded">
          {higlighted && (
            <div className="absolute top-2 right-0 bg-pink-600 text-white rounded-bl-lg rounded-tl-lg p-1.5 text-sm font-bold">
              Mejor Precio
            </div>
          )}
          <img src={product.image ?? placeholderImage} alt={product.name} />
        </div>
        <div className="mt-1 p-3">
          <h2 className="text-xl text-slate-700 font-bold">{product.name}</h2>
          <p className="mt-1 font-bold text-slate-600">{product.lab}</p>
          <p className="mt-1 text-slate-600">{product.activePrinciple} {product.concentration}</p>
          <p className="mt-1 text-slate-600">{product.tablets} {product.pharmaceuticForm} por caja</p>
          <div className="mt-3 text-end">
            <p className={`text-2xl font-bold ${higlighted ? 'text-pink-600' : 'text-blue-800'}`}>{Currency.format(product.minPrice)}</p>
          </div>
        </div>
      </a>
    </article>
  );
}