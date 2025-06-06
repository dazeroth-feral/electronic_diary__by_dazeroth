import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  const studentId = req.nextUrl.searchParams.get("id");

  const gradesPath = path.join(process.cwd(), "src", "data", "student_all_grades.json");
  const disciplinesPath = path.join(process.cwd(), "src", "data", "all_desciplines.json");

  const gradesData = JSON.parse(fs.readFileSync(gradesPath, "utf-8"));
  const disciplinesData = JSON.parse(fs.readFileSync(disciplinesPath, "utf-8"));

  const student = gradesData.find((s) => s.student_id === parseInt(studentId));

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const result = student.student_grades.map((grade) => {
    const discipline = disciplinesData.find((d) => d.id === grade.discipline_id);

    return {
      name: discipline ? discipline.name : "Невідома дисципліна",
      tasks: grade.tasks
    };
  });

  return NextResponse.json(result);
}
