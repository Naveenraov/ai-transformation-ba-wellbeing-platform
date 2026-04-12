import { useState, useRef } from "react";

const TEAL = "#0D7A7A";
const NAVY = "#1B2A4A";
const LTEAL = "#E8F5F5";
const GOLD = "#C9A84C";
const LGOLD = "#FDF8EE";
const WHITE = "#FFFFFF";
const LGREY = "#F3F4F6";
const MGREY = "#6B7280";
const RED = "#DC2626";
const AMBER = "#D97706";
const GREEN = "#059669";
const LRED = "#FEF2F2";
const LAMBER = "#FFFBEB";
const LGREEN = "#F0FDF4";

const URGENCY_CONFIG = {
  CRITICAL: { color: RED, bg: LRED, label: "CRITICAL", icon: "⚠", border: "#DC2626" },
  URGENT: { color: AMBER, bg: LAMBER, label: "URGENT", icon: "●", border: "#D97706" },
  ROUTINE: { color: GREEN, bg: LGREEN, label: "ROUTINE", icon: "○", border: "#059669" },
  ADMIN: { color: MGREY, bg: LGREY, label: "ADMIN", icon: "◇", border: "#6B7280" },
};

const SAMPLE_MESSAGES = `Message 1:
Hi, I reached out last week about support for anxiety at work. My manager said I should contact you again as things have gotten worse. I've been having panic attacks before meetings and haven't slept properly in 2 weeks. I'm not sure I can keep going like this. Please can someone call me today?

Message 2:
Hello, could you please confirm my counselling appointment for Thursday 15th at 2pm with Dr. Walsh? I just want to make sure it's still going ahead. Thanks, James.

Message 3:
I need to reschedule my session next week as I have a work trip. Could we move it to the following week instead? Any day works for me. Thanks.`;

const SAMPLE_SUMMARY = "Member called regarding work-related stress and relationship difficulties with their line manager. They described feeling overwhelmed and unable to switch off from work. No risk concerns identified. Member engaged well and was receptive to support.";

async function callClaude(systemPrompt, userMessage) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}

