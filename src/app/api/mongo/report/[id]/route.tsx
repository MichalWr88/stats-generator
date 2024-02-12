import { Parser } from 'json2csv';
import { MongoServerError } from 'mongodb';
import { NextResponse } from 'next/server';
import { mongoSprint } from '@/mongoService';
import { parseLocalDate } from '@/utils';
import { sprintsToExcelStats } from '@/utils/SprintsMapper';

export async function GET() {
  try {
    const resp = await mongoSprint.getAllWithoutMongoObj();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(sprintsToExcelStats(resp) || []);
    NextResponse.json(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; 'filename=rangersSprints_${parseLocalDate(new Date())}.csv'`,
      },
    });
  } catch (error) {
    if (error instanceof MongoServerError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
