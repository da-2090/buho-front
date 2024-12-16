import Header from "@/components/Header";
import QuotationItem from "@/components/QuotationItem";
import Footer from "@/components/Footer";
import {Currency} from "@/utils";


export default async function Home() {

  const prescriptionData = await fetch(`http://localhost:3000/api/prescription`)
  const prescription = await prescriptionData.json()  
  const quotationData = await fetch(`http://localhost:3000/api/quotation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prescription)
  })
  const quotationItems = await quotationData.json()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-32 flex-grow">
        <h1 className="text-center text-2xl font-bold mb-12 text-gray-800">Cotización de tu receta medica</h1>
        <div className="mx-auto max-w-6xl px-6 py-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="mt-2 font-semibold text-gray-600">Nombre: {prescription.name}</p>
              <p className="mt-1 font-semibold text-gray-600">Dirección: {prescription.address.address1}, {prescription.address.region}, {prescription.address.commune}</p>
            </div>
            <div>
              <p className="mt-2 font-semibold text-gray-600">Medicamentos por comprar: {quotationItems.productQuantity}</p>
              <p className="mt-1 font-semibold text-gray-600">Precio minimo: {Currency.format(quotationItems.minPrice)}</p>
            </div>
          </div>
        </div>
        <section className="py-10 bg-gray-100 h-full">
          {quotationItems.products.map((product: QuotationProduct, index: number) => (
            <QuotationItem key={index} item={product} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}