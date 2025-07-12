import { NextResponse } from 'next/server';

// Simulación de función (elimínala si ya tienes una real)
async function getUserRiskScore(email: string) {
    return { email, score: 85 }; // puedes ajustar este valor según tu lógica real
}

export async function GET(_: Request, context: { params: { email: string } }) {
    const email = context.params.email;

    try {
        const result = await getUserRiskScore(email);
        return NextResponse.json(result);
    } catch (_error) {
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
