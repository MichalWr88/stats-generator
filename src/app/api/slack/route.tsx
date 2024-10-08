import { NextResponse } from 'next/server';
import { sendToSlack } from '@/api/teamProvider';

export const runtime = 'nodejs'; // This is the default and can be omitted
export const dynamic = 'force-dynamic'; // always run dynamically

export async function GET(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const resp = await sendToSlack();
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
