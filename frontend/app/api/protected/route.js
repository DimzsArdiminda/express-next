// app/api/protected/route.js
import { NextResponse } from 'next/server';
import { verifyToken } from "../../lib/auth.js";

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      throw new Error('Token is required');
    }
    verifyToken({ headers: { 'authorization': `Bearer ${token}` } });
    return NextResponse.json({ msg: 'Protected route accessed' });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 401 });
  }
}
