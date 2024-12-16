export default function Header() {
  return (
    <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-blue-950 py-2.5 px-6 sm:px-4">
      <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
        <a href="#" className="flex items-center">
        <img alt="Logo de Búho Chile, plataforma de medicamentos a domicilio." loading="lazy" width="110" height="40" decoding="async" data-nimg="1" className="cursor-pointer self-center" src="https://www.buhochile.com/buho-header-logo.svg" style={{ color: 'transparent' }}/>
         </a>
      </div>
    </nav>
  );
}