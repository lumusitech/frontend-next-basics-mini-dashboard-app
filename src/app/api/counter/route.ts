import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // console.log({ request: request.method });

  return NextResponse.json({ method: request.method, count: 10 });
}

export async function POST(request: Request) {
  // console.log({ request: request.method });

  return NextResponse.json({ method: request.method, count: 10 });
}
