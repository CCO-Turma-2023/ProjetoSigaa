'use client'
import Image from "next/image";
import logo from "../assets/logo.png"
import "../app/globals.css"
import Link from "next/link";
import { useState } from "react";



export default function Header({ selecionado }: { selecionado: string }) {
    return (
        <header className="allfont list-none bg-[rgb(0,17,61)] flex flex-row justify-between p-[1.5rem] text-white text-[1.8rem] items-center">

            <Image src={logo} alt="Logo Unifei" width={200}/>

            <ul className="flex gap-6">
                <li className={`hover:text-blue-700  ${selecionado === "home" && "text-blue-700"}`}><Link href="/" >Home</Link></li>
                <li className={`hover:text-blue-700  ${selecionado === "sobre" && "text-blue-700"}`}><Link href="/sobre">Sobre</Link></li>
                <li className={`hover:text-blue-700 `}><a target="_blank" href="https://unifei.edu.br/">Unifei</a></li>
            </ul>
        </header>
    );
}