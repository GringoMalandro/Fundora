import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
export const metadata:Metadata={title:"Desaparecio.com | Búsqueda, investigación y reencuentro",description:"Historias de personas y mascotas desaparecidas. Sigue nuestras búsquedas, avances y reportes de transparencia.",openGraph:{title:"Desaparecio.com",description:"Búsquedas reales, avances documentados y transparencia.",type:"website"},icons:{icon:"/icon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><head><meta name="impact-site-verification" value="5619fe99-649f-4204-a970-d0446b27856f" /></head><body><Providers>{children}</Providers></body></html>}
