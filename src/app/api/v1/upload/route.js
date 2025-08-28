import { uploadFileAction } from "@/app/actions/upload";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ ok: false, error: "Missing file field." }, { status: 400 });
    }

    const result = await uploadFileAction(file);

    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  }catch(error) {
    console.error(error);
    return NextResponse.json({ok: false, error}, {status: 500});
  } 
}