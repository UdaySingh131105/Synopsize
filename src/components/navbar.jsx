import { FileHeart } from "lucide-react";

export default function NavBar() {
    return <div className="p-4">
        <div className="flex items-center gap-2">
            <FileHeart />
            <h1 className="font-semibold">Synopsize</h1>
        </div>
    </div>
}