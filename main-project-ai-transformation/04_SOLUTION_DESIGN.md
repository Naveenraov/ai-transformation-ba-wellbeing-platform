# 04 — Solution Design
## AI Workflow Architecture & Agentforce Integration Design

**Document type:** Solution Design  
**Author:** Naveen Rao V — AI Transformation Partner  
**Version:** 1.0 · April 2026  
**Audience:** IT · Development Partners · Clinical Governance · Programme Steering Group

---

## Design Philosophy

Every solution in this document is designed around three constraints:

**1. Human-in-the-loop always.** No AI output triggers an action without a human reviewing and confirming. AI recommends; humans decide.

**2. Structured outputs only.** Every Claude workflow returns JSON. Not prose. Not summaries. Machine-readable, loggable, auditable structured data.

**3. Fail safe, not fail silent.** If the AI layer is unavailable, the manual workflow is presented immediately. The service never stops.

---

## Solution Architecture Overview

```
MEMBER CONTACT
     │
     ▼
┌─────────────────────────────────────────────┐
│           SPECTRUM.LIFE PLATFORM             │
│  (App · Phone · WhatsApp · Chat · Email)    │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         SALESFORCE CASE MANAGEMENT           │
│  Intake record created · Member verified    │
└────────┬──────────────────────┬─────────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐   ┌─────────────────────┐
│  CLAUDE AI LAYER │   │  AGENTFORCE LAYER   │
│  (Anthropic API) │   │  (Salesforce)       │
│                 │   │                     │
│ · Triage Assist │   │ · Case Routing Agent│
│ · Session Docs  │   │ · Booking Workflows │
│ · Referral Gen  │   │ · Waitlist Mgmt     │
│ · Prompt Library│   │ · Report Generation │
└────────┬────────┘   └──────────┬──────────┘
         │                       │
         ▼                       ▼
┌─────────────────────────────────────────────┐
│           HUMAN REVIEW LAYER                 │
│  Case Manager · Counsellor · Clinical Lead  │
│  Every AI output reviewed before action     │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│         AUDIT & GOVERNANCE LAYER             │
│  All decisions logged · GDPR compliant      │
│  Timestamp · Reviewer · Override tracked    │
└─────────────────────────────────────────────┘
```

---

## Workstream 2 — Claude AI Workflow Designs

### Workflow 1: Clinical Intake Triage Assistant

**Trigger:** Case Manager opens new intake record in Salesforce  
**Actor:** Case Manager (reviewer) · Claude (recommender)

#### Process Flow

```
1. Case Manager completes intake form in Salesforce
   │ Fields: Age · Referral type · Service · Concerns · Risk · Duration · Notes
   │
2. Intake data passed to Claude API via structured prompt
   │ Model: claude-sonnet-4 · Max tokens: 1000
   │ Output format: JSON (enforced in prompt)
   │
3. Claude returns structured triage output
   │ Fields: triage_level · summary · recommended_pathway
   │          actions · safety_flag · safety_message · clinician_note
   │
4. Output rendered in Salesforce Case Manager view
   │ Triage badge (colour-coded) · Pathway · Actions · Safety alert if flagged
   │
5. Case Manager reviews, edits if needed, confirms
   │ Override available at every field
   │
6. Confirmed output saved to Salesforce case record
   │ Logged with: timestamp · reviewer name · AI version · any overrides
   │
7. If safety_flag = true → escalation notification triggered immediately
   │ Senior clinician alerted · Protocol steps displayed
```

#### Prompt Design (Production Version)

