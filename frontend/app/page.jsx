"use client";

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import FooterFeatures from '../components/FooterFeatures';

import SideRibbons from '../components/SideRibbons';
import FloatingSymbols from '../components/FloatingSymbols';
import '../app/globals.css';

export default function Page() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [result, setResult] = useState(null);
  const [showRecheck, setShowRecheck] = useState(false);
  const [error, setError] = useState('');
  const [showReferences, setShowReferences] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const callBackend = async (url, backendName) => {
    setError('');
    setLoadingMessage('Analyzing case... Please wait');
    try {
      setLoading(true);
      const res = await axios.post(
        url,
        { text },
        {
          timeout: 120000,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Request failed';
      setError(`Error: ${errorMsg}`);
      console.error('API Error:', err);
      return null;
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleGetJudgment = async () => {
    if (!text.trim()) return setError('Please enter case details');
    setResult(null);
    setShowRecheck(false);
    setShowReferences(false);
    setShowPrompt(false);
    const data = await callBackend(
      'https://negi2725-LegalApiBackendService.hf.space/explain',
      'LegalBERT Backend (Fast)'
    );
    if (data) {
      setResult(data);
      setShowRecheck(true);
    }
  };

  const handleRecheck = async () => {
    if (!text.trim()) return setError('Please enter case details');
    setResult(null);
    setShowReferences(false);
    setShowPrompt(false);
    const data = await callBackend(
      'https://negi2725-LegalRagBackend.hf.space/explain',
      'Enhanced RAG Backend (Detailed)'
    );
    if (data) setResult(data);
  };

  const downloadReferences = () => {
    if (!result || !result.retrievedChunks) return;

    let content = "LEGAL REFERENCES\n";
    content += "=".repeat(80) + "\n\n";
    content += `Case: ${text}\n\n`;
    content += "=".repeat(80) + "\n\n";

    Object.keys(result.retrievedChunks).forEach((category) => {
      content += `\n${category.toUpperCase()}\n`;
      content += "-".repeat(80) + "\n\n";

      (result.retrievedChunks[category] || []).forEach((chunk, i) => {
        const chunkText = typeof chunk === 'string' ? chunk : JSON.stringify(chunk);
        content += `${i + 1}. ${chunkText}\n\n`;
      });
    });

    content += "\n" + "=".repeat(80) + "\n";
    content += `Generated on: ${new Date().toLocaleString()}\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal_references_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };



  return (
    <div className="min-h-screen overflow-hidden py-4 sm:py-8 md:py-12 px-2 sm:px-4 md:px-6" style={{ backgroundColor: '#e8e8e8' }}>
      {/* Decorative Side Ribbons */}
      <SideRibbons />

      {/* Floating Law Symbols */}
      <FloatingSymbols />

      <div className="max-w-7xl mx-auto h-full flex flex-col relative z-10">
        {/* Navigation Bar - At very top */}
        <div className="flex-shrink-0 mb-10 sm:mb-12">
          <Navbar />
        </div>

        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
          {/* Static Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#323232] mb-3 sm:mb-4">
            Legal AI Judge
          </h1>

          {/* Judge Image */}
          <div className="mx-auto mb-3 sm:mb-4 flex items-center justify-center">
            <Image
              src="/pngkey.com-judge-hammer-png-7960135.png"
              alt="Legal AI Judge"
              width={180}
              height={180}
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Input Section & Footer Features */}
        <div className="flex-shrink-0 space-y-4 sm:space-y-6">
          {/* Center - Input Card */}
          <div className="w-full max-w-xl mx-auto px-4">
            {/* Input Section - Neo Card */}
            <div className={`w-full transition-all duration-700 ease-in-out ${loading || result ? 'scale-75 opacity-0 h-0 overflow-hidden' : 'scale-100 opacity-100'}`}>
              <div className="neo-card p-3 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 transition-all duration-300" style={{ color: '#323232' }}>Case Details</h2>
                <textarea
                  className="neo-input resize-none transition-all duration-300 focus:scale-[1.02]"
                  style={{ height: '120px', minHeight: '100px' }}
                  placeholder="Enter case details..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                  <button
                    onClick={handleGetJudgment}
                    disabled={loading}
                    className="neo-button px-4 sm:px-6 md:px-8 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg"
                    style={{ backgroundColor: '#b8935e' }}
                  >
                    {loading ? 'Processing...' : 'Get Judgment'}
                  </button>

                  {showRecheck && !loading && !result && (
                    <button
                      onClick={handleRecheck}
                      disabled={loading}
                      className="neo-button px-3 sm:px-4 md:px-6 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
                      style={{ backgroundColor: '#8b6f47' }}
                    >
                      <span className="hidden sm:inline">Recheck (More Details)</span>
                      <span className="sm:hidden">Recheck</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Features - Full width to allow spreading */}
          <div className="w-full mt-auto">
            <FooterFeatures />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 sm:pr-2" style={{ maxHeight: 'calc(100vh - 400px)' }}>

          {/* Loading State */}
          {loading && (
            <div className="neo-card p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto animate-fadeIn">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 border-b-4 mb-4" style={{ borderColor: '#b8935e' }}></div>
                  <div className="animate-ping absolute top-0 left-0 rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 border-4 opacity-20" style={{ borderColor: '#b8935e' }}></div>
                </div>
                <div className="font-bold text-base sm:text-lg md:text-xl text-center animate-pulse" style={{ color: '#323232' }}>{loadingMessage}</div>
                <div className="text-sm sm:text-base md:text-lg mt-2 animate-pulse" style={{ color: '#666' }}>Analyzing legal precedents...</div>
              </div>
            </div>
          )}
          {/* Error Message */}
          {error && (
            <div className="neo-card p-3 sm:p-4 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto animate-shake" style={{ borderColor: '#dc2626', backgroundColor: '#fee2e2' }}>
              <div className="font-bold text-sm sm:text-base md:text-lg" style={{ color: '#dc2626' }}>
                Error: {error}
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="max-w-3xl mx-auto animate-slideUp">
              {/* Verdict Card */}
              <div className="neo-result-card mb-4 sm:mb-6 transition-all duration-300 hover:shadow-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4" style={{ color: '#323232' }}>Judgment</h2>

                <div className="mb-4 p-3 sm:p-4" style={{ backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                  <div className="text-base sm:text-lg md:text-xl font-bold mb-2" style={{ color: '#323232' }}>
                    Verdict: <span style={{ color: '#2d8cf0' }}>{result.verdict}</span>
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: '#666' }}>
                    LegalBERT Verdict: {result.legalBertVerdict ?? 'N/A'}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-semibold" style={{ color: '#666' }}>
                    Confidence: {result.confidence}
                  </div>
                </div>


                <div className="mb-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2" style={{ color: '#323232' }}>Explanation:</h3>
                  <div className="p-3 sm:p-4 md:p-6" style={{ backgroundColor: '#f9f9f9', borderRadius: '5px', border: '2px solid #323232' }}>
                    <div className="whitespace-pre-wrap font-medium" style={{ color: '#323232', lineHeight: '1.8', fontSize: '13px' }}>
                      {result.explanation.split('\n').map((line, idx) => {
                        // Check if line is a header (starts with **)
                        if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                          const headerText = line.replace(/\*\*/g, '').trim();
                          return (
                            <div key={idx} className="mt-6 mb-3">
                              <h4 className="text-lg font-black" style={{ color: '#323232', borderBottom: '3px solid #b8935e', paddingBottom: '8px' }}>
                                {headerText}
                              </h4>
                            </div>
                          );
                        }
                        // Check if line has bold text in middle
                        else if (line.includes('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={idx} className="mb-3" style={{ textAlign: 'justify' }}>
                              {parts.map((part, i) =>
                                i % 2 === 1 ? <strong key={i} style={{ color: '#2d8cf0' }}>{part}</strong> : part
                              )}
                            </p>
                          );
                        }
                        // Regular paragraph
                        else if (line.trim()) {
                          return (
                            <p key={idx} className="mb-3" style={{ textAlign: 'justify' }}>
                              {line}
                            </p>
                          );
                        }
                        // Empty line
                        return <div key={idx} className="h-2"></div>;
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Retrieved Chunks */}
              <div className="neo-result-card mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#323232' }}>Retrieved Legal References</h3>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    <button
                      onClick={downloadReferences}
                      className="neo-button px-3 sm:px-4 py-2 text-xs sm:text-sm"
                      style={{ backgroundColor: '#8b6f47', height: 'auto' }}
                    >
                      <span className="hidden sm:inline">Download as TXT</span>
                      <span className="sm:hidden">Download</span>
                    </button>
                    <button
                      onClick={() => setShowReferences(!showReferences)}
                      className="neo-button px-3 sm:px-4 py-2 text-xs sm:text-sm"
                      style={{ backgroundColor: '#b8935e', height: 'auto' }}
                    >
                      {showReferences ? 'Hide References' : 'Show References'}
                    </button>
                  </div>
                </div>

                {showReferences && (
                  <div className="animate-fadeIn">
                    {Object.keys(result.retrievedChunks || {}).map((category) => (
                      <div key={category} className="mb-3 sm:mb-4">
                        <h4 className="text-sm sm:text-base md:text-lg font-bold mb-2" style={{ color: '#2d8cf0', textTransform: 'uppercase' }}>
                          {category}
                        </h4>
                        <div className="space-y-2 sm:space-y-3">
                          {(result.retrievedChunks[category] || []).slice(0, 5).map((chunk, i) => (
                            <div key={i} className="neo-chunk-card">
                              <p className="text-xs sm:text-sm font-medium" style={{ color: '#323232' }}>
                                {typeof chunk === 'string' ? chunk : JSON.stringify(chunk).slice(0, 300)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Prompt Section */}
              <div className="neo-result-card">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: '#323232' }}>AI Prompt Used</h3>
                  <button
                    onClick={() => setShowPrompt(!showPrompt)}
                    className="neo-button px-3 sm:px-4 py-2 text-xs sm:text-sm"
                    style={{ backgroundColor: '#b8935e', height: 'auto' }}
                  >
                    {showPrompt ? 'Hide Prompt' : 'Show Prompt'}
                  </button>
                </div>

                {showPrompt && (
                  <div className="p-3 sm:p-4 animate-fadeIn" style={{ backgroundColor: '#f0f0f0', borderRadius: '5px', border: '2px solid #323232' }}>
                    <pre className="whitespace-pre-wrap text-xs font-mono overflow-x-auto" style={{ color: '#666' }}>
                      {result.prompt}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
