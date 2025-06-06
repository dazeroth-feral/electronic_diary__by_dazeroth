import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req) {
  const usersPath = path.join(process.cwd(), "src", "data", "user_data.json");
  const desciplinesPath = path.join(process.cwd(), "src", "data", "all_desciplines.json");

  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
  const desciplines = JSON.parse(fs.readFileSync(desciplinesPath, "utf-8"));

  const id = req.nextUrl.searchParams.get("id");

  let user = "";

  for(let i = 0; i < users.length; i++){
    if(users[i].id === Number(id)){
      user = users[i]
    };
  };

  if (!user) return NextResponse.json(user, { status: 404 });

  const userDescipline = desciplines.filter(descipline => user.desciplines.includes(descipline.id));
  return NextResponse.json(userDescipline);
}
