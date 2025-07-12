import { NextResponse } from 'next/server';

async function getUserRiskScore(email: string) {
    return { email, score: 85 };
}

export async function GET(_: Request, { params }: { params: { email: string } }) {
    const email = params.email;

    try {
        const result = await getUserRiskScore(email);
        return NextResponse.json(result);
    } catch (_error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
