// src/app/user/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const response = await fetch('https://dev.stedi.me/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        const text = await response.text()

        return new NextResponse(text, { status: response.status })
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
