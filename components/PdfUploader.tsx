"use client";

import { useState, useEffect } from "react";
import { processPdf } from "@/lib/pdfProcessor";

export default function PdfUploader({ mode }: { mode: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Generate preview whenever file or orientation changes
  useEffect(() => {
    let active = true;

    const generatePreview = async () => {
      if (!file) {
        setPreviewUrl(null);
        return;
      }

      setIsProcessing(true);
      try {
        const result = await processPdf(file, mode, orientation);
        if (!active) return;
        
        const blob = new Blob([result as any], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        
        setPreviewUrl(prev => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
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
  }, [file, mode, orientation]);

  const handleDownload = () => {
    if (!previewUrl || !file) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `PrintPDF-${mode}-${orientation}-${file.name}`;
    a.click();
  };

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
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
        {file && (
          <p className="mt-4 text-sm font-medium text-slate-700 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
            📄 {file.name}
          </p>
        )}
      </div>

      {file && (
        <div className="mt-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-slate-100 mx-auto">
            <button
              onClick={() => setOrientation("portrait")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                orientation === "portrait"
                  ? "bg-indigo-100 text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              📄 Portrait (竖向)
            </button>
            <button
              onClick={() => setOrientation("landscape")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                orientation === "landscape"
                  ? "bg-indigo-100 text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              🗤 Landscape (横向)
            </button>
          </div>

          <div className="relative w-full aspect-[1/1.2] md:aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
                <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            {previewUrl && (
              <iframe
                src={`${previewUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="PDF Preview"
              />
            )}
          </div>

          <button
            onClick={handleDownload}
            disabled={!previewUrl || isProcessing}
            className="w-full relative group overflow-hidden bg-slate-900 disabled:bg-slate-300 text-white font-semibold px-6 py-4 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 disabled:hidden" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              ⬇ Download Printable PDF
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
