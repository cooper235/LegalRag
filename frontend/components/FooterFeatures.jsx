"use client";

import { useState } from "react";
import Modal from "./ui/Modal";

export default function FooterFeatures() {
    const [activeModal, setActiveModal] = useState(null);

    const features = [
        {
            id: "insights",
            label: "AI Legal Insights",
            title: "Latest AI Legal Insights",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
            ),
            content: (
                <div className="space-y-6">
                    <article className="border-b-2 border-dashed border-gray-300 pb-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">TRENDING</span>
                        <h3 className="font-bold text-lg mt-2 mb-1">AI in the Courtroom: A New Era?</h3>
                        <p className="text-sm text-gray-600">
                            Supreme Courts across the globe are debating the admissibility of AI-generated evidence. New guidelines suggest a "human-in-the-loop" requirement for all AI-assisted judgments.
                        </p>
                    </article>

                    <article className="border-b-2 border-dashed border-gray-300 pb-4">
                        <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded">ANALYSIS</span>
                        <h3 className="font-bold text-lg mt-2 mb-1">Predictive Justice: Handling Bias</h3>
                        <p className="text-sm text-gray-600">
                            Recent studies show RAG models reduce hallucination rates by 40% compared to standard LLMs in legal contexts, but bias in training data remains a critical hurdle.
                        </p>
                    </article>

                    <article>
                        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">REGULATION</span>
                        <h3 className="font-bold text-lg mt-2 mb-1">The EU AI Act & Legal Tech</h3>
                        <p className="text-sm text-gray-600">
                            Compliance deadlines are approaching for high-risk legal AI systems. What your firm needs to know about transparency requirements.
                        </p>
                    </article>
                </div>
            )
        },
        {
            id: "judgments",
            label: "Recent Judgments",
            title: "Recent Notable Judgments",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.994 5.994 0 01-5.968-5.968zm0 0l-2.62 10.726c-.122.499.106 1.028.589 1.202a5.989 5.989 0 002.031.352 5.994 5.994 0 005.968-5.968z" />
                </svg>
            ),
            content: (
                <div className="space-y-4">
                    <div className="bg-[#fdf6e7] p-4 rounded border border-[#b8935e]">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-[#b8935e]">Doe v. Social Media Giant</h4>
                                <p className="text-secondary text-xs font-bold">Privacy Rights | Decided: Yesterday</p>
                            </div>
                            <span className="text-2xl">⚖️</span>
                        </div>
                        <p className="text-sm mt-2">
                            <strong>Verdict:</strong> Plaintiff Awarded Damages.<br />
                            <strong>Summary:</strong> Court ruled that platform algorithms must disclose targeted ad parameters. A landmark win for data privacy advocates.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded border border-gray-300">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-[#323232]">Estate of H. v. CryptoExchange</h4>
                                <p className="text-secondary text-xs font-bold">Financial Reg | Decided: 2 Days Ago</p>
                            </div>
                            <span className="text-2xl">📉</span>
                        </div>
                        <p className="text-sm mt-2">
                            <strong>Verdict:</strong> Case Dismissed.<br />
                            <strong>Summary:</strong> Judge ruled that digital assets were not securities under the specific context of the initial offering, citing lack of investment contract.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 mt-8 sm:mt-16 px-4">
                {features.map((feature) => {
                    const bgColor = feature.id === 'insights' ? '#d8b88e' : '#7a5f42';
                    const textColor = feature.id === 'insights' ? '#323232' : '#ffffff';

                    return (
                        <button
                            key={feature.id}
                            onClick={() => setActiveModal(feature.id)}
                            className="flex-1 max-w-[380px] min-h-[110px] flex items-center justify-center gap-5 px-8 py-6 rounded-2xl shadow-[6px_6px_0px_#323232] border-[4px] border-[#323232] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_#323232] active:translate-y-[2px] active:shadow-[2px_2px_0px_#323232] transition-all group"
                            style={{ backgroundColor: bgColor, color: textColor }}
                        >
                            <span className="transition-transform group-hover:scale-110 [&>svg]:w-9 [&>svg]:h-9">
                                {feature.icon}
                            </span>
                            <span className="text-lg sm:text-xl font-black uppercase tracking-tight">{feature.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Modals */}
            {features.map((feature) => (
                <Modal
                    key={feature.id}
                    isOpen={activeModal === feature.id}
                    onClose={() => setActiveModal(null)}
                    title={feature.title}
                >
                    {feature.content}
                </Modal>
            ))}
        </>
    );
}
