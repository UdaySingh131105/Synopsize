export default function Footer() {
    return <footer className="bg-[#27233A] text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
            <p>© {new Date().getFullYear()} Synopsize. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-[#B3C0A4]">About</a>
                <a href="https://github.com/UdaySingh131105/" className="hover:text-[#B3C0A4]">GitHub</a>
                <a href="#" className="hover:text-[#B3C0A4]">Contact</a>
            </div>
        </div>
    </footer>
}