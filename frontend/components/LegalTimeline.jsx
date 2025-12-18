"use client";

import { FaKeyboard, FaSearch, FaBrain, FaFileAlt } from "react-icons/fa";

export default function LegalTimeline() {
    const steps = [
        {
            Icon: FaKeyboard,
            label: "Input"
        },
        {
            Icon: FaSearch,
            label: "Retrieval"
        },
        {
            Icon: FaBrain,
            label: "RAG Explanation"
        },
        {
            Icon: FaFileAlt,
            label: "Output"
        }
    ];

    return (
        <div className="w-[220px] bg-white border-[3px] border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-4">
            {/* Header */}
            <h3 className="text-base font-black text-[#323232] mb-4 text-center leading-tight">
                Legal Timeline / Process
            </h3>

            {/* Timeline Steps */}
            <div className="flex flex-col items-center">
                {steps.map((step, index) => (
                    <div key={index} className="w-full">
                        {/* Step Row */}
                        <div className="flex items-center gap-3">
                            {/* Icon Box */}
                            <div className="flex-shrink-0 w-11 h-11 bg-[#d8b88e] border-2 border-[#323232] rounded-lg flex items-center justify-center text-[#323232]">
                                <step.Icon className="w-5 h-5" />
                            </div>

                            {/* Arrow and Label */}
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-[#323232] font-bold text-lg">→</span>
                                <span className="text-sm font-bold text-[#323232] leading-tight">
                                    {step.label}
                                </span>
                            </div>
                        </div>

                        {/* Vertical Connector (except for last item) */}
                        {index < steps.length - 1 && (
                            <div className="ml-5 my-1.5 flex items-center">
                                <div className="w-0.5 h-5 bg-[#323232]"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