function parseTriageCards(text) {
  const cards = [];
  const sections = text.split(/(?=MESSAGE\s*\d+|TRIAGE CARD\s*\d*|---)/i).filter(s => s.trim());
  
  for (const section of sections) {
    if (!section.trim() || section.trim() === "---") continue;
    
    const card = {};
    
    const msgMatch = section.match(/(?:MESSAGE\s*(?:NUMBER[:\s]*)?|#\s*)(\d+)/i);
    if (msgMatch) card.number = msgMatch[1];
    
    const urgencyMatch = section.match(/URGENCY(?:\s*LEVEL)?[:\s]+([A-Z]+)/i);
    if (urgencyMatch) {
      const u = urgencyMatch[1].toUpperCase();
      card.urgency = ["CRITICAL","URGENT","ROUTINE","ADMIN"].includes(u) ? u : "ROUTINE";
    }
    
    const typeMatch = section.match(/TYPE[:\s]+([^\n]+)/i);
    if (typeMatch) card.type = typeMatch[1].trim();
    
    const summaryMatch = section.match(/SUMMARY[:\s]+([^\n]+(?:\n(?![A-Z\s]+:)[^\n]+)*)/i);
    if (summaryMatch) card.summary = summaryMatch[1].trim();
    
    const actionMatch = section.match(/SUGGESTED\s*ACTION[:\s]+([^\n]+(?:\n(?![A-Z\s]+:)[^\n]+)*)/i);
    if (actionMatch) card.action = actionMatch[1].trim();
    
    const draftMatch = section.match(/DRAFT\s*RESPONSE[:\s]+([\s\S]+?)(?=GDPR|$)/i);
    if (draftMatch) card.draft = draftMatch[1].trim();
    
    const gdprMatch = section.match(/GDPR\s*FLAG[:\s]+([^\n]+)/i);
    if (gdprMatch) card.gdpr = gdprMatch[1].trim();
    
    if (card.urgency || card.type || card.summary) {
      cards.push(card);
    }
  }
  
  return cards.length > 0 ? cards : null;
}

function parseCaseNote(text) {
  const sections = {};
  const patterns = [
    ["presentingIssue", /PRESENTING\s*ISSUE[:\s]+([\s\S]+?)(?=CLINICAL\s*PRESENTATION|$)/i],
    ["clinicalPresentation", /CLINICAL\s*PRESENTATION[:\s]+([\s\S]+?)(?=RISK\s*ASSESSMENT|$)/i],
    ["riskAssessment", /RISK\s*ASSESSMENT[:\s]+([\s\S]+?)(?=INTERVENTION|$)/i],
    ["intervention", /INTERVENTION[:\s]+([\s\S]+?)(?=AGREED\s*PLAN|NEXT\s*STEPS|$)/i],
    ["agreedPlan", /(?:AGREED\s*PLAN|NEXT\s*STEPS)[:\s]+([\s\S]+?)(?=REFERRAL|FOLLOW|GDPR|$)/i],
    ["followUp", /FOLLOW[\s-]*UP[:\s]+([\s\S]+?)(?=GDPR|$)/i],
    ["gdpr", /GDPR[:\s]+([\s\S]+?)(?=NOTE\s*TO|$)/i],
  ];
  
  for (const [key, pattern] of patterns) {
    const match = text.match(pattern);
    if (match) sections[key] = match[1].trim().replace(/\n+/g, " ");
  }
  
  return Object.keys(sections).length > 2 ? sections : null;
}

// ── Components ──────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: "36px", height: "36px", borderRadius: "8px",
        background: `linear-gradient(135deg, ${TEAL}, ${NAVY})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px", fontWeight: "900", color: WHITE,
        letterSpacing: "-1px", fontFamily: "'Georgia', serif"
      }}>CF</div>
      <div>
        <div style={{ fontSize: "16px", fontWeight: "700", color: NAVY, letterSpacing: "-0.3px" }}>
          CaseFlow
        </div>
        <div style={{ fontSize: "10px", color: MGREY, letterSpacing: "0.5px", textTransform: "uppercase" }}>
          by Spectrum.Life
        </div>
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "10px 20px", border: "none", cursor: "pointer",
      borderRadius: "8px 8px 0 0",
      background: active ? WHITE : "transparent",
      color: active ? TEAL : MGREY,
      fontWeight: active ? "700" : "500",
      fontSize: "14px",
      borderBottom: active ? `3px solid ${TEAL}` : "3px solid transparent",
      transition: "all 0.2s",
      fontFamily: "inherit",
    }}>
      <span style={{ fontSize: "16px" }}>{icon}</span>
      {label}
    </button>
  );
}

function GovernanceBanner() {
  return (
    <div style={{
      background: LGOLD,
      border: `1px solid ${GOLD}`,
      borderRadius: "8px",
      padding: "10px 16px",
      display: "flex", alignItems: "flex-start", gap: "10px",
      marginBottom: "20px",
    }}>
      <span style={{ fontSize: "16px", marginTop: "1px" }}>🛡️</span>
      <div style={{ fontSize: "12px", color: "#92400E", lineHeight: "1.5" }}>
        <strong>Governance reminder:</strong> CaseFlow drafts — clinicians decide. 
        Every output requires Case Manager review and approval before filing or sending. 
        No clinical decisions are made by Claude. Human-in-the-loop is mandatory.
      </div>
    </div>
  );
}

function UrgencyBadge({ level }) {
  const config = URGENCY_CONFIG[level] || URGENCY_CONFIG.ROUTINE;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px", borderRadius: "999px",
      background: config.bg, color: config.color,
      fontSize: "11px", fontWeight: "700", letterSpacing: "0.8px",
      border: `1px solid ${config.border}`,
    }}>
      {config.icon} {config.label}
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} style={{
      padding: "5px 12px", borderRadius: "6px", border: `1px solid ${TEAL}`,
      background: copied ? TEAL : WHITE, color: copied ? WHITE : TEAL,
      fontSize: "11px", fontWeight: "600", cursor: "pointer",
      transition: "all 0.2s", fontFamily: "inherit",
    }}>
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function TriageCard({ card, index }) {
  const [expanded, setExpanded] = useState(true);
  const config = URGENCY_CONFIG[card.urgency] || URGENCY_CONFIG.ROUTINE;
  
  return (
    <div style={{
      border: `1px solid`,
      borderColor: card.urgency === "CRITICAL" ? RED : "#E5E7EB",
      borderLeft: `4px solid ${config.border}`,
      borderRadius: "10px",
      background: WHITE,
      overflow: "hidden",
      boxShadow: card.urgency === "CRITICAL" ? `0 0 0 2px ${LRED}` : "0 1px 3px rgba(0,0,0,0.06)",
      marginBottom: "14px",
    }}>
      {/* Card header */}
      <div style={{
        padding: "12px 16px",
        background: card.urgency === "CRITICAL" ? LRED : LGREY,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer",
      }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", color: MGREY }}>
            MSG {card.number || index + 1}
          </span>
          <UrgencyBadge level={card.urgency} />
          {card.type && (
            <span style={{
              fontSize: "11px", color: NAVY, background: LTEAL,
              padding: "2px 8px", borderRadius: "4px", fontWeight: "500"
            }}>
              {card.type}
            </span>
          )}
          {card.gdpr && card.gdpr.toLowerCase().includes("yes") && (
            <span style={{
              fontSize: "11px", color: "#7C3AED", background: "#F3F0FF",
              padding: "2px 8px", borderRadius: "4px", fontWeight: "600",
              border: "1px solid #DDD6FE"
            }}>
              ⚠ GDPR Art.9
            </span>
          )}
        </div>
        <span style={{ color: MGREY, fontSize: "12px" }}>{expanded ? "▲" : "▼"}</span>
      </div>
      
      {expanded && (
        <div style={{ padding: "16px" }}>
          {card.summary && (
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: MGREY, letterSpacing: "0.8px", marginBottom: "4px", textTransform: "uppercase" }}>Summary</div>
              <div style={{ fontSize: "13px", color: NAVY, lineHeight: "1.5" }}>{card.summary}</div>
            </div>
          )}
          {card.action && (
            <div style={{ marginBottom: "12px", background: LTEAL, padding: "10px 12px", borderRadius: "6px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: TEAL, letterSpacing: "0.8px", marginBottom: "4px", textTransform: "uppercase" }}>Suggested Action</div>
              <div style={{ fontSize: "13px", color: NAVY, lineHeight: "1.5", fontWeight: "500" }}>{card.action}</div>
            </div>
          )}
          {card.draft && (
            <div style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: MGREY, letterSpacing: "0.8px", textTransform: "uppercase" }}>Draft Response</div>
                <CopyButton text={card.draft} />
              </div>
              <div style={{
                fontSize: "13px", color: NAVY, lineHeight: "1.6",
                background: LGREY, padding: "10px 12px", borderRadius: "6px",
                borderLeft: `3px solid ${TEAL}`, whiteSpace: "pre-wrap"
              }}>{card.draft}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CaseNoteSection({ label, content, highlight }) {
  if (!content) return null;
  return (
    <div style={{
      marginBottom: "14px",
      background: highlight ? LTEAL : LGREY,
      borderRadius: "8px", padding: "12px 14px",
      borderLeft: highlight ? `3px solid ${TEAL}` : "none",
    }}>
      <div style={{ fontSize: "10px", fontWeight: "700", color: highlight ? TEAL : MGREY, letterSpacing: "0.8px", marginBottom: "6px", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: "13px", color: NAVY, lineHeight: "1.6" }}>{content}</div>
    </div>
  );
}

function LoadingSpinner({ message }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{
        width: "40px", height: "40px", margin: "0 auto 16px",
        border: `3px solid ${LTEAL}`,
        borderTop: `3px solid ${TEAL}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <div style={{ fontSize: "14px", color: TEAL, fontWeight: "600" }}>{message}</div>
      <div style={{ fontSize: "12px", color: MGREY, marginTop: "4px" }}>Claude is working...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Module 1: Inbox Triage ──────────────────────────────────────────────────
function InboxTriage() {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(null);
  const [rawOutput, setRawOutput] = useState("");
  const [error, setError] = useState(null);
  const [showRaw, setShowRaw] = useState(false);

  const handleTriage = async () => {
    if (!messages.trim()) return;
    setLoading(true);
    setCards(null);
    setError(null);
    setRawOutput("");

    const systemPrompt = `You are an experienced EAP clinical administrator at Spectrum.Life, a 24/7 Employee Assistance Programme serving organisations across the UK and Ireland. You support Case Managers by triaging their shared inbox messages.

For each message provided, generate a structured triage card. Use EXACTLY this format for each message:

MESSAGE NUMBER: [1, 2, 3, etc.]
URGENCY LEVEL: [CRITICAL / URGENT / ROUTINE / ADMIN]
- CRITICAL: Risk to life, immediate clinical intervention needed, safeguarding concern
- URGENT: Distressed member, crisis indicators, needs same-day response  
- ROUTINE: Standard referral or follow-up, respond within 24 hours
- ADMIN: Scheduling, information request, no clinical concern
TYPE: [NEW REFERRAL / EXISTING CASE UPDATE / SCHEDULING REQUEST / INFORMATION REQUEST / CLINICAL ESCALATION / ADMIN QUERY]
SUMMARY: [One sentence — what is this message actually about?]
SUGGESTED ACTION: [Specific action the Case Manager should take]
DRAFT RESPONSE: [A warm, professional, appropriate response the Case Manager can review and send]
GDPR FLAG: [Yes / No — does this contain Article 9 special category health data?]

---

IMPORTANT BOUNDARIES:
- Do not make clinical assessments or risk diagnoses
- CRITICAL and URGENT flags must always be reviewed by the Case Manager before any action
- Draft responses are suggestions only — the Case Manager reviews and approves before sending
- Never include clinical diagnoses in draft responses
- Separate each triage card with ---`;

    try {
      const result = await callClaude(systemPrompt, `Please triage these messages:\n\n${messages}`);
      setRawOutput(result);
      const parsed = parseTriageCards(result);
      setCards(parsed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const criticalCount = cards?.filter(c => c.urgency === "CRITICAL").length || 0;
  const urgentCount = cards?.filter(c => c.urgency === "URGENT").length || 0;

  return (
    <div>
      <GovernanceBanner />
      
      {/* Input area */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label style={{ fontSize: "13px", fontWeight: "700", color: NAVY }}>
            Paste messages for triage
          </label>
          <button onClick={() => setMessages(SAMPLE_MESSAGES)} style={{
            fontSize: "11px", color: TEAL, background: "none", border: "none",
            cursor: "pointer", fontWeight: "600", textDecoration: "underline", fontFamily: "inherit"
          }}>Load sample messages</button>
        </div>
        <textarea
          value={messages}
          onChange={e => setMessages(e.target.value)}
          placeholder="Paste one or more messages here. Label each as 'Message 1:', 'Message 2:', etc. for best results."
          style={{
            width: "100%", minHeight: "180px", padding: "14px",
            border: `1px solid #E5E7EB`, borderRadius: "8px",
            fontSize: "13px", lineHeight: "1.6", color: NAVY,
            fontFamily: "inherit", resize: "vertical", outline: "none",
            background: WHITE, boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <div style={{ fontSize: "11px", color: MGREY }}>
            💡 Tip: You can paste multiple messages at once. Label them Message 1, Message 2, etc.
          </div>
          <button onClick={handleTriage} disabled={loading || !messages.trim()} style={{
            padding: "10px 24px", background: loading ? MGREY : TEAL,
            color: WHITE, border: "none", borderRadius: "8px",
            fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit", letterSpacing: "-0.2px",
            transition: "all 0.2s",
          }}>
            {loading ? "Triaging..." : "Triage Messages →"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Classifying urgency and drafting responses..." />}

      {/* Error */}
      {error && (
        <div style={{ background: LRED, border: `1px solid ${RED}`, borderRadius: "8px", padding: "14px 16px", color: RED, fontSize: "13px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Results summary */}
      {cards && (
        <>
          <div style={{
            display: "flex", gap: "10px", marginBottom: "16px",
            padding: "14px", background: LGREY, borderRadius: "8px",
            alignItems: "center", flexWrap: "wrap"
          }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: NAVY, marginRight: "8px" }}>
              {cards.length} message{cards.length !== 1 ? "s" : ""} triaged
            </div>
            {criticalCount > 0 && (
              <span style={{ fontSize: "12px", fontWeight: "700", color: RED, background: LRED, padding: "3px 10px", borderRadius: "99px", border: `1px solid ${RED}` }}>
                ⚠ {criticalCount} CRITICAL
              </span>
            )}
            {urgentCount > 0 && (
              <span style={{ fontSize: "12px", fontWeight: "700", color: AMBER, background: LAMBER, padding: "3px 10px", borderRadius: "99px", border: `1px solid ${AMBER}` }}>
                {urgentCount} URGENT
              </span>
            )}
            <span style={{ fontSize: "11px", color: MGREY, marginLeft: "auto" }}>
              Review each card — approve actions and responses before acting
            </span>
          </div>

          {criticalCount > 0 && (
            <div style={{
              background: LRED, border: `2px solid ${RED}`, borderRadius: "8px",
              padding: "12px 16px", marginBottom: "16px",
              display: "flex", alignItems: "center", gap: "10px"
            }}>
              <span style={{ fontSize: "20px" }}>⚠️</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: RED }}>Critical contact detected</div>
                <div style={{ fontSize: "12px", color: "#991B1B" }}>
                  Review CRITICAL triage card immediately. Clinical judgement required before any action.
                </div>
              </div>
            </div>
          )}

          {cards.map((card, i) => <TriageCard key={i} card={card} index={i} />)}

          <div style={{ marginTop: "8px", textAlign: "right" }}>
            <button onClick={() => setShowRaw(!showRaw)} style={{
              fontSize: "11px", color: MGREY, background: "none", border: "none",
              cursor: "pointer", textDecoration: "underline", fontFamily: "inherit"
            }}>
              {showRaw ? "Hide" : "Show"} raw Claude output
            </button>
          </div>
          {showRaw && (
            <pre style={{ marginTop: "8px", fontSize: "11px", color: MGREY, background: LGREY, padding: "12px", borderRadius: "6px", overflow: "auto", whiteSpace: "pre-wrap" }}>
              {rawOutput}
            </pre>
          )}
        </>
      )}
    </div>
  );
}

// ── Module 2: Case Note Generator ──────────────────────────────────────────
function CaseNoteGenerator() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    contactType: "Phone Call",
    duration: "25 minutes",
    summary: SAMPLE_SUMMARY,
  });
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [rawOutput, setRawOutput] = useState("");
  const [error, setError] = useState(null);
  const [showRaw, setShowRaw] = useState(false);

  const update = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleGenerate = async () => {
    if (!formData.summary.trim()) return;
    setLoading(true);
    setNote(null);
    setError(null);
    setRawOutput("");

    const systemPrompt = `You are a clinical documentation specialist supporting Spectrum.Life's EAP Case Manager team. Your role is to generate structured, audit-ready case notes from brief call summaries provided by Case Managers.

Generate a complete case note using EXACTLY this format:

PRESENTING ISSUE
[Factual description of reason for contact. No assumptions beyond what was stated.]

CLINICAL PRESENTATION
[Observable indicators noted during contact — tone, engagement, affect. Clinical language. Factual only. No diagnoses.]

RISK ASSESSMENT
Risk level: [LOW / MEDIUM / HIGH / CRITICAL]
Basis for assessment: [Brief, evidence-based rationale]
Risk factors noted: [List if any, or "None identified"]
Protective factors noted: [List if any]

INTERVENTION PROVIDED
[What support was offered and provided during this contact]

AGREED PLAN AND NEXT STEPS
[What was agreed with the member. Timeline. Who is responsible for each action.]

FOLLOW-UP REQUIRED
[Yes/No — if yes, specify by whom and within what timeframe]

GDPR DATA NOTE
[State: "This case note contains special category health data. Handle in accordance with Spectrum.Life's GDPR Article 9 clinical data policy."]

NOTE TO CASE MANAGER: This case note was generated from your summary and requires your review and approval before filing. Please verify accuracy, add any detail omitted from your summary, and initial before saving to the case record.

IMPORTANT: Write in professional clinical language. Be factual and objective. Do not include diagnoses or treatment recommendations. Keep the risk assessment grounded in what was actually observed or stated.`;

    const userMessage = `Please generate a case note from this call summary:

Date of Contact: ${formData.date}
Contact Type: ${formData.contactType}
Duration: ${formData.duration}
Case Manager Summary: ${formData.summary}`;

    try {
      const result = await callClaude(systemPrompt, userMessage);
      setRawOutput(result);
      const parsed = parseCaseNote(result);
      setNote(parsed ? parsed : { raw: result });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fullNote = note ? `CASE NOTE
Date of Contact: ${formData.date}
Contact Type: ${formData.contactType}
Duration: ${formData.duration}

${rawOutput}` : "";

  return (
    <div>
      <GovernanceBanner />

      {/* Form */}
      <div style={{
        background: LGREY, borderRadius: "10px", padding: "16px",
        marginBottom: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px"
      }}>
        <div>
          <label style={{ fontSize: "11px", fontWeight: "700", color: MGREY, display: "block", marginBottom: "5px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Date of Contact</label>
          <input type="date" value={formData.date} onChange={e => update("date", e.target.value)} style={{
            width: "100%", padding: "8px 10px", border: `1px solid #E5E7EB`, borderRadius: "6px",
            fontSize: "13px", color: NAVY, fontFamily: "inherit", background: WHITE, boxSizing: "border-box"
          }} />
        </div>
        <div>
          <label style={{ fontSize: "11px", fontWeight: "700", color: MGREY, display: "block", marginBottom: "5px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Contact Type</label>
          <select value={formData.contactType} onChange={e => update("contactType", e.target.value)} style={{
            width: "100%", padding: "8px 10px", border: `1px solid #E5E7EB`, borderRadius: "6px",
            fontSize: "13px", color: NAVY, fontFamily: "inherit", background: WHITE, boxSizing: "border-box"
          }}>
            {["Phone Call", "Video Call", "WhatsApp", "Live Chat", "SMS", "In-Person"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: "11px", fontWeight: "700", color: MGREY, display: "block", marginBottom: "5px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Duration</label>
          <input type="text" value={formData.duration} onChange={e => update("duration", e.target.value)} placeholder="e.g. 25 minutes" style={{
            width: "100%", padding: "8px 10px", border: `1px solid #E5E7EB`, borderRadius: "6px",
            fontSize: "13px", color: NAVY, fontFamily: "inherit", background: WHITE, boxSizing: "border-box"
          }} />
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label style={{ fontSize: "13px", fontWeight: "700", color: NAVY }}>
            Your call summary
          </label>
          <button onClick={() => update("summary", SAMPLE_SUMMARY)} style={{
            fontSize: "11px", color: TEAL, background: "none", border: "none",
            cursor: "pointer", fontWeight: "600", textDecoration: "underline", fontFamily: "inherit"
          }}>Load sample summary</button>
        </div>
        <textarea
          value={formData.summary}
          onChange={e => update("summary", e.target.value)}
          placeholder="Write 2-5 sentences describing what happened on the call — who contacted you, presenting issue, what support was offered, and any next steps agreed. Claude will generate the full structured note."
          style={{
            width: "100%", minHeight: "120px", padding: "14px",
            border: `1px solid #E5E7EB`, borderRadius: "8px",
            fontSize: "13px", lineHeight: "1.6", color: NAVY,
            fontFamily: "inherit", resize: "vertical", outline: "none",
            background: WHITE, boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
          <div style={{ fontSize: "11px", color: MGREY }}>
            💡 Tip: 2-5 sentences is enough. Claude generates the full structured note from your summary.
          </div>
          <button onClick={handleGenerate} disabled={loading || !formData.summary.trim()} style={{
            padding: "10px 24px", background: loading ? MGREY : TEAL,
            color: WHITE, border: "none", borderRadius: "8px",
            fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit", letterSpacing: "-0.2px",
          }}>
            {loading ? "Generating..." : "Generate Case Note →"}
          </button>
        </div>
      </div>

      {loading && <LoadingSpinner message="Generating structured case note..." />}

      {error && (
        <div style={{ background: LRED, border: `1px solid ${RED}`, borderRadius: "8px", padding: "14px 16px", color: RED, fontSize: "13px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {note && (
        <div>
          {/* Note header */}
          <div style={{
            background: NAVY, borderRadius: "10px 10px 0 0",
            padding: "14px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: WHITE }}>Case Note Generated</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>
                {formData.date} · {formData.contactType} · {formData.duration}
              </div>
            </div>
            <CopyButton text={fullNote} />
          </div>

          {/* Review banner */}
          <div style={{
            background: LAMBER, borderLeft: `4px solid ${AMBER}`, padding: "10px 16px",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            <span style={{ fontSize: "14px" }}>👁️</span>
            <div style={{ fontSize: "12px", color: "#92400E", fontWeight: "500" }}>
              <strong>Review required before filing.</strong> Verify accuracy, add any omitted detail, and initial before saving to the case record.
            </div>
          </div>

          {/* Note content */}
          <div style={{ border: `1px solid #E5E7EB`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "16px", background: WHITE }}>
            {note.raw ? (
              <pre style={{ fontSize: "13px", color: NAVY, lineHeight: "1.7", whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                {note.raw}
              </pre>
            ) : (
              <>
                <CaseNoteSection label="Presenting Issue" content={note.presentingIssue} highlight={false} />
                <CaseNoteSection label="Clinical Presentation" content={note.clinicalPresentation} highlight={false} />
                <CaseNoteSection label="Risk Assessment" content={note.riskAssessment} highlight={true} />
                <CaseNoteSection label="Intervention Provided" content={note.intervention} highlight={false} />
                <CaseNoteSection label="Agreed Plan & Next Steps" content={note.agreedPlan} highlight={true} />
                <CaseNoteSection label="Follow-Up Required" content={note.followUp} highlight={false} />
                {note.gdpr && (
                  <div style={{
                    marginTop: "12px", padding: "10px 14px",
                    background: "#F3F0FF", borderRadius: "6px",
                    border: "1px solid #DDD6FE",
                    fontSize: "11px", color: "#7C3AED"
                  }}>
                    <strong>🔐 GDPR Article 9:</strong> {note.gdpr}
                  </div>
                )}
              </>
            )}
          </div>

          <div style={{ marginTop: "8px", textAlign: "right" }}>
            <button onClick={() => setShowRaw(!showRaw)} style={{
              fontSize: "11px", color: MGREY, background: "none", border: "none",
              cursor: "pointer", textDecoration: "underline", fontFamily: "inherit"
            }}>
              {showRaw ? "Hide" : "Show"} raw Claude output
            </button>
          </div>
          {showRaw && (
            <pre style={{ marginTop: "8px", fontSize: "11px", color: MGREY, background: LGREY, padding: "12px", borderRadius: "6px", overflow: "auto", whiteSpace: "pre-wrap" }}>
              {rawOutput}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// ── About Panel ─────────────────────────────────────────────────────────────
function AboutPanel() {
  return (
    <div style={{ maxWidth: "680px" }}>
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #0D3B6E 100%)`,
        borderRadius: "12px", padding: "24px", marginBottom: "20px", color: WHITE
      }}>
        <div style={{ fontSize: "20px", fontWeight: "800", marginBottom: "8px", letterSpacing: "-0.5px" }}>
          CaseFlow — Project I
        </div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
          A live Claude-powered Case Manager assistant built by Naveen Rao V as part of the AI Transformation Partner portfolio for Spectrum.Life.
        </div>
      </div>

      <div style={{ background: WHITE, border: `1px solid #E5E7EB`, borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", color: NAVY, marginBottom: "14px" }}>The problem this solves</div>
        {[
          ["📥 Inbox Triage", "Case Managers receive 30-50 messages per day across email, WhatsApp, and chat. Every message is read and actioned manually. That's 35-45 minutes of admin before a single member is helped."],
          ["📝 Case Note Writing", "After every call, Case Managers write case notes from scratch. Inconsistent format, time-consuming, and a drain on qualified psychotherapists who should be focused on members."],
        ].map(([title, desc]) => (
          <div key={title} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: `1px solid #F3F4F6` }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: TEAL, marginBottom: "4px" }}>{title}</div>
            <div style={{ fontSize: "13px", color: MGREY, lineHeight: "1.5" }}>{desc}</div>
          </div>
        ))}
      </div>

      <div style={{ background: LGOLD, border: `1px solid ${GOLD}`, borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: "#92400E", marginBottom: "8px" }}>The CaseFlow principle</div>
        <div style={{ fontSize: "13px", color: "#92400E", lineHeight: "1.6" }}>
          CaseFlow gives every Case Manager 1.5-2.5 hours of clinical time back every day. Not by replacing clinical judgement — by eliminating the admin that surrounds it. <strong>Claude drafts. Clinicians decide.</strong>
        </div>
      </div>

      <div style={{ background: LGREY, borderRadius: "10px", padding: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: "700", color: NAVY, marginBottom: "10px" }}>Governance built-in</div>
        {[
          ["🛡️ Human-in-the-loop", "Every output requires Case Manager review before filing or sending"],
          ["🔐 GDPR Article 9 flags", "Health data flagged automatically on every triage card"],
          ["⚕️ Clinical boundary", "No clinical decisions — only drafts and classifications"],
          ["📋 Audit trail", "Full Salesforce integration designed for every output"],
        ].map(([label, desc]) => (
          <div key={label} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: TEAL, minWidth: "160px" }}>{label}</div>
            <div style={{ fontSize: "13px", color: MGREY }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function CaseFlow() {
  const [activeTab, setActiveTab] = useState("triage");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8FAFC",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: WHITE,
        borderBottom: `1px solid #E5E7EB`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 0",
          }}>
            <Logo />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: GREEN, boxShadow: `0 0 0 2px ${LGREEN}`
              }} />
              <span style={{ fontSize: "11px", color: MGREY, fontWeight: "500" }}>
                Claude API · Live
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", paddingTop: "4px" }}>
            <TabButton label="Inbox Triage" icon="📥" active={activeTab === "triage"} onClick={() => setActiveTab("triage")} />
            <TabButton label="Case Note Generator" icon="📝" active={activeTab === "notes"} onClick={() => setActiveTab("notes")} />
            <TabButton label="About" icon="ℹ" active={activeTab === "about"} onClick={() => setActiveTab("about")} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "24px 20px" }}>

        {/* Module title */}
        {activeTab !== "about" && (
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{
              fontSize: "22px", fontWeight: "800", color: NAVY,
              margin: "0 0 6px", letterSpacing: "-0.5px"
            }}>
              {activeTab === "triage" ? "Inbox Triage Assistant" : "Case Note Generator"}
            </h1>
            <p style={{ fontSize: "13px", color: MGREY, margin: 0, lineHeight: "1.5" }}>
              {activeTab === "triage"
                ? "Paste Case Manager messages — Claude classifies urgency, drafts responses, and flags GDPR Article 9 data. Review and approve before acting."
                : "Enter your call summary — Claude generates a complete, structured, audit-ready case note. Review and approve before filing."}
            </p>
          </div>
        )}

        {activeTab === "triage" && <InboxTriage />}
        {activeTab === "notes" && <CaseNoteGenerator />}
        {activeTab === "about" && <AboutPanel />}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid #E5E7EB`,
        padding: "12px 20px",
        textAlign: "center",
        background: WHITE,
        marginTop: "20px"
      }}>
        <div style={{ fontSize: "11px", color: MGREY }}>
          CaseFlow · Project I · Built by <strong style={{ color: TEAL }}>Naveen Rao V</strong> · AI Transformation Partner Portfolio · Spectrum.Life · April 2026
        </div>
      </div>
    </div>
  );
}
