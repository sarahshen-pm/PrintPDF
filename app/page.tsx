import Image from "next/image";
import PdfUploader from "@/components/PdfUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-800">
      <div className="max-w-4xl text-center space-y-8 z-10 relative w-full">
        <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[80px] -z-10" />

        <div className="flex flex-col items-center justify-center mb-4">
          <Image
            src="/logo2.png"
            alt="PrintPDF Logo"
            width={160}
            height={160}
            className="object-contain"
          />
        </div>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
          The most elegant way to compress and combine your PDF pages for smarter printing. 
          <span className="block mt-2 text-indigo-500 font-semibold">100% Free. Secure. Runs instantly in your browser.</span>
        </p>
        <div className="max-w-xl mx-auto w-full">
          <PdfUploader mode="3x3" />
        </div>
      </div>
    </main>
  );
}
