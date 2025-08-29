import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#27233a] to-[#505168] text-[#eaefd3]">
            <section className="container mx-auto flex flex-col items-center text-center py-20 px-4">
                <h1 className="text-5xl font-bold mb-6">
                    Synopsize
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mb-8">
                    Upload PDFs, images, or documents and get clean, structured summaries instantly.
                    Perfect for research, study, and productivity.
                </p>
                <a href="/summary">
                    <button className="flex items-center px-6 py-3 text-lg rounded-2xl shadow-lg bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer">
                        Upload Your File <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </a>
            </section>

            <section className="container mx-auto py-10 grid md:grid-cols-3 gap-8 text-center px-4">
                {[
                    { step: "1", title: "Upload", desc: "Drag & drop your PDF or image." },
                    { step: "2", title: "Extract", desc: "AI reads and processes text instantly." },
                    { step: "3", title: "Summarize", desc: "Get clean summaries & insights." },
                ].map((item) => (
                    <div
                        key={item.step}
                        className="p-6 bg-[#b3c0a4] shadow rounded-2xl border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold text-[#505168] mb-3">
                            {item.step}
                        </h2>
                        <h3 className="text-xl text-[#27233a] font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </section>

            <section className="container mx-auto py-20 px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why Synopsize?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        "AI-powered OCR",
                        "PDF & Image Support",
                        "Instant Summaries",
                        "Structured JSON Export",
                        "Research-friendly",
                        "Free & Easy to Use",
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="p-6 bg-[#B3C0A4] rounded-xl shadow-sm text-center"
                        >
                            <h3 className="text-lg font-semibold text-[#27233A]">{feature}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
