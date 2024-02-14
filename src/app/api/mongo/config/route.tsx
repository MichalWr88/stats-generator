import { NextResponse } from 'next/server';
import { ValidationError } from 'yup';
import {  ConfigGetValidation, configType } from '@/models/AppConfig';
import { mongoConfig } from '@/mongoService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  try {
    await ConfigGetValidation.validate(type);
    if (type && !configType.includes(type)) {
      return new Response('invalid type', {
        status: 500,
      });
    }
   const resp =  await mongoConfig.getAllConfigByType(type);
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } 
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }
}
