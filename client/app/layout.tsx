import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Desaparecio.com | Búsqueda, investigación y reencuentro",description:"Historias de personas y mascotas desaparecidas. Sigue nuestras búsquedas, avances y reportes de transparencia.",openGraph:{title:"Desaparecio.com",description:"Búsquedas reales, avances documentados y transparencia.",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
