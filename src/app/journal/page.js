"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function JournalPage() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("progressLogs");
        if (stored) setLogs(JSON.parse(stored));
    }, []);

    return (
        <div className="journal-page">
            <Navbar />
            <div style={{ maxWidth: 700, margin: "40px auto", padding: 24 }}>

                <h1 style={{ fontSize: 32, marginBottom: 16 }}>📝 Journal</h1>
                <p style={{ marginBottom: 32 }}>
                    Here are your progress logs for completed tasks. Keep up the great work!
                </p>
                <button
                    className="btn btn-danger"
                    style={{ marginBottom: 24 }}
                    onClick={() => {
                        localStorage.removeItem("progressLogs");
                        setLogs([]);
                    }}
                >
                    Clear Logs (Testing Use)
                </button>
                {logs.length === 0 ? (
                    <div style={{ color: "#888" }}>No progress logs yet.</div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {logs
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                            .map((log) => (
                                <div key={log.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 20, background: "#fafbfc" }}>
                                    <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{log.taskName} <span style={{ color: '#888', fontWeight: 400 }}>({log.skill})</span></div>
                                    <div style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>{new Date(log.timestamp).toLocaleString()}</div>
                                    <div style={{ whiteSpace: "pre-wrap", fontSize: 16 }}>{log.log}</div>
                                </div>
                            ))}
                    </div>
                )}
                <div style={{ marginTop: 40 }}>
                    <Link href="/dashboard">
                        <button className="btn btn-secondary">← Back to Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