```
ROLE DEFINITION:
You are a clinical triage AI assistant at Spectrum.Life,
a digital mental health and wellbeing platform.
You support clinical intake coordinators —
you never replace clinical judgement.

INTAKE DATA BLOCK:
- Age: {age}
- Referral type: {referral_type}
- Service requested: {service}
- Presenting concerns: {concerns}
- Duration: {duration}
- Clinical risk level entered: {risk_level}
- Intake notes: {free_text}

OUTPUT SCHEMA (JSON only, no markdown):
{
  "triage_level": "Urgent|Moderate|Routine|Safety Alert",
  "summary": "2-sentence clinical picture",
  "recommended_pathway": "specific next step with timeframe",
  "actions": ["action1", "action2", "action3"],
  "clinician_note": "reviewer note — flag GDPR Art.9 if applicable",
  "safety_flag": true|false,
  "safety_message": "protocol — only if safety_flag true"
}

QUALITY CONSTRAINT:
Be concise, clinically grounded, and risk-aware.
Flag safeguarding concerns clearly.
```

#### Error Handling
- API timeout (>10s) → manual triage form presented · API retry in background
- Invalid JSON returned → output rejected · Case Manager notified · manual mode
- safety_flag = true but safety_message empty → escalation triggered regardless · error logged

---

### Workflow 2: Session Documentation Assistant

**Trigger:** Counsellor selects "Generate session note" after session  
**Actor:** Counsellor (reviewer) · Claude (drafter)

#### Process Flow

```
1. Counsellor inputs bullet-point session summary (minimum 3 bullets)
   │ Free-text input field in Salesforce
   │
2. Case context automatically pulled from Salesforce
   │ Member ID · Previous session count · Open risk flags
   │
3. Claude generates structured session note draft
   │ Sections: Presenting issues · Interventions · Member response
   │           Risk status · Next session plan · Escalation flags
   │
4. Draft presented to counsellor in editable format
   │ Every section editable · AI draft clearly labelled
   │
5. Counsellor reviews, edits, and approves
   │ Approval required before save
   │
6. Approved note saved to Salesforce · Metadata tagged
   │ ai_assisted: true · edited: true/false · approved_by: [name]
```

#### Prompt Design

```
You are a clinical documentation assistant at Spectrum.Life.
Draft a structured session note based on the counsellor's
bullet points below. Write in professional clinical language.
Never add clinical assumptions beyond what is provided.

Counsellor input:
{bullet_points}

Context from case record:
- Session number: {session_number}
- Open risk flags: {risk_flags}

Return JSON only:
{
  "presenting_issues": "...",
  "interventions_used": "...",
  "member_response": "...",
  "risk_status": "...",
  "next_session_plan": "...",
  "escalation_flag": true|false,
  "escalation_note": "only if escalation_flag true"
}
```

---

### Workflow 3: Referral Letter Generator

**Trigger:** Clinician selects "Generate referral letter" from case record  
**Actor:** Clinician (approver) · Claude (drafter)

#### Process Flow

```
1. Clinician selects referral type: GP · Psychiatry · Inpatient · Long-term therapy
   │
2. Salesforce automatically pulls:
   │ Triage summary · Session notes · Risk history · Intervention record
   │
3. Claude generates complete referral letter
   │ Sections: Clinical picture · Intervention history
   │           Current risk · Reason for referral · Urgency
   │
4. If urgency = high → senior clinician notified immediately
   │ Target: reviewed within 15 minutes
   │
5. Clinician reviews and approves letter
   │ No automated sending · Human sign-off required
   │
6. Letter sent · Logged in Salesforce with approver and timestamp
```

---

## Workstream 1 — Agentforce Agent Designs

### Agent 1: Case Routing & Counsellor Matching Agent

**Agent type:** Autonomous with human confirmation step  
**Platform:** Salesforce Agentforce  
**Trigger:** Triage assessment confirmed by Case Manager

#### Agent Logic

