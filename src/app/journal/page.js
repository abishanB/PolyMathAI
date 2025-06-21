"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function JournalPage() {
    const [logs, setLogs] = useState([]);
    const [feedbacks, setFeedbacks] = useState({});

    useEffect(() => {
        const stored = localStorage.getItem("progressLogs");
        if (stored) setLogs(JSON.parse(stored));
    }, []);

    useEffect(() => {
        // Fetch feedback for each log if not already present
        const fetchFeedbacks = async () => {
            let updatedLogs = [...logs];
            let changed = false;
            for (let i = 0; i < updatedLogs.length; i++) {
                const log = updatedLogs[i];
                if (!log.feedback) {
                    try {
                        const res = await fetch("/api/generate-feedback", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ log: log.log, skill: log.skill, taskName: log.taskName })
                        });
                        const data = await res.json();
                        updatedLogs[i] = { ...log, feedback: data.feedback || "No feedback generated." };
                        changed = true;
                    } catch (e) {
                        updatedLogs[i] = { ...log, feedback: "Error generating feedback." };
                        changed = true;
                    }
                }
            }
            if (changed) {
                setLogs(updatedLogs);
                localStorage.setItem("progressLogs", JSON.stringify(updatedLogs));
            }
        };
        if (logs.length > 0) fetchFeedbacks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logs]);

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
                                    <div style={{ marginTop: 16, background: "#f0f7ff", borderRadius: 6, padding: 12, fontSize: 15, color: "#1a4a7a" }}>
                                        <b>AI Feedback & Advice:</b><br />
                                        {log.feedback || "Generating feedback..."}
                                    </div>
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
