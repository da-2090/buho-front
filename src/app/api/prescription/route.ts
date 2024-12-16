export async function GET() {
  return Response.json( {
    name: "Leonidas Mosby",
    address: {
      address1: "150 W. 85th Street",
      region: "Manhattan",
      commune: "New York City"
    },
    prescription: [
      {
        externalId: "859311000167104",
        productName: "Dirtop 100 Mg",
        pharmaceuticForm: "Comprimido Recubierto",
        concentration: "100 mg",
        unitsPerDay: "1",
        treatmentDurationUnit: "week",
        treatmentDuration: "4"
      },
      {
        externalId: "684201000167107",
        productName: "Ibuprofeno 400 mg",
        pharmaceuticForm: "Cápsula",
        concentration: "400 mg",
        unitsPerDay: "2",
        treatmentDurationUnit: "month",
        treatmentDuration: "1"
      },
      {
        externalId: "686341000167108",
        productName: "Paracetamol 500 Mg",
        pharmaceuticForm: "Comprimido",
        concentration: "500 mg",
        unitsPerDay: "4",
        treatmentDurationUnit: "day",
        treatmentDuration: "20"
      }
    ]
  });
}