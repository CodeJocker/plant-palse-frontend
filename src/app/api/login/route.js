import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/app/data", "users.json");

export async function POST(req) {
  const { email, password } = await req.json();
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = Buffer.from(`${user.id}:${Date.now()}`).toString("base64");
  return NextResponse.json({ ok: true, token, user: { id: user.id, email: user.email } });
}