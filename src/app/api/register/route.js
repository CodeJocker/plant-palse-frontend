import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/app/data", "users.json");

export async function POST(req) {
  const { firstName, lastName, email, password } = await req.json();
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (users.find(u => u.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = { id: Date.now(), email, password , firstName , lastName };
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ ok: true, user: { id: newUser.id, email: newUser.email } });
}