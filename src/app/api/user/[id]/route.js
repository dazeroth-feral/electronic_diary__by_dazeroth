// app/api/user/[id]/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'user_data.json');

export async function GET(req, { params }) {
  const { id } = params;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const user = data.find((u) => u.id === Number(id));

  if (!user) {
    return NextResponse.json({ error: 'User not found' + u }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const updates = await req.json();

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const userIndex = data.findIndex((u) => u.id === Number(id));

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' + u }, { status: 404 });
  }

  const updatedUser = { ...data[userIndex], ...updates };
  data[userIndex] = updatedUser;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(updatedUser);
}
