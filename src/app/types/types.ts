interface Address {
  address1: string;
  region: string;
  commune: string;
}

interface Patient {
  name: string;
  address: Address;
}

interface PrescriptionItem {
  externalId: string;
  productName: string;
  pharmaceuticForm: string;
  concentration: string;
  unitsPerDay: number;
  treatmentDurationUnit: 'day' | 'week' | 'month';
  treatmentDuration: number;
}

interface Prescription {
  name: string;
  address: Address;
  prescriptionItems: PrescriptionItem[];
}

interface Product {
  id: string;
  name: string;
  minPrice: number;
  tablets: number;
  pharmaceuticForm: string;
  activePrinciple: string;
  concentration: string;
  semantikosMcId?: string;
  lab: string;
  image: string | null;
  externalId: string;
}

interface Price {
  price: number;
  stock: number;
  pharmacyId: number;
}

interface Alternative {
  productId: string;
  productName: string;
  concentration: string;
  price: number;
};

interface QuotationProduct {
  prescription: PrescriptionItem;
  selectedProduct: Product;
  productQuantity: number;
  totalPrice: number;
  alternatives: Product[];
};

interface Quotation {
  patient: string;
  minPrice: number;
  productQuantity: number;
  products: QuotationProduct[];
};
