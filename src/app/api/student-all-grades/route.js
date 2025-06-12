import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  const studentId = req.nextUrl.searchParams.get("id");

  const gradesPath = path.join(process.cwd(), "src", "data", "student_all_grades.json");
  const disciplinesPath = path.join(process.cwd(), "src", "data", "all_disciplines.json");

  const gradesData = JSON.parse(fs.readFileSync(gradesPath, "utf-8"));
  const disciplinesData = JSON.parse(fs.readFileSync(disciplinesPath, "utf-8"));

  const student = gradesData.find((s) => s.student_id === parseInt(studentId));

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}
