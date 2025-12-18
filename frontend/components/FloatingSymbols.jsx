"use client";

import { FaBalanceScale, FaGavel, FaBook, FaScroll, FaLandmark } from "react-icons/fa";

export default function FloatingSymbols() {
    const symbols = [
        { Icon: FaBalanceScale, top: '15%', left: '8%', size: 'w-8 h-8', delay: '0s', duration: '4s' },
        { Icon: FaGavel, top: '25%', right: '10%', size: 'w-6 h-6', delay: '1s', duration: '5s' },
        { Icon: FaBook, top: '45%', left: '5%', size: 'w-7 h-7', delay: '2s', duration: '4.5s' },
        { Icon: FaScroll, top: '60%', right: '7%', size: 'w-6 h-6', delay: '0.5s', duration: '5.5s' },
        { Icon: FaLandmark, top: '75%', left: '9%', size: 'w-8 h-8', delay: '1.5s', duration: '4s' },
        { Icon: FaBalanceScale, top: '35%', right: '5%', size: 'w-5 h-5', delay: '2.5s', duration: '5s' },
        { Icon: FaBook, top: '85%', right: '8%', size: 'w-7 h-7', delay: '0s', duration: '4.5s' },
        { Icon: FaGavel, top: '10%', left: '6%', size: 'w-5 h-5', delay: '3s', duration: '5s' },
    ];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
            {symbols.map((symbol, index) => (
                <div
                    key={index}
                    className={`absolute ${symbol.size} text-[#b8935e] opacity-20`}
                    style={{
                        top: symbol.top,
                        left: symbol.left,
                        right: symbol.right,
                        animation: `floatSymbol ${symbol.duration} ease-in-out infinite`,
                        animationDelay: symbol.delay,
                    }}
                >
                    <symbol.Icon className="w-full h-full" />
                </div>
            ))}

            <style jsx>{`
        @keyframes floatSymbol {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.15;
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-8px) rotate(-3deg);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-20px) rotate(3deg);
            opacity: 0.25;
          }
        }
      `}</style>
        </div>
    );
}
