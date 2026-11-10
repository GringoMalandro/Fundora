"use client";
import {useState} from "react";
import {Check, Copy} from "lucide-react";

export default function CopyPayment({value,english=false}:{value:string;english?:boolean}){
 const [copied,setCopied]=useState(false);
 async function copy(){
  try{
   await navigator.clipboard.writeText(value);
   setCopied(true);
  }catch{
   setCopied(false);
   window.prompt(english?"Copy this value:":"Copia este dato:",value);
  }
 }
 return <button type="button" onClick={copy} aria-label={english?`Copy ${value}`:`Copiar ${value}`} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-teal-700 bg-white px-3 py-1.5 text-xs font-bold text-teal-800 transition hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">{copied?<Check size={14}/>:<Copy size={14}/>} {copied?(english?"Copied!":"¡Copiado!"):(english?"Copy":"Copiar")}</button>;
}
