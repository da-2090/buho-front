"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import QuotationItem from "@/components/QuotationItem";
import Footer from "@/components/Footer";
import { Currency } from "@/utils";
import { QuotationProduct, Prescription } from "@/types/types";

export default function Home() {
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [quotationItems, setQuotationItems] = useState<{ productQuantity: number; minPrice: number; products: QuotationProduct[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescriptionResponse = await fetch(`/api/prescription`);
        const prescriptionData = await prescriptionResponse.json();
        setPrescription(prescriptionData);

        const quotationResponse = await fetch(`/api/quotation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(prescriptionData)
        });
        const quotationData = await quotationResponse.json();
        setQuotationItems(quotationData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-32 flex-grow">
        <h1 className="text-center text-2xl font-bold mb-12 text-gray-800">Cotización de tu receta médica</h1>
        {prescription && quotationItems ? (
          <>
            <div className="mx-auto max-w-6xl px-6 py-3">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mt-2 font-semibold text-gray-600">Nombre: {prescription.name}</p>
                  <p className="mt-1 font-semibold text-gray-600">
                    Dirección: {prescription.address.address1}, {prescription.address.region}, {prescription.address.commune}
                  </p>
                </div>
                <div>
                  <p className="mt-2 font-semibold text-gray-600">Medicamentos por comprar: {quotationItems.productQuantity}</p>
                  <p className="mt-1 font-semibold text-gray-600">Precio mínimo: {Currency.format(quotationItems.minPrice)}</p>
                </div>
              </div>
            </div>
            <section className="py-10 bg-gray-100 h-full">
              {quotationItems.products.map((product: QuotationProduct, index: number) => (
                <QuotationItem key={index} item={product} />
              ))}
            </section>
          </>
        ) : (
          <p className="text-center text-gray-600">Estamos buscando los mejores precios para ti...</p>
        )}
      </main>
      <Footer />
    </div>
  );
}