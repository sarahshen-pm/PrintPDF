export const metadata = {
  title: "PDF 4 Pages Per Sheet (Compact & Free)",
  description: "Reduce PDF pages. Print 4 pages per sheet with minimal spacing.",
};

import PdfUploader from "@/components/PdfUploader";

export default function Page() {
  return (
    <main className="p-6 md:p-12 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-800 flex flex-col items-center">
      <div className="max-w-3xl w-full z-10 relative">
        <div className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] bg-purple-400/20 rounded-full blur-[80px] -z-10" />
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center">
          PDF 4 Pages Per Sheet
        </h1>

        <p className="mb-10 text-slate-500 text-center text-lg font-medium">
          Compress your documents. Print smarter. No upload required.
        </p>

        {/* Tool */}
        <PdfUploader mode="2x2" />

        {/* SEO Content */}
        <section className="mt-16 bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            What is a 4-pages-per-sheet PDF?
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            This tool lets you elegantly combine 4 PDF pages into one single sheet, significantly reducing paper usage and improving readability for study notes or slides. Your files are processed entirely in your browser—no data is ever uploaded to our servers. Fast, secure, and incredibly compact.
          </p>
        </section>
      </div>
    </main>
  );
}
