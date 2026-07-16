import { NextResponse } from 'next/server';
import { getPortfolioData, updatePortfolioData } from '@/lib/kv';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const success = await updatePortfolioData(data);
    
    if (success) {
      revalidatePath('/');
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
