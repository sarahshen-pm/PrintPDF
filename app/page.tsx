import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          PrintPDF
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          The fastest way to compress and combine your PDF pages for smarter printing. Completely free, secure, and runs locally in your browser.
        </p>

        <div className="grid gap-4 md:grid-cols-3 w-full">
          <Link
            href="/pdf-9-pages-per-sheet"
            className="block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">3x3 Grid</h2>
            <p className="text-gray-500">9 pages per sheet</p>
          </Link>
          
          <Link
            href="/pdf-4-pages-per-sheet"
            className="block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">2x2 Grid</h2>
            <p className="text-gray-500">4 pages per sheet</p>
          </Link>

          <Link
            href="/pdf-2-pages-per-sheet"
            className="block p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">1x2 Grid</h2>
            <p className="text-gray-500">2 pages per sheet</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
