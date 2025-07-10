import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uname, pass } = body;

  const validUser = process.env.ADMINUIDS;
  const validPass = process.env.ADMINPASS;

  if (uname === validUser && pass === validPass) {
    const res = NextResponse.json({ success: true });
    res.cookies.set('auth', 'true', {
      httpOnly: true,
      maxAge: 60 * 2,
    });
    return res;
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('auth', '', { maxAge: 0 });
  return res;
}