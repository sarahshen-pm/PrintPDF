import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-slate-800">
      <div className="max-w-4xl text-center space-y-8 z-10 relative">
        <div className="absolute top-[-50%] left-[-20%] w-[300px] h-[300px] bg-purple-400/20 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[80px] -z-10" />
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-sm pb-2">
          PrintPDF
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
          The most elegant way to compress and combine your PDF pages for smarter printing. 
          <span className="block mt-2 text-indigo-500 font-semibold">100% Free. Secure. Runs instantly in your browser.</span>
        </p>

        <div className="grid gap-6 md:grid-cols-3 w-full mt-12">
          {[
            { href: "/pdf-9-pages-per-sheet", title: "3x3 Grid", desc: "9 pages per sheet", color: "from-blue-500 to-indigo-500" },
            { href: "/pdf-4-pages-per-sheet", title: "2x2 Grid", desc: "4 pages per sheet", color: "from-indigo-500 to-purple-500" },
            { href: "/pdf-2-pages-per-sheet", title: "1x2 Grid", desc: "2 pages per sheet", color: "from-purple-500 to-pink-500" }
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                {card.title}
              </h2>
              <p className="text-slate-500 font-medium">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
