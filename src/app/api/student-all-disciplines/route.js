import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  const usersPath = path.join(process.cwd(), "src", "data", "user_data.json");
  const disciplinesPath = path.join(process.cwd(), "src", "data", "all_disciplines.json");

  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  const disciplines = JSON.parse(fs.readFileSync(disciplinesPath, "utf-8"));

  const id = req.nextUrl.searchParams.get("id");

  let user;

  for(let i = 0; i < users.length; i++){
    if(users[i].id === Number(id)){
      user = users[i]
    };
  };

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const userdiscipline = disciplines.filter(discipline => user.disciplines.includes(discipline.id));
  return NextResponse.json(userdiscipline);
}
