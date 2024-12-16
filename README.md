## Desafío Búho Front

Demo: [https://buho-front.vercel.app/](https://buho-front.vercel.app/)
Demo API: [https://buho-front.vercel.app/api/quotation](https://buho-front.vercel.app/api/quotation)

### Objetivo

Dada una prescripción médica en formato JSON, se debe crear una aplicación web que permita visualizar la información de la prescripción y permita al usuario ver la cotización con el menor precio posible.
  

```bash

npm install

npm run  dev

```

Abre [http://localhost:3000](http://localhost:3000) para ver el sitio.

### Observaciones

- Se utilizó Next.js para el desarrollo de la aplicación.
- Se utilizó TailwindCSS para el diseño de la aplicación.
- Se reutilizó él endponit desarrollado para el desafío backend de la prescripción médica para la cotización de los medicamentos, modificando la estructura de la respuesta según la necesidad de la aplicación.
- Por comodidad para el desafío se simuló una API dentro del mismo proyecto por lo que se utilizan Hooke para hacer el fetch, ya que no se encuentra disponible durante el proceso de pre-rendering, en un contexto real con una API correctamente desarrollada probablemente no se utilizaría este método
