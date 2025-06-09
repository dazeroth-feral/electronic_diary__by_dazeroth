import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const disciplinesPath = path.join(process.cwd(), "src", "data", "all_disciplines.json");
    const data = fs.readFileSync(disciplinesPath, "utf-8");
    const disciplines = JSON.parse(data);

    return NextResponse.json(disciplines);
  } catch (error) {
    return NextResponse.json(
      { error: "Не вдалося зчитати файл дисциплін", details: error.message },
      { status: 500 }
    );
  }
}
