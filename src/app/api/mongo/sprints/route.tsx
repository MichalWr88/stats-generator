import { MongoServerError } from 'mongodb';
import { NextResponse } from 'next/server';
import { mongoSprint } from '@/mongoService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? 0;
  const pageSize = searchParams.get('pageSize') ?? 15;
  try {
    const resp = await mongoSprint.getAllPagination({ page: Number(page), pageSize: Number(pageSize) });
    return NextResponse.json(resp, { status: 200 });
  } catch (err) {
    if (err instanceof MongoServerError) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
