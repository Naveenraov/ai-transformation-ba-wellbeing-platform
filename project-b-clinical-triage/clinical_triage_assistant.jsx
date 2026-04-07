import { useState } from "react";

const CONCERNS = [
  "Anxiety", "Depression", "Stress / burnout", "Trauma / PTSD",
  "Relationship issues", "Sleep problems", "Self-harm thoughts",
  "Suicidal ideation", "Substance use", "Grief / loss",
  "Eating concerns", "Work / career"
];

const styles = {
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    maxWidth: 760,
    margin: "0 auto",
    padding: "1.5rem 1rem 2rem",
    color: "#1a1a1a",
  },
  header: {
    display: "flex", alignItems: "center", gap: 12,
    marginBottom: "1.75rem", paddingBottom: "1rem",
    borderBottom: "1px solid #e5e5e5",
  },
  logoPill: {
    background: "#e6f1fb", color: "#185fa5",
    fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
    padding: "4px 10px", borderRadius: 20,
  },
  headerTitle: { fontSize: 17, fontWeight: 600, margin: 0 },
  headerSub: { fontSize: 12, color: "#666", marginTop: 2 },
  statusDot: {
    display: "inline-block", width: 7, height: 7,
    borderRadius: "50%", background: "#3B6D11", marginRight: 5,
  },
  card: {
    background: "#fff", border: "1px solid #e5e5e5",
    borderRadius: 12, padding: "1.25rem", marginBottom: "1rem",
  },
  sectionLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.07em",
    color: "#888", textTransform: "uppercase", marginBottom: 10,
  },
  fieldRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 },
  fieldRow2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 12, color: "#666" },
  input: {
    fontFamily: "inherit", fontSize: 13, padding: "7px 10px",
    border: "1px solid #ddd", borderRadius: 8,
    background: "#f9f9f9", color: "#1a1a1a", outline: "none",
  },
  textarea: {
    width: "100%", fontFamily: "inherit", fontSize: 13,
    padding: "9px 10px", border: "1px solid #ddd", borderRadius: 8,
    background: "#f9f9f9", color: "#1a1a1a", resize: "vertical",
    minHeight: 80, outline: "none", lineHeight: 1.5, marginTop: 8,
    boxSizing: "border-box",
  },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 },
  chip: (selected) => ({
    fontSize: 12, padding: "5px 10px",
    border: selected ? "1px solid #185fa5" : "1px solid #ddd",
    borderRadius: 20, cursor: "pointer",
    background: selected ? "#e6f1fb" : "#fff",
    color: selected ? "#185fa5" : "#666",
    userSelect: "none", transition: "all 0.1s",
  }),
  submitBtn: (disabled) => ({
    width: "100%", padding: 12,
    background: disabled ? "#ccc" : "#1a1a1a",
    color: "#fff", border: "none", borderRadius: 8,
    fontFamily: "inherit", fontSize: 14, fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    marginTop: 4,
  }),
  resultCard: { border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden", marginTop: "1rem" },
  resultHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0.9rem 1.25rem", borderBottom: "1px solid #e5e5e5", background: "#f9f9f9",
  },
  badge: (level) => {
    const map = {
      "Urgent": { bg: "#fcebeb", color: "#a32d2d" },
      "Safety Alert": { bg: "#fcebeb", color: "#a32d2d" },
      "Moderate": { bg: "#faeeda", color: "#854f0b" },
      "Routine": { bg: "#eaf3de", color: "#3b6d11" },
    };
    const s = map[level] || map["Routine"];
    return {
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 12, fontWeight: 600, padding: "4px 12px",
      borderRadius: 20, background: s.bg, color: s.color,
    };
  },
  resultBody: { padding: "1.25rem" },
  sectionTitle: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "#888", marginBottom: 6,
  },
  divider: { height: 1, background: "#e5e5e5", margin: "1rem 0" },
  actionItem: { fontSize: 13, display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5 },
  actionDot: {
    display: "inline-block", width: 5, height: 5, borderRadius: "50%",
    background: "#888", marginTop: 6, flexShrink: 0,
  },
  clinicianNote: {
    background: "#faeeda", border: "1px solid #f5c475",
    borderRadius: 8, padding: "10px 12px", fontSize: 12,
    color: "#854f0b", marginTop: "1rem", display: "flex",
    alignItems: "flex-start", gap: 8,
  },
  safetyAlert: {
    background: "#fcebeb", border: "1px solid #f0a0a0",
    borderRadius: 8, padding: "10px 12px", fontSize: 12,
    color: "#a32d2d", marginTop: "1rem", display: "flex",
    alignItems: "flex-start", gap: 8,
  },
  govFooter: {
    marginTop: "1rem", paddingTop: "0.75rem",
    borderTop: "1px solid #e5e5e5",
    display: "flex", alignItems: "center",
    justifyContent: "space-between", flexWrap: "wrap", gap: 8,
  },
  govTag: { fontSize: 11, color: "#999" },
  newBtn: {
    fontFamily: "inherit", fontSize: 12, padding: "5px 12px",
    border: "1px solid #ddd", borderRadius: 8,
    background: "#fff", color: "#666", cursor: "pointer",
  },
  metaRow: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: "0.75rem" },
  metaItem: { fontSize: 12, color: "#666" },
  demoTag: { fontSize: 11, color: "#bbb", textAlign: "center", marginTop: "0.75rem", fontFamily: "monospace" },
  loadingRow: { display: "flex", alignItems: "center", gap: 10, padding: "1.5rem 1.25rem", fontSize: 13, color: "#666" },
};

