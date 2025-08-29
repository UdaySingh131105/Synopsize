import { FileHeart } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    return (
        <Link href={'/'} className="p-4 flex gap-3 bg-[#27233A]">
            <FileHeart />
            <h1 className="font-semibold">Synopsize</h1>
        </Link>
    );
}