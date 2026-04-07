import { NextResponse } from 'next/server'
import { getMatchesByTeam } from '@/lib/queries'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const matches = await getMatchesByTeam(id)
  return NextResponse.json(matches)
}