export default function App() {
  const [age, setAge] = useState("");
  const [referral, setReferral] = useState("");
  const [service, setService] = useState("");
  const [risk, setRisk] = useState("");
  const [duration, setDuration] = useState("");
  const [freetext, setFreetext] = useState("");
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toggleConcern = (c) => {
    setSelectedConcerns(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const reset = () => {
    setAge(""); setReferral(""); setService(""); setRisk("");
    setDuration(""); setFreetext(""); setSelectedConcerns([]);
    setResult(null); setError(null);
  };

  const runTriage = async () => {
    if (!age || !referral || !service || !risk || selectedConcerns.length === 0) {
      alert("Please fill in patient details, select at least one presenting concern, and set the risk level.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    const prompt = `You are a clinical triage AI assistant at Spectrum.Life, a digital mental health and wellbeing platform. You support clinical intake coordinators — you never replace clinical judgement.

Intake data:
- Age: ${age}
- Referral type: ${referral}
- Service requested: ${service}
- Presenting concerns: ${selectedConcerns.join(", ")}
- Duration: ${duration || "not specified"}
- Clinical risk level entered: ${risk}
- Intake notes: ${freetext || "none provided"}

Respond ONLY in valid JSON with this exact structure (no markdown, no backticks):
{
  "triage_level": "Urgent" or "Moderate" or "Routine" or "Safety Alert",
  "summary": "2-sentence plain-language summary of the clinical picture",
  "recommended_pathway": "Specific recommended next step",
  "actions": ["action 1", "action 2", "action 3"],
  "clinician_note": "Brief note for the reviewing clinician. Flag GDPR Article 9 data handling if relevant.",
  "safety_flag": true or false,
  "safety_message": "Only populate if safety_flag is true. Specific safety protocol to follow."
}

Be concise, clinically grounded, and risk-aware. Flag safeguarding concerns clearly.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const raw = data.content.map(b => b.text || "").join("");
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult({ ...parsed, _meta: { age, referral, service, risk, concerns: selectedConcerns } });
    } catch (err) {
      setError("Unable to reach Claude API. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IE", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <span style={styles.logoPill}>Spectrum.Life</span>
        <div>
          <p style={styles.headerTitle}>Clinical Intake Triage Assistant</p>
          <p style={styles.headerSub}>
            <span style={styles.statusDot} />
            Powered by Claude (Anthropic) · Human-in-the-loop · GDPR compliant
          </p>
        </div>
      </div>

      {!result && !loading && (
        <>
          <div style={styles.card}>
            <div style={styles.sectionLabel}>Patient details</div>
            <div style={styles.fieldRow}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Age</label>
                <input style={styles.input} type="number" placeholder="e.g. 34" value={age} onChange={e => setAge(e.target.value)} min="16" max="99" />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Referral type</label>
                <select style={styles.input} value={referral} onChange={e => setReferral(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Self-referral</option>
                  <option>GP referral</option>
                  <option>Employer EAP</option>
                  <option>University welfare</option>
                  <option>Insurance</option>
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Service needed</label>
                <select style={styles.input} value={service} onChange={e => setService(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Counselling</option>
                  <option>Psychiatry</option>
                  <option>Crisis support</option>
                  <option>Coaching</option>
                  <option>Wellbeing check-in</option>
                </select>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.sectionLabel}>Presenting concerns</div>
            <div style={styles.chipRow}>
              {CONCERNS.map(c => (
                <span key={c} style={styles.chip(selectedConcerns.includes(c))} onClick={() => toggleConcern(c)}>
                  {c}
                </span>
              ))}
            </div>
            <textarea
              style={styles.textarea}
              placeholder="Describe the situation in the patient's own words or as reported at intake..."
              value={freetext}
              onChange={e => setFreetext(e.target.value)}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.sectionLabel}>Risk & safety indicators</div>
            <div style={styles.fieldRow2}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Risk level (clinical assessment)</label>
                <select style={styles.input} value={risk} onChange={e => setRisk(e.target.value)}>
                  <option value="">Select...</option>
                  <option>No immediate risk</option>
                  <option>Low — monitor</option>
                  <option>Moderate — review needed</option>
                  <option>High — urgent response</option>
                  <option>Crisis — immediate action</option>
                </select>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Duration of presenting issue</label>
                <select style={styles.input} value={duration} onChange={e => setDuration(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Recent (less than 2 weeks)</option>
                  <option>Short-term (2–8 weeks)</option>
                  <option>Ongoing (2–6 months)</option>
                  <option>Long-standing (6+ months)</option>
                </select>
              </div>
            </div>
          </div>

          <button style={styles.submitBtn(false)} onClick={runTriage}>
            Run triage assessment
          </button>
          <div style={styles.demoTag}>demo · naveen rao v · ai transformation partner portfolio · spectrum.life</div>
        </>
      )}

      {loading && (
        <div style={styles.resultCard}>
          <div style={styles.loadingRow}>
            <div style={{ width: 16, height: 16, border: "2px solid #ddd", borderTopColor: "#666", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
            Claude is analysing the intake data...
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {error && (
        <div style={styles.resultCard}>
          <div style={{ padding: "1.25rem" }}>
            <p style={{ color: "#a32d2d", fontSize: 13 }}>{error}</p>
            <button style={{ ...styles.newBtn, marginTop: 12 }} onClick={reset}>← Back to form</button>
          </div>
        </div>
      )}

      {result && (
        <div style={styles.resultCard}>
          <div style={styles.resultHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={styles.badge(result.triage_level)}>{result.triage_level}</span>
              <span style={{ fontSize: 12, color: "#666" }}>
                Age {result._meta.age} · {result._meta.referral} · {result._meta.service}
              </span>
            </div>
            <span style={{ fontSize: 11, color: "#999", fontFamily: "monospace" }}>{dateStr} {timeStr}</span>
          </div>
          <div style={styles.resultBody}>
            <div style={styles.metaRow}>
              <div style={styles.metaItem}>
                Concerns: <strong>{result._meta.concerns.join(", ")}</strong>
              </div>
              <div style={styles.metaItem}>
                Risk entered: <strong>{result._meta.risk}</strong>
              </div>
            </div>
            <div style={styles.divider} />

            <div style={{ marginBottom: "1rem" }}>
              <div style={styles.sectionTitle}>Clinical picture</div>
              <p style={{ fontSize: 13, lineHeight: 1.6 }}>{result.summary}</p>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <div style={styles.sectionTitle}>Recommended pathway</div>
              <p style={{ fontSize: 13, lineHeight: 1.6 }}>{result.recommended_pathway}</p>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <div style={styles.sectionTitle}>Next actions</div>
              {(result.actions || []).map((a, i) => (
                <div key={i} style={styles.actionItem}>
                  <span style={styles.actionDot} />
                  <span style={{ fontSize: 13 }}>{a}</span>
                </div>
              ))}
            </div>

            {result.safety_flag && result.safety_message && (
              <div style={styles.safetyAlert}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>⚠</span>
                <span><strong>Safety protocol activated:</strong> {result.safety_message}</span>
              </div>
            )}

            {result.clinician_note && (
              <div style={styles.clinicianNote}>
                <span style={{ fontSize: 14, flexShrink: 0 }}>ℹ</span>
                <span>{result.clinician_note}</span>
              </div>
            )}

            <div style={styles.govFooter}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={styles.govTag}>Human review required</span>
                <span style={styles.govTag}>·</span>
                <span style={styles.govTag}>GDPR Art. 9</span>
                <span style={styles.govTag}>·</span>
                <span style={styles.govTag}>AI-assisted · not a clinical decision</span>
              </div>
              <button style={styles.newBtn} onClick={reset}>← New assessment</button>
            </div>
          </div>
        </div>
      )}
      <div style={styles.demoTag}>demo · naveen rao v · ai transformation partner portfolio · spectrum.life</div>
    </div>
  );
}
