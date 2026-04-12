# Project I — CaseFlow: Live Claude Demo
### Case Manager Assistant | Inbox Triage + Case Note Generator
### Spectrum.Life | AI Transformation Partner Portfolio | Naveen Rao V | April 2026

---

## What This Is

A working, live, Claude-powered tool that solves a real named pain point for Spectrum.Life's Case Manager team — demonstrable in Stephen's interview with real inputs and real outputs.

Unlike Projects D–H which are documents and frameworks, **Project I is a functioning artifact**. You open it, you use it, you show Stephen what Claude actually does for his team today.

---

## The Two Modules

### Module 1 — Inbox Triage Assistant
Paste Case Manager emails or messages. Claude reads them, classifies each by urgency (Critical / Urgent / Routine / Admin) and type, drafts a suggested response, and flags any GDPR Article 9 health data. What takes 45 minutes manually takes 3 minutes to review and approve.

### Module 2 — Case Note Generator
Type a 2-5 sentence call summary. Claude generates a full, structured, audit-ready case note covering: Presenting Issue, Clinical Presentation, Risk Assessment, Intervention, Agreed Plan, Follow-Up, and GDPR data note. Review and approve before filing.

---

## The Problem This Solves

Spectrum.Life's Case Managers are fully qualified psychotherapists. Research from job descriptions, Glassdoor reviews, and operational analysis confirms they spend an estimated 40-50% of their working day on admin:

| Pain Point | Current State | With CaseFlow |
|------------|--------------|---------------|
| Inbox triage | 30-50 messages/day, all manual, 35-45 min | 3 minutes to review Claude's triage cards |
| Case note writing | Written from scratch after every call, 25-40 min | 2-sentence summary in → full structured note out |
| **Total daily admin** | **~80 min minimum** | **~15 minutes review time** |

**Aggregate impact:** Each Case Manager recovers 1.5–2.5 hours of clinical time per day. Across a team of 10–15, that's the equivalent of 2–4 additional clinical FTEs without new headcount.

---

## Governance Built In

CaseFlow is designed for a regulated clinical environment from the ground up:

- **Human-in-the-loop:** Every output requires Case Manager review before filing or sending
- **GDPR Article 9 flags:** Health data flagged automatically on every triage card
- **Clinical boundary:** No clinical decisions — only drafts and classifications
- **Audit trail:** Designed for Salesforce DHOS integration
- **Disclaimer:** Review-required banner on every case note generated

> **The CaseFlow principle:** Claude drafts. Clinicians decide. Always.

---

## Demo Script — For Stephen's Round

### Before you open the tool (30 seconds)

*"Stephen, I want to show you something concrete. You mentioned wanting to automate 40-60% of operational tasks. I looked at where your Case Managers actually spend their time and I built this."*

### Module 1 — Inbox Triage Demo (3 minutes)

*"Here are three messages a Case Manager might receive on a Monday morning. Normally they'd read every one, decide what to do, and respond manually — that's 35-45 minutes before they've seen a single client."*

→ Load the sample messages or paste your own
→ Click Triage Messages
→ Wait for results

*"Look at what Claude does. Each message is classified by urgency — that third one is flagged Critical, meaning this member needs a same-day response. GDPR Article 9 data flagged automatically. Draft responses ready to review."*

*"The Case Manager looks at this queue — doesn't decide from scratch — just reviews and approves. 3 minutes instead of 45. That's the principle across everything we automate here."*

### Module 2 — Case Note Demo (2 minutes)

*"After every call, Case Managers write notes from scratch — inconsistent format, 25-40 minutes, and that's a qualified psychotherapist doing admin instead of helping people."*

→ Load the sample summary or type your own
→ Click Generate Case Note
→ Show the output

*"2-sentence summary in. Full structured, audit-ready case note out. Risk assessment. Presenting issue. Agreed plan. GDPR note. The Case Manager reviews it — doesn't write it."*

*"This one tool alone gives each Case Manager 1.5 hours of clinical time back every day. Across your team of 10-15, that's 15-22 hours of clinical capacity recovered daily — without hiring a single person."*

### Closing line

*"This is what I mean when I talk about automating 40-60% of operational tasks. Not replacing people — giving them back the hours they spend on tasks a machine can do, so they can focus on the work that changes and saves lives."*

---

## Files

| File | Contents |
|------|----------|
| `project-i-caseflow.jsx` | Live React artifact — runs in Claude.ai directly |

---

## Technical Notes

- Built as a React artifact using the Claude API (claude-sonnet-4-20250514)
- No external dependencies beyond React
- Runs directly in Claude.ai artifact window — no setup required
- Sample messages and summaries pre-loaded for demo use
- Governance messaging built into every component
- GDPR flags surface automatically from Claude's classification

---

## About the Author

**Naveen Rao V** — Business Analyst | AI & Automation | Dublin, Ireland

6+ years BA experience. MSc Data Analytics, NCI Dublin. Certified ScrumMaster. Google Prompting Essentials + Claude 101.

Portfolio: [github.com/Naveenraov/ai-transformation-ba-wellbeing-platform](https://github.com/Naveenraov/ai-transformation-ba-wellbeing-platform)

---

*Part of the AI Transformation Partner Portfolio — Spectrum.Life Interview Preparation | April 2026*
