"use client";

import { useState, useEffect, useRef } from "react";
import { processPdf } from "@/lib/pdfProcessor";
import Image from "next/image";

export default function PdfUploader({ mode: initialMode }: { mode: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pageStats, setPageStats] = useState<{ original: number; final: number } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate preview whenever file, mode, or orientation changes
  useEffect(() => {
    let active = true;

    const generatePreview = async () => {
      if (!file) {
        setPreviewUrl(null);
        setPageStats(null);
        return;
      }

      setIsProcessing(true);
      try {
        const { pdfBytes, originalPageCount } = await processPdf(file, currentMode, orientation);
        if (!active) return;
        
        const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        
        setPreviewUrl(prev => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });

        let perPage = 9;
        if (currentMode === "2x2") perPage = 4;
        if (currentMode === "1x2") perPage = 2;
        
        setPageStats({
          original: originalPageCount,
          final: Math.ceil(originalPageCount / perPage)
        });

      } catch (error) {
        console.error(error);
      } finally {
        if (active) setIsProcessing(false);
      }
    };

    generatePreview();

    return () => {
      active = false;
    };
  }, [file, currentMode, orientation]);

  const handleDownload = () => {
    if (!previewUrl || !file) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `PrintPDF-${currentMode}-${orientation}-${file.name}`;
    a.click();
  };

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  const handleReset = () => {
    setFile(null);
  };

  if (!file) {
    return (
      <div className="w-full bg-white/70 backdrop-blur-xl border border-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center transition-all">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-2xl p-8 bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
          <svg className="w-12 h-12 text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <label className="cursor-pointer">
            <span className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all focus:ring-4 focus:ring-indigo-300">
              Choose PDF File
            </span>
            <input
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col animate-in fade-in duration-300">
      {/* Header: 1 Row */}
      <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo2.png" alt="PrintPDF Logo" width={32} height={32} className="object-contain" />
          <span className="font-bold text-xl text-slate-800 tracking-tight">PrintPDF</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm border border-slate-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Upload New PDF
            <input
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </label>
          <button 
            onClick={handleReset}
            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors px-3 py-2 hover:bg-slate-50 rounded-lg"
            title="Close Preview"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row p-4 md:p-6 gap-6">
        
        {/* Left Side: Controls & Info */}
        <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col gap-6 shrink-0 overflow-y-auto hide-scrollbar pb-10">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-1 truncate" title={file.name}>
              📄 {file.name}
            </h3>
            {pageStats && (
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-500">Original</span>
                  <span className="font-bold text-slate-700 text-lg">{pageStats.original} <span className="text-sm font-normal text-slate-400">pages</span></span>
                </div>
                <div className="text-indigo-300">➜</div>
                <div className="flex flex-col text-right">
                  <span className="text-slate-500">Compressed</span>
                  <span className="font-bold text-indigo-600 text-lg">{pageStats.final} <span className="text-sm font-normal text-indigo-400">sheets</span></span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-500 ml-1">Grid Layout</span>
            <div className="grid grid-cols-3 bg-slate-200 p-1 rounded-xl shadow-inner">
              {[
                { id: "3x3", label: "9 Pages" },
                { id: "2x2", label: "4 Pages" },
                { id: "1x2", label: "2 Pages" },
              ].map((grid) => (
                <button
                  key={grid.id}
                  onClick={() => setCurrentMode(grid.id)}
                  className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    currentMode === grid.id
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {grid.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-500 ml-1">Orientation</span>
            <div className="flex bg-slate-200 p-1 rounded-xl shadow-inner">
              <button
                onClick={() => setOrientation("portrait")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  orientation === "portrait"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                📄 Portrait
              </button>
              <button
                onClick={() => setOrientation("landscape")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  orientation === "landscape"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                🗤 Landscape
              </button>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <button
              onClick={handlePrint}
              disabled={!previewUrl || isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 font-semibold px-4 py-4 rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors disabled:opacity-50 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Direct Print
            </button>
            <button
              onClick={handleDownload}
              disabled={!previewUrl || isProcessing}
              className="w-full relative group overflow-hidden bg-slate-900 text-white font-semibold px-4 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 disabled:hidden" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download PDF
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="flex-1 relative bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden flex flex-col">
          {isProcessing && (
            <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-white/80 backdrop-blur-sm z-10">
              <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-medium text-slate-600">Processing Pages...</span>
            </div>
          )}
          {previewUrl && (
            <iframe
              ref={iframeRef}
              src={`${previewUrl}#toolbar=0`}
              className="w-full flex-1 border-none bg-slate-200/50"
              title="PDF Preview"
            />
          )}
        </div>
        
      </div>
    </div>
  );
}
