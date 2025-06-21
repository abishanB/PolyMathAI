"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

function Modal({ open, onClose, log, onFeedback }) {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(log?.feedback || "");

    useEffect(() => {
        if (open && log && !log.feedback && !loading) {
            setLoading(true);
            fetch("/api/generate-feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ log: log.log, skill: log.skill, taskName: log.taskName })
            })
                .then(res => res.json())
                .then(data => {
                    setFeedback(data.feedback || "No feedback generated.");
                    onFeedback(data.feedback || "No feedback generated.");
                })
                .catch(() => {
                    setFeedback("Error generating feedback.");
                    onFeedback("Error generating feedback.");
                })
                .finally(() => setLoading(false));
        } else if (log?.feedback) {
            setFeedback(log.feedback);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, log]);

    if (!open || !log) return null;
    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#fff", borderRadius: 10, padding: 32, maxWidth: 500, width: "90%", boxShadow: "0 4px 24px #0002", position: "relative" }}>
                <button onClick={onClose} style={{ position: "absolute", top: 12, right: 16, fontSize: 22, background: "none", border: "none", cursor: "pointer" }}>&times;</button>
                <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>{log.taskName} <span style={{ color: '#888', fontWeight: 400 }}>({log.skill})</span></div>
                <div style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>{new Date(log.timestamp).toLocaleString()}</div>
                <div style={{ whiteSpace: "pre-wrap", fontSize: 16, marginBottom: 18 }}>{log.log}</div>
                <div style={{ background: "#f0f7ff", borderRadius: 6, padding: 12, fontSize: 15, color: "#1a4a7a" }}>
                    <b>AI Feedback & Advice:</b><br />
                    {loading ? "Generating feedback..." : feedback}
                </div>
            </div>
        </div>
    );
}

export default function JournalPage() {
    const [logs, setLogs] = useState([]);
    const [modalLog, setModalLog] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("progressLogs");
        if (stored) setLogs(JSON.parse(stored));
    }, []);

    const handleLogClick = (log) => setModalLog(log);
    const handleModalClose = () => setModalLog(null);
    const handleFeedback = (feedback) => {
        if (!modalLog) return;
        const updatedLogs = logs.map(l => l.id === modalLog.id ? { ...l, feedback } : l);
        setLogs(updatedLogs);
        localStorage.setItem("progressLogs", JSON.stringify(updatedLogs));
    };

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
                                <div key={log.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 20, background: "#fafbfc", cursor: "pointer" }}
                                    onClick={() => handleLogClick(log)}
                                    title="Click to view full log and feedback"
                                >
                                    <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{log.taskName} <span style={{ color: '#888', fontWeight: 400 }}>({log.skill})</span></div>
                                    <div style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>{new Date(log.timestamp).toLocaleString()}</div>
                                    <div style={{ whiteSpace: "pre-wrap", fontSize: 16, color: '#444' }}>
                                        {log.log.length > 100 ? log.log.slice(0, 100) + '...' : log.log}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
                <Modal open={!!modalLog} onClose={handleModalClose} log={modalLog} onFeedback={handleFeedback} />
                <div style={{ marginTop: 40 }}>
                    <Link href="/dashboard">
                        <button className="btn btn-secondary">← Back to Dashboard</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
