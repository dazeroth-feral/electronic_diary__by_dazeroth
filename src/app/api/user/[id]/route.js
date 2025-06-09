import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'user_data.json');

// Витягуємо ID з URL, бо Next.js App Router більше не передає params напряму
function getIdFromRequest(req) {
  const segments = req.nextUrl.pathname.split('/');
  return segments[segments.length - 1];
}

export async function GET(req) {
  const id = getIdFromRequest(req);

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  let user;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(id)) {
      user = data[i];
      break;
    }
  }

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(req) {
  const id = getIdFromRequest(req);
  const updates = await req.json();

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  let userIndex = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === Number(id)) {
      userIndex = i;
      break;
    }
  }

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedUser = { ...data[userIndex], ...updates };
  data[userIndex] = updatedUser;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json(updatedUser);
}
