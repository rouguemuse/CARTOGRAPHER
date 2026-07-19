import React from 'react';
import Header from '../components/Header';
import DearRedForm from '../components/DearRedForm';

export default function DearRed() {
  return (
    <div className="min-h-screen bg-[#1c1917] text-[#E6DCC3]">
      <Header />
      <main className="container pt-32 pb-16 flex justify-center">
        <DearRedForm />
      </main>
    </div>
  );
}
