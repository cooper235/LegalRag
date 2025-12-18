"use client";

import { useState } from "react";
import { FaRobot, FaBalanceScale, FaGavel, FaBook } from "react-icons/fa";

export default function LegalGlossary() {
    const [isFlipped, setIsFlipped] = useState(false);

    const glossaryItems = [
        {
            term: "RAG",
            subtitle: "Retrieval-Augmented Generation",
            description: "AI combines retrieval with generation for accurate, contextual answers.",
            Icon: FaRobot
        },
        {
            term: "IPC",
            subtitle: "Indian Penal Code",
            description: "Primary criminal code of India defining offenses and penalties.",
            Icon: FaBalanceScale
        },
        {
            term: "Legal Precedent",
            subtitle: "Case Law",
            description: "Prior court decisions that guide future similar cases.",
            Icon: FaGavel
        }
    ];

    return (
        <div
            className="w-[220px] cursor-pointer"
            style={{ perspective: '1000px' }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div
                className="relative w-full transition-transform duration-700"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front Side */}
                <div
                    className="w-full bg-white border-[3px] border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* Header - Full Width Tan */}
                    <div className="bg-[#d8b88e] px-4 py-3 border-b-3 border-[#323232] flex items-center gap-3">
                        <FaBook className="w-6 h-6 text-[#323232]" />
                        <div>
                            <h3 className="text-base font-black text-[#323232] leading-tight">Legal Glossary</h3>
                            <p className="text-xs text-[#5a4a3a] italic">(Hover to Flip)</p>
                        </div>
                    </div>

                    {/* Front Content */}
                    <div className="p-3 space-y-2 bg-white">
                        {glossaryItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#f5f5f5] border-2 border-[#323232] rounded-lg p-3 flex items-start gap-3"
                            >
                                <div className="w-8 h-8 bg-[#d8b88e] rounded flex items-center justify-center flex-shrink-0">
                                    <item.Icon className="w-4 h-4 text-[#323232]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-[#323232]">{item.term}</h4>
                                    <p className="text-[11px] text-gray-600 leading-tight">{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className="absolute top-0 left-0 w-full bg-[#b8935e] border-[3px] border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] overflow-hidden"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    {/* Header */}
                    <div className="bg-[#8b6f47] px-4 py-3 border-b-2 border-[#323232]">
                        <h3 className="text-base font-black text-white">Definitions</h3>
                    </div>

                    {/* Back Content */}
                    <div className="p-3 space-y-2">
                        {glossaryItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white/20 rounded-lg p-3"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <item.Icon className="w-4 h-4 text-white flex-shrink-0" />
                                    <h4 className="font-bold text-sm text-white">{item.term}</h4>
                                </div>
                                <p className="text-[11px] text-white/90 leading-tight">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
