import { MongoServerError } from 'mongodb';
import { NextResponse } from 'next/server';
import { type Sprint, sprintSchemaEdit, sprintSchemaAdd } from '@/models/Sprint';
import { mongoSprint } from '@/mongoService';

export async function PUT(request: Request) {
  const body = (await request.json()) as Sprint;
  try {
    await sprintSchemaEdit.validate(body);
    const resp = await mongoSprint.editOne(body);
  
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    if (error instanceof MongoServerError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error as Error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as Sprint;
  try {
    await sprintSchemaAdd.validate(body);
    const resp = await mongoSprint.addOne(body);
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    if (error instanceof MongoServerError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error as Error }, { status: 500 });
  }
}