```
INPUT: Confirmed triage output from Salesforce case record

STEP 1 — Extract matching criteria
  Read: presenting_issue · language_preference · session_format
         specialism_required · urgency_level · location (if F2F)

STEP 2 — Query counsellor network
  Filter: Active counsellors · Correct specialism · Language match
  Check: Real-time availability · Next available slot

STEP 3 — Score and rank matches
  Score criteria: Specialism fit (40%) · Availability speed (30%)
                  Language match (20%) · Location (10%)
  Return: Top 3 matches with availability slots

STEP 4 — Present to Case Manager
  Display: Counsellor name · Specialism · Languages · Next 3 slots
  Action required: Case Manager selects and confirms

STEP 5 — Execute booking
  Send: Confirmation to member (email/SMS/WhatsApp)
  Send: Booking notification to counsellor
  Update: Salesforce case record
  Set: Reminder workflow (24hr before session)

STEP 6 — Handle no availability
  If no match within 48 hours → add to waitlist
  Notify member of expected wait · Assign to next available match
  Alert Case Manager daily until resolved
```

#### Salesforce Configuration Requirements
- Custom object: CounsellorAvailability (real-time sync)
- Custom field: SpecialismTags (multi-select picklist)
- Flow: BookingConfirmationFlow (triggered on routing confirmation)
- Agentforce topic: CaseRouting
- Agentforce actions: QueryAvailability · RankMatches · SendConfirmation · ManageWaitlist

---

### Agent 2: Automated Reporting Agent

**Agent type:** Scheduled with human review before distribution  
**Platform:** Salesforce Agentforce + Reports & Dashboards  
**Trigger:** Scheduled — 1st of each month · On-demand for ad hoc requests

#### Agent Logic

```
STEP 1 — Aggregate data from Salesforce
  Pull: Utilisation by client · Session volumes · Outcome scores
        AI triage completions · Routing decisions · Cost savings

STEP 2 — Calculate KPIs against targets
  Compare: Actual vs. target for all 7 programme objectives
  Flag: Any metric below 80% of target as amber/red

STEP 3 — Generate client-specific sections
  For each active employer/university/insurer:
  Pull: Their utilisation · Top presenting issues · Outcome summary

STEP 4 — Compose CEO/CPO one-pager
  Format: RAG status · Top 3 wins · Top 3 risks · Month-on-month

STEP 5 — Route for human review
  Send draft to programme team · 48hr review window
  Approved → distributed to stakeholders
```

---

## Integration Architecture

### Claude API Integration

| Component | Specification |
|---|---|
| Endpoint | `api.anthropic.com/v1/messages` |
| Model | `claude-sonnet-4-20250514` |
| Authentication | API key — stored in Salesforce Named Credentials |
| Max tokens | 1,000 (triage) · 1,500 (session docs) · 2,000 (referral letters) |
| Timeout | 10 seconds — fallback to manual on breach |
| Rate limiting | Monitor via Anthropic console · Alert at 80% quota |
| Logging | All API calls logged to Salesforce custom object: AIAuditLog |

### Salesforce Integration Points

| Integration | Type | Direction | Frequency |
|---|---|---|---|
| Triage output → Case record | Salesforce Flow | Write | On confirmation |
| Counsellor availability | External API sync | Read | Every 15 minutes |
| Session notes → Case record | Salesforce Flow | Write | On approval |
| Reporting data aggregation | Scheduled Flow | Read | Daily at midnight |
| Member booking confirmation | Email/SMS alert | Write | On booking |

---

## Technology Decisions & Rationale

| Decision | Choice | Rationale |
|---|---|---|
| AI model | Claude Sonnet 4 | Best balance of clinical reasoning quality and response speed |
| Output format | JSON only | Machine-readable, auditable, UI-renderable — not free-form prose |
| Human confirmation layer | Required on every output | Clinical context — AI recommends, human decides |
| Salesforce as system of record | All AI outputs written back | Single source of truth, audit trail, no parallel systems |
| Graceful degradation | Manual fallback on API failure | 24/7 service cannot depend on third-party uptime |

---

*Document 04 of 06 · Spectrum.Life AI Transformation Programme · Naveen Rao V · April 2026*
