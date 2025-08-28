import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file')

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const mimeType = file.type;

        const uploadResponse = await new Promise((resolve, reject) => {
            const options = {
                folder: 'synopsize',
                resource_type: mimeType === "application/pdf" ? "auto" : "image"
            }

            if (mimeType.startsWith("image/")) {
                options.quality = "auto:eco";
                options.fetch_format = null;
            }
            cloudinary.uploader.upload_stream(options,
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(buffer)
        });

        return NextResponse.json({ url: uploadResponse.secure_url }, { status: 201 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}