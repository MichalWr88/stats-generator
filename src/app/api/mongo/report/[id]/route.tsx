import { Parser } from 'json2csv';
import { MongoServerError } from 'mongodb';
import { NextResponse } from 'next/server';
import { mongoSprint } from '@/mongoService';
import { sprintsToExcelStats } from '@/utils/SprintsMapper';
import { parseLocalDate } from '@/utils/dateHelpers';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const resp = await mongoSprint.getOneByNSprintWithoutMongoObj(Number(params.id));
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(sprintsToExcelStats([resp]) || []);
    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; 'filename=sasSprints_${parseLocalDate(new Date())}.csv'`,
      },
    });
  } catch (error) {
    console.log('error', error);
    if (error instanceof MongoServerError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error as Error }, { status: 500 });
  }
}
