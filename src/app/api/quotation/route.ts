import { Product, Price, Prescription, Quotation, QuotationProduct } from '@/types/types'

const getProductDetails = async (externalId: string): Promise<Product[]> => {
  let response = await fetch(`https://staging.buhochile.com/products/semantikos/${externalId}`);
  let products: Product[] = await response.json();

  // Si se encontraron productos y el semantikosMcId es diferente al externalId proporcionado, es posible que se 
  // buscara por producto y no por principio activo por lo que se busca nuevamente por semantikosMcId que corresponde al medicamento
  if (products.length > 0 && products[0].semantikosMcId && products[0].semantikosMcId !== externalId) {
    response = await fetch(`https://staging.buhochile.com/products/semantikos/${products[0].semantikosMcId}`);
    products = await response.json();
  }

  return products;
};

const getProductPrices = async (productId: string, requiredQuantity: number, tabletsPerBox: number): Promise<Price[]> => {
  const response = await fetch(`https://staging.buhochile.com/products/${productId}/prices`);
  const data = await response.json();
  const prices: Price[] = data;

  // Calcula el número de cajas requeridas basándose en la cantidad necesaria y las tabletas por caja
  const requiredBoxes = Math.ceil(requiredQuantity / tabletsPerBox);

  // Filtra los precios para incluir solo aquellos con stock suficiente
  return prices.filter(price => price.stock >= requiredBoxes);
};

// Función para calcular la cantidad total de tabletas necesarias para un tratamiento
const calculateTabletsQuantity = (unitsPerDay: number, duration: number, unit: 'day' | 'week' | 'month'): number => {
  const days = unit === 'day' ? duration : unit === 'week' ? duration * 7 : duration * 30;
  return Math.ceil(unitsPerDay * days);
};

const generateQuotation = async (prescription: Prescription): Promise<Quotation> => {
  let totalMinPrice = 0;
  const products: QuotationProduct[] = [];

  // Se obtienen los detalles de los productos para cada ítem de la prescripción de manera concurrente
  const productDetailsPromises = prescription.prescriptionItems.map(item => getProductDetails(item.externalId));
  const productDetailsList = await Promise.all(productDetailsPromises);

  // se genera la cotización para cada item de la prescripción
  for (let i = 0; i < prescription.prescriptionItems.length; i++) {
    const item = prescription.prescriptionItems[i];
    const productList = productDetailsList[i];

    // Se ordenan los productos por precio por tableta y se selecciona el más barato
    const sortedProducts = productList.sort((a, b) => (a.minPrice / a.tablets) - (b.minPrice / b.tablets));
    const cheapestProduct = sortedProducts[0];

    // Se calcula la cantidad de tabletas necesarias y la cantidad de productos a comprar
    const tabletsQuantity = calculateTabletsQuantity(item.unitsPerDay, item.treatmentDuration, item.treatmentDurationUnit);
    const productQuantity = Math.ceil(tabletsQuantity / cheapestProduct.tablets);

    // Se obtienen los precios de los productos y se calcula el precio total
    const prices = await getProductPrices(cheapestProduct.id, productQuantity, cheapestProduct.tablets);
    const cheapestPrice = Math.min(...prices.map(p => p.price));

    const selectedProduct = {
      id: cheapestProduct.id,
      externalId: item.externalId,
      name: cheapestProduct.name,
      minPrice: cheapestPrice,
      tablets: cheapestProduct.tablets,
      pharmaceuticForm: cheapestProduct.pharmaceuticForm,
      activePrinciple: cheapestProduct.activePrinciple,
      concentration: cheapestProduct.concentration,
      lab: cheapestProduct.lab ?? 'pillsLab',
      image: cheapestProduct.image ?? null,
    };

    const alternatives = sortedProducts.slice(1, 3).map(product => ({
      id: product.id,
      externalId: product.externalId,
      name: product.name,
      concentration: product.concentration,
      minPrice: product.minPrice,
      tablets: product.tablets,
      pharmaceuticForm: product.pharmaceuticForm,
      activePrinciple: product.activePrinciple,
      lab: product.lab ?? 'AltLab',
      image: product.image ?? null
    }));

    products.push({
      prescription: item,
      selectedProduct,
      productQuantity,
      totalPrice: cheapestPrice * productQuantity,
      alternatives,
    });

    totalMinPrice += cheapestPrice * productQuantity;
  }

  return {
    patient: prescription.name,
    minPrice: totalMinPrice,
    productQuantity: products.length,
    products,
  };
};



export async function POST(req: Request) {
  const { name, address, prescription } = await req.json();

  const prescriptionData: Prescription = {
    name,
    address,
    prescriptionItems: prescription
  }

  const quotation = await generateQuotation(prescriptionData);
  return Response.json(quotation)
}


//desde aca solo sirve para mostrar como mock la api desde el navegador
const tytoResponse: Prescription = {
  name: "Leonidas Mosby",
  address: {
    address1: "150 W. 85th Street",
    region: "Manhattan",
    commune: "New York City"
  },
  prescriptionItems: [
    {
      externalId: "859311000167104",
      productName: "Dirtop 100 Mg",
      pharmaceuticForm: "Comprimido Recubierto",
      concentration: "100 mg",
      unitsPerDay: 1,
      treatmentDurationUnit: "week",
      treatmentDuration: 4
    },
    {
      externalId: "684201000167107",
      productName: "Ibuprofeno 400 mg",
      pharmaceuticForm: "Cápsula",
      concentration: "400 mg",
      unitsPerDay: 2,
      treatmentDurationUnit: "month",
      treatmentDuration: 1
    },
    {
      externalId: "686341000167108",
      productName: "Paracetamol 500 Mg",
      pharmaceuticForm: "Comprimido",
      concentration: "500 mg",
      unitsPerDay: 4,
      treatmentDurationUnit: "day",
      treatmentDuration: 20
    }
  ]
}

export async function GET() {
  const quotation = await generateQuotation(tytoResponse);
  return Response.json(quotation)
}