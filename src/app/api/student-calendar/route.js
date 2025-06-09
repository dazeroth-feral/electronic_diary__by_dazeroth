import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'all_tasks.json');
  const tasks = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return NextResponse.json(tasks);
}
