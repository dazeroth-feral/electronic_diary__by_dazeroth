import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tasksPath = path.join(process.cwd(), "src", "data", "all_tasks.json");

    const fileContents = fs.readFileSync(tasksPath, "utf-8");
    const tasks = JSON.parse(fileContents);

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Помилка при зчитуванні all_tasks.json:", error);
    return NextResponse.json(
      { error: "Не вдалося завантажити дані з all_tasks.json" },
      { status: 500 }
    );
  }
}
