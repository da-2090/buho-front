export interface Address {
  address1: string;
  region: string;
  commune: string;
}

export interface PrescriptionItem {
  externalId: string;
  productName: string;
  pharmaceuticForm: string;
  concentration: string;
  unitsPerDay: number;
  treatmentDurationUnit: 'day' | 'week' | 'month';
  treatmentDuration: number;
}

export interface Prescription {
  name: string;
  address: Address;
  prescriptionItems: PrescriptionItem[];
}

export interface Product {
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

export interface Price {
  price: number;
  stock: number;
  pharmacyId: number;
}

export interface Alternative {
  productId: string;
  productName: string;
  concentration: string;
  price: number;
};

export interface QuotationProduct {
  prescription: PrescriptionItem;
  selectedProduct: Product;
  productQuantity: number;
  totalPrice: number;
  alternatives: Product[];
};

export interface Quotation {
  patient: string;
  minPrice: number;
  productQuantity: number;
  products: QuotationProduct[];
};
