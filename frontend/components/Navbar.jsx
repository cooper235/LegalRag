"use client";

import { useState } from "react";
import Modal from "./ui/Modal";

export default function Navbar() {
    const [activeModal, setActiveModal] = useState(null);

    const navItems = [
        {
            id: "about",
            label: "About Us",
            title: "About Legal AI Judge",
            content: (
                <div className="space-y-4">
                    <p className="text-lg">
                        Legal AI Judge is a cutting-edge Retrieval-Augmented Generation (RAG) system designed to assist legal professionals and potential litigants in understanding case outcomes.
                    </p>
                    <div className="bg-yellow-50 p-4 rounded border-l-4 border-[#b8935e]">
                        <h4 className="font-bold mb-2">Our Mission</h4>
                        <p>To democratize access to legal understanding by providing instant, AI-powered analysis of legal scenarios based on real precedents.</p>
                    </div>
                    <p>
                        Powered by advanced Large Language Models and a vast vector database of legal judgments, our system analyzes the nuances of your case and retrieves the most relevant precedents to predict verdicts with high accuracy.
                    </p>
                </div>
            )
        },
        {
            id: "how-it-works",
            label: "How It Works",
            title: "How It Works",
            content: (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-[#b8935e] flex items-center justify-center text-white font-bold text-xl shrink-0">1</div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="font-bold text-lg">Enter Case Details</h4>
                            <p>Type your case scenario into the text box. Be as specific as possible about the events and parties involved.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-[#8b6f47] flex items-center justify-center text-white font-bold text-xl shrink-0">2</div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="font-bold text-lg">AI Analysis</h4>
                            <p>Our system embeds your text and searches our vector database for semantically similar past judgments.</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-12 h-12 rounded-full bg-[#323232] flex items-center justify-center text-white font-bold text-xl shrink-0">3</div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="font-bold text-lg">Verdict & Explanation</h4>
                            <p>You receive a predicted verdict, confidence score, and a detailed explanation citing relevant case law.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "history",
            label: "Case History",
            title: "Recent Case History",
            content: (
                <div className="space-y-4">
                    <p className="text-sm italic text-gray-500 mb-4">* Mock data for demonstration</p>

                    <div className="border border-gray-300 rounded p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold">Property Dispute: Smith v. Neighbors</h4>
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold">WON</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">Dispute over fence line encroachment in suburban area...</p>
                        <div className="text-xs text-gray-400 mt-2">Analyzed: 2 hours ago</div>
                    </div>

                    <div className="border border-gray-300 rounded p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold">Contract Breach: Tech Corp v. Vendor</h4>
                            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold">LOST</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">Failure to deliver software components by agreed deadline...</p>
                        <div className="text-xs text-gray-400 mt-2">Analyzed: 5 hours ago</div>
                    </div>

                    <div className="border border-gray-300 rounded p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold">Traffic Violation: State v. Driver</h4>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-bold">Uncertain</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">Speeding in a school zone with mitigating circumstances...</p>
                        <div className="text-xs text-gray-400 mt-2">Analyzed: 1 day ago</div>
                    </div>
                </div>
            )
        },
        {
            id: "contact",
            label: "Contact",
            title: "Contact Us",
            content: (
                <div className="space-y-4 text-center">
                    <p className="mb-6">Have questions or need technical support? Reach out to our team.</p>

                    <div className="inline-block text-left bg-gray-50 p-6 rounded-lg border-2 border-[#b8935e]">
                        <div className="mb-4">
                            <h5 className="font-bold text-[#b8935e] text-sm uppercase">General Inquiries</h5>
                            <p className="font-medium">info@legalaijudge.com</p>
                        </div>

                        <div className="mb-4">
                            <h5 className="font-bold text-[#b8935e] text-sm uppercase">Support</h5>
                            <p className="font-medium">support@legalaijudge.com</p>
                        </div>

                        <div>
                            <h5 className="font-bold text-[#b8935e] text-sm uppercase">Address</h5>
                            <p className="font-medium">123 Legal Tech Blvd, Suite 400<br />San Francisco, CA 94105</p>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <>
            <nav className="w-full max-w-4xl mx-auto mb-4 px-2 flex flex-wrap justify-center gap-2 sm:gap-3">
                {navItems.map((item) => {
                    const bgColor = item.id === 'history' ? '#7a5f42' : '#b8935e';

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveModal(item.id)}
                            className="px-4 sm:px-5 py-2 text-white font-bold rounded shadow-[3px_3px_0px_#323232] border-2 border-[#323232] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#323232] active:translate-y-[2px] active:shadow-none transition-all text-xs sm:text-sm uppercase tracking-wide"
                            style={{ backgroundColor: bgColor }}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            {/* Modals */}
            {navItems.map((item) => (
                <Modal
                    key={item.id}
                    isOpen={activeModal === item.id}
                    onClose={() => setActiveModal(null)}
                    title={item.title}
                >
                    {item.content}
                </Modal>
            ))}
        </>
    );
}
