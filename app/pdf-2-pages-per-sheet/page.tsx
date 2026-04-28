export const metadata = {
  title: "PDF 2 Pages Per Sheet (Compact & Free)",
  description: "Reduce PDF pages. Print 2 pages per sheet with minimal spacing.",
};

import PdfUploader from "@/components/PdfUploader";

export default function Page() {
  return (
    <main className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-2">
        PDF 2 Pages Per Sheet (Compact)
      </h1>

      <p className="mb-6 text-gray-600">
        Reduce whitespace. Print smarter. No upload required.
      </p>

      {/* Tool */}
      <PdfUploader mode="1x2" />

      {/* SEO Content */}
      <section className="mt-10 bg-white p-6 rounded-xl border">
        <h2 className="text-xl font-semibold mb-4">
          What is 2 pages per sheet PDF?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This tool lets you combine 2 PDF pages into one, reducing paper usage
          and improving readability for study notes. Your files are processed entirely in your browser, meaning no data is ever uploaded to our servers. Fast, secure, and compact!
        </p>
      </section>
    </main>
  );
}
