import { NextResponse } from 'next/server';

// Fetch journal logs for a skill from localStorage (client-side)
async function fetchJournalLogs(skillId) {
    // Try to access localStorage via cookies (Next.js API routes are server-side, so direct localStorage is not available)
    // Instead, expect the client to send logs in the request body if needed
    return [];
}

function generateFeedbackFromLogs(logs) {
    if (!logs.length) return 'No journal entries found for this skill.';
    const progress = logs.length > 2 ? 'consistent progress' : 'some progress';
    return `Based on your recent journal entries, you have shown ${progress} in this skill. Keep reflecting on challenges and celebrating your improvements!`;
}

export async function POST(request) {
    const { skillId, logs: clientLogs } = await request.json();
    if (!skillId) {
        return NextResponse.json({ error: 'Missing skillId' }, { status: 400 });
    }
    // Use logs sent from client, or fallback to empty array
    const logs = Array.isArray(clientLogs)
        ? clientLogs.filter(l => l.skill === skillId)
        : [];
    const feedback = generateFeedbackFromLogs(logs);
    return NextResponse.json({ feedback, logs });
}
