import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
    try {
        const response = await fetch(`https://dev.stedi.me/riskscore/${params.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'suresteps.session.token': req.headers.get('suresteps.session.token') || '',
            },
        });

        const json = await response.json();
        return NextResponse.json(json, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
