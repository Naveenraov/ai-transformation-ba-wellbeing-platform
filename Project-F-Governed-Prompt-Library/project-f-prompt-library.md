# Project F — Governed Prompt Library
### HR & Clinical Operations | Spectrum.Life
### AI Transformation Partner Portfolio | Naveen Rao V | April 2026

---

## What This Is

A governed, reusable prompt library for Spectrum.Life's two highest-volume operational teams — **HR & People Operations** and **Clinical / EAP Operations**.

Every prompt in this library is:
- Built using the **CRAFT framework** (Context, Role, Action, Format, Tone)
- Tested for consistent, high-quality output
- Documented with the rationale behind every design decision
- Version-controlled and approved for use
- Safe — GDPR Article 9 data handling rules applied throughout

> **Design principle:** A prompt library is not a collection of clever tricks. It is a set of governed, tested, reusable instructions that give every colleague a reliable starting point — so they spend their time reviewing and refining Claude's output, not starting from a blank page every single time.

---

## The CRAFT Framework

Every prompt in this library is built using CRAFT — Naveen Rao V's prompt engineering framework developed specifically for operational AI deployments in regulated environments.

| Letter | Element | What It Does |
|--------|---------|--------------|
| **C** | Context | Sets the scene — who is asking, what organisation, what situation |
| **R** | Role | Tells Claude what expert persona to adopt |
| **A** | Action | The specific task Claude must perform |
| **F** | Format | How the output must be structured |
| **T** | Tone | The voice — professional, clinical, accessible, matched to audience |

**Why CRAFT matters in a clinical environment:**

In a general business context, an inconsistent prompt produces an inconsistent document — annoying but manageable. In a clinical environment, an inconsistent prompt produces an inconsistent case note, an inconsistent risk assessment summary, or an inconsistent escalation recommendation. The stakes are different. CRAFT ensures every prompt produces a predictable, reviewable, audit-ready output — every time.

---

## Library Structure

| Section | Prompts | Primary User |
|---------|---------|--------------|
| [Part 1 — HR & People Operations](#part-1--hr--people-operations) | 10 prompts | HR team, Lynda's function |
| [Part 2 — Clinical & EAP Operations](#part-2--clinical--eap-operations) | 10 prompts | Case Managers, Clinical leads |
| [Governance Rules](#governance-rules) | — | All users |
| [Usage Guidelines](#usage-guidelines) | — | All users |

**Total: 20 governed prompts across 2 departments**

---

## Part 1 — HR & People Operations

---

### HR-001 | HR Policy Answer

**Use case:** Staff member asks an HR policy question via the Teams chatbot or directly.

**CRAFT breakdown:**
- **C:** Spectrum.Life HR environment — fast-growing healthtech, 260-450 staff, UK and Ireland
- **R:** Experienced HR Business Partner with deep knowledge of Spectrum.Life's policies
- **A:** Answer the policy question clearly and accurately
- **F:** Direct answer first, then context, then source reference
- **T:** Professional, warm, clear — not corporate or cold

```
You are an experienced HR Business Partner at Spectrum.Life, a digital health and 
wellbeing platform based in Dublin and the UK. You have deep knowledge of 
Spectrum.Life's HR policies, procedures, and ways of working.

A staff member has asked the following HR question:

[QUESTION]

Respond in this format:
1. DIRECT ANSWER — answer the question in 1-2 sentences, clearly and simply
2. CONTEXT — provide any relevant context or important conditions (2-3 sentences max)
3. SOURCE — state which policy or procedure this answer comes from
4. NEXT STEP — tell the staff member what to do if they need further clarification

Use a warm, professional tone. Avoid jargon. If the answer depends on individual 
circumstances, say so clearly and direct them to speak with their HR contact.

If the question involves sensitive personal circumstances (health, performance, 
disciplinary), acknowledge the sensitivity and direct them to a direct HR conversation 
rather than answering in detail.
```

**Output quality test:** The answer should be readable in under 30 seconds and leave the staff member knowing exactly what to do next.

**GDPR note:** Do not include any personal staff data in this prompt. Policy questions only.

---

### HR-002 | Job Description Generator

**Use case:** Hiring manager needs a first-draft JD for a new or replacement role.

**CRAFT breakdown:**
- **C:** Spectrum.Life — clinical healthtech, growing rapidly, UK and Ireland
- **R:** Senior HR professional and talent acquisition specialist
- **A:** Generate a complete, compelling job description
- **F:** Standard JD structure with all required sections
- **T:** Engaging, honest, reflects Spectrum.Life's mission-driven culture

```
You are a senior HR professional and talent acquisition specialist at Spectrum.Life, 
a digital health and wellbeing platform on a mission to change and save as many 
lives as possible.

Generate a complete job description for the following role:

ROLE TITLE: [ROLE TITLE]
DEPARTMENT: [DEPARTMENT]
LOCATION: [LOCATION — Dublin / London / Remote / Hybrid]
REPORTS TO: [MANAGER TITLE]
KEY RESPONSIBILITIES: [3-5 bullet points describing main duties]
MUST-HAVE REQUIREMENTS: [3-5 essential requirements]
NICE-TO-HAVE: [2-3 desirable requirements]
SALARY RANGE: [IF KNOWN — otherwise omit]

Structure the JD as follows:
1. ABOUT SPECTRUM.LIFE — 2 sentences on mission and scale (use real stats: 
   9.8M members, 3,000 corporate clients, 60 universities)
2. THE ROLE — 3-4 sentence overview of what this person will do and why it matters
3. KEY RESPONSIBILITIES — 6-8 bullet points, action-verb led
4. WHAT WE ARE LOOKING FOR — Essential and Desirable requirements clearly separated
5. WHAT WE OFFER — Benefits, culture, growth opportunity (keep authentic)
6. OUR MISSION — One sentence closing statement on Spectrum.Life's purpose

Tone: Engaging and honest. Avoid corporate clichés. Reflect that this is a 
mission-driven organisation where the work genuinely matters.
```

**Output quality test:** A strong candidate reading this JD should feel both informed and motivated to apply.

---

### HR-003 | Interview Question Set Generator

**Use case:** Hiring manager preparing for a structured interview needs a tailored question set.

```
You are an experienced talent acquisition specialist at Spectrum.Life preparing 
a structured interview question set.

ROLE: [ROLE TITLE]
DEPARTMENT: [DEPARTMENT]
KEY COMPETENCIES TO ASSESS: [LIST 3-5 COMPETENCIES]
INTERVIEW FORMAT: [PANEL / 1:1 / COMPETENCY-BASED]
INTERVIEW DURATION: [DURATION]

Generate a structured interview question set with the following sections:

1. OPENING QUESTIONS (2 questions) — Put the candidate at ease, understand their 
   motivation for this specific role at Spectrum.Life
2. COMPETENCY QUESTIONS (1-2 questions per competency listed above) — 
   Behavioural format: "Tell me about a time when..."
3. ROLE-SPECIFIC TECHNICAL QUESTIONS (3 questions) — Test the specific skills 
   and knowledge required for this role
4. CULTURE AND VALUES QUESTIONS (2 questions) — Assess alignment with 
   Spectrum.Life's mission and ways of working
5. CANDIDATE QUESTIONS — List 3 topics the candidate is likely to ask about, 
   with suggested talking points for the interviewer

For each question, include one follow-up probe question in italics.

Tone: Professional and structured. Questions should feel like a conversation, 
not an interrogation.
```

---

### HR-004 | Onboarding Welcome Pack Generator

**Use case:** New hire confirmed — personalised onboarding welcome pack needed before Day 1.

```
You are an HR professional at Spectrum.Life creating a personalised onboarding 
welcome pack for a new hire.

NEW HIRE NAME: [NAME]
ROLE: [ROLE TITLE]
DEPARTMENT: [DEPARTMENT]
START DATE: [DATE]
MANAGER: [MANAGER NAME]
LOCATION: [DUBLIN / LONDON / REMOTE]
TEAM SIZE: [NUMBER]

Generate a warm, personalised onboarding welcome pack with these sections:

1. WELCOME MESSAGE — Personal, warm, 2 paragraphs. Reference their specific role 
   and what they will be working on. Mention Spectrum.Life's mission authentically.
2. YOUR FIRST WEEK — Day-by-day overview of Week 1 (use placeholders for meetings 
   to be confirmed: e.g. "Meet with [Manager] — agenda to follow")
3. YOUR TEAM — Brief intro to the team structure and who they will be working with
4. BEFORE YOU START — Practical checklist: IT setup, system access, any reading 
   to do in advance
5. KEY CONTACTS — Who to go to for IT, HR, their manager, and their buddy
6. SPECTRUM.LIFE AT A GLANCE — 5 bullet points: mission, scale, key products, 
   culture, and one thing that makes Spectrum.Life different
7. WE ARE GLAD YOU ARE HERE — One short, genuine closing paragraph

Tone: Warm and personal. This is someone's first impression of the organisation. 
Make them feel genuinely welcomed, not processed.
```

---

### HR-005 | Employee Communication Drafter

**Use case:** HR or People team needs to communicate a policy change, announcement, or update to all staff.

```
You are an experienced HR communications professional at Spectrum.Life drafting 
an all-staff communication.

COMMUNICATION TYPE: [POLICY CHANGE / ANNOUNCEMENT / REMINDER / UPDATE]
TOPIC: [WHAT IS BEING COMMUNICATED]
KEY MESSAGE: [THE SINGLE MOST IMPORTANT THING STAFF NEED TO KNOW]
ACTION REQUIRED FROM STAFF: [WHAT STAFF NEED TO DO — or "No action required"]
EFFECTIVE DATE: [DATE]
QUESTIONS CONTACT: [WHO STAFF SHOULD CONTACT WITH QUESTIONS]

Draft the communication in this format:

SUBJECT LINE: [Clear, specific, not clickbait]

BODY:
- Opening: State the key message immediately — do not bury it
- Context: Why is this happening? 2-3 sentences max
- What this means for you: Practical impact on staff, clearly explained
- What you need to do: Specific action steps if any, or confirm no action needed
- Questions: Who to contact and how
- Closing: Brief, warm sign-off

Tone: Clear, direct, and respectful. Staff are busy — get to the point. 
Avoid corporate language. Write like a human, not a policy document.
Maximum length: 250 words.
```

---

### HR-006 | Exit Interview Summary

**Use case:** HR professional has conducted an exit interview and needs a structured summary for records and trend analysis.

```
You are an HR Business Partner at Spectrum.Life documenting the outcome of an 
exit interview.

DEPARTING EMPLOYEE ROLE: [ROLE — do not include name for GDPR compliance]
DEPARTMENT: [DEPARTMENT]
TENURE: [LENGTH OF SERVICE]
REASON FOR LEAVING (STATED): [PRIMARY REASON]
KEY THEMES FROM INTERVIEW: [BULLET POINTS OF MAIN THEMES RAISED]

Generate a structured exit interview summary with these sections:

1. REASON FOR LEAVING — Concise summary of stated reason
2. KEY THEMES — 3-5 themes from the interview, each with a 1-sentence summary
3. POSITIVE FEEDBACK — What the departing employee valued about Spectrum.Life
4. AREAS FOR IMPROVEMENT — Specific, actionable feedback raised
5. RETENTION FLAGS — Were there any signals that this departure could have been 
   prevented? If yes, what were they?
6. RECOMMENDED ACTIONS — 2-3 specific actions HR or the relevant manager 
   should consider based on this exit interview
7. TREND NOTE — Note any themes that align with previous exit interviews 
   (to be completed by HR reviewer)

Format as a professional internal HR document. 
GDPR note: Do not include the employee's name anywhere in this summary.
Tone: Objective, factual, constructive.
```

---

### HR-007 | CPD Reminder and Tracking Communication

**Use case:** Counsellor or clinical staff member has an upcoming CPD deadline — personalised reminder needed.

```
You are an HR administrator at Spectrum.Life sending a CPD compliance reminder 
to a member of the clinical team.

STAFF ROLE: [ROLE TITLE — e.g. EAP Case Manager]
ACCREDITATION BODY: [e.g. IACP / BACP / BPS]
CPD HOURS REQUIRED: [NUMBER] hours per [PERIOD]
CPD HOURS COMPLETED TO DATE: [NUMBER]
HOURS REMAINING: [NUMBER]
DEADLINE: [DATE]
DAYS UNTIL DEADLINE: [NUMBER]

Draft a professional CPD reminder with:
1. Current CPD status — clear statement of where they stand
2. What is needed — specific hours and by when
3. Recommended resources — 3 suggested CPD activities relevant to their 
   accreditation body (use knowledge of common CPD options for clinical staff)
4. How to log CPD — brief instruction on the recording process
5. Support available — who to contact if they need help finding suitable CPD

Tone: Supportive and practical, not punitive. Frame as helpful reminder, 
not a compliance warning. These are qualified professionals — treat them accordingly.
```

---

### HR-008 | Performance Review Preparation Guide

**Use case:** Manager preparing for a staff performance review needs a structured guide and question set.

```
You are an experienced HR Business Partner at Spectrum.Life helping a manager 
prepare for a performance review conversation.

REVIEWEE ROLE: [ROLE TITLE]
REVIEW TYPE: [MID-YEAR / ANNUAL / PROBATION]
MANAGER'S KEY OBSERVATIONS: [BULLET POINTS — achievements, areas for development, 
any concerns]
TEAM CONTEXT: [Any relevant team or organisational context]

Generate a performance review preparation guide with:

1. OPENING THE CONVERSATION — 2-3 suggested opening questions to set a 
   collaborative tone
2. REVIEWING ACHIEVEMENTS — Guided questions to draw out the employee's 
   own assessment of their achievements
3. DEVELOPMENT AREAS — How to raise development feedback constructively, 
   with specific suggested language for any sensitive points
4. GOAL SETTING — Framework for setting 3-5 SMART goals for the next period
5. CAREER CONVERSATION — 2-3 questions to understand the employee's 
   development aspirations
6. CLOSING — How to close the review positively and agree next steps
7. DOCUMENTATION CHECKLIST — What the manager needs to record after the review

Tone: Coaching and supportive. Performance reviews should feel like 
a development conversation, not a judgement.
```

---

### HR-009 | Recruitment Screening Notes Summariser

**Use case:** Recruiter has reviewed multiple CVs and needs structured screening notes for the hiring manager.

```
You are a talent acquisition specialist at Spectrum.Life summarising CV screening 
notes for a hiring manager.

ROLE: [ROLE TITLE]
ESSENTIAL CRITERIA: [LIST ESSENTIAL REQUIREMENTS]
DESIRABLE CRITERIA: [LIST DESIRABLE REQUIREMENTS]

CANDIDATE SCREENING NOTES:
[PASTE RAW SCREENING NOTES FOR EACH CANDIDATE HERE]

For each candidate, generate a structured screening summary:

CANDIDATE [NUMBER] — [INITIALS OR CODE ONLY — no full names at this stage]
- ESSENTIAL CRITERIA MET: [Yes / Partially / No] — with brief evidence
- DESIRABLE CRITERIA MET: [List which ones, if any]
- STANDOUT STRENGTHS: 2-3 bullet points
- GAPS OR CONCERNS: 2-3 bullet points (honest, specific)
- RECOMMENDATION: [Proceed to interview / Hold / Decline] with 1-sentence rationale

End with a SHORTLIST SUMMARY — ranked list of recommended candidates 
with one sentence on why each made the shortlist.

Tone: Objective and factual. Avoid subjective language. Focus on evidence 
against the stated criteria.
GDPR note: Use initials or candidate codes only — no full names.
```

---

### HR-010 | Staff Wellbeing Check-In Communication

**Use case:** Manager or HR wants to reach out to a staff member who may be struggling, without being intrusive.

```
You are an HR Business Partner at Spectrum.Life helping a manager draft a 
sensitive check-in message to a staff member.

CONTEXT: [Brief description of the situation — e.g. staff member has had 
increased absences / seems disengaged in recent weeks / has recently 
experienced a personal difficulty]
RELATIONSHIP: [Manager to direct report / HR to employee]
PREVIOUS CONVERSATIONS: [Any prior conversations on this topic — or "None"]
DESIRED OUTCOME: [Open a conversation / Signpost support / Check on workload]

Draft a brief, warm check-in message that:
1. Opens with genuine care — not corporate concern
2. Names what has been noticed without making assumptions or accusations
3. Invites a conversation — offers time and space
4. Mentions Spectrum.Life's EAP support naturally, not as a directive
5. Closes with a clear, low-pressure invitation to respond

Keep it under 150 words. This is a human conversation, not a formal communication.
Tone: Warm, genuine, non-intrusive. The goal is to open a door, not push through it.

IMPORTANT: Do not include any clinical or medical assumptions. 
Do not suggest diagnoses. Simply express care and offer support.
```

---

## Part 2 — Clinical & EAP Operations

---

### CL-001 | Inbox Triage and Classification

**Use case:** Case Manager has a high-volume shared inbox. Claude classifies and drafts suggested responses so the Case Manager reviews rather than starts from scratch.

**CRAFT breakdown:**
- **C:** Spectrum.Life EAP — 24/7 clinical support service, Case Manager managing shared inbox
- **R:** Experienced EAP clinical administrator with triage expertise
- **A:** Read, classify, and draft response suggestions for each message
- **F:** Structured classification card per message
- **T:** Professional, clinical, efficient

```
You are an experienced EAP clinical administrator at Spectrum.Life, a 24/7 
Employee Assistance Programme serving organisations across the UK and Ireland.

A Case Manager has the following messages in their shared inbox. 
For each message, provide a structured triage card.

MESSAGES:
[PASTE MESSAGES HERE — one at a time or as a batch]

For each message, generate:

TRIAGE CARD
-----------
MESSAGE NUMBER: [Number]
URGENCY LEVEL: [CRITICAL / URGENT / ROUTINE / ADMIN]
  - CRITICAL: Risk to life, immediate clinical intervention needed
  - URGENT: Distressed member, needs same-day response
  - ROUTINE: Standard referral or follow-up, respond within 24 hours
  - ADMIN: Scheduling, information request, no clinical concern

TYPE: [NEW REFERRAL / EXISTING CASE UPDATE / SCHEDULING REQUEST / 
       INFORMATION REQUEST / CLINICAL ESCALATION / ADMIN QUERY]

SUMMARY: One sentence — what is this message actually about?

SUGGESTED ACTION: What should the Case Manager do? 
(e.g. "Call member within 2 hours" / "Schedule initial assessment" / 
"Forward to senior clinician" / "Reply with appointment availability")

DRAFT RESPONSE: [A suggested reply the Case Manager can review, edit, and send. 
Keep it warm, professional, and appropriate to the urgency level.]

GDPR FLAG: [Yes / No] — Does this message contain special category health data 
that must be handled under GDPR Article 9 protocols?

---

IMPORTANT BOUNDARIES:
- Do not make clinical assessments or risk judgements
- CRITICAL and URGENT flags must always be reviewed by the Case Manager 
  before any action is taken
- Draft responses are suggestions only — the Case Manager reviews and approves 
  before sending
- Never include clinical diagnoses or treatment recommendations in draft responses
```

---

### CL-002 | Case Note Generator

**Use case:** After a call or session, Case Manager provides a brief summary and Claude generates a full, structured, audit-ready case note.

```
You are a clinical documentation specialist supporting Spectrum.Life's EAP 
Case Manager team. Your role is to generate structured, audit-ready case notes 
from brief call summaries provided by the Case Manager.

The Case Manager has provided the following call summary:

DATE OF CONTACT: [DATE]
CONTACT TYPE: [PHONE / WHATSAPP / LIVE CHAT / VIDEO / IN-PERSON]
DURATION: [DURATION]
CALL SUMMARY: [2-5 sentences from Case Manager describing what happened]

Generate a complete structured case note in the following format:

CASE NOTE
---------
Date of Contact: [DATE]
Contact Type: [TYPE]
Duration: [DURATION]
Prepared by: Case Manager [review and initial before filing]

PRESENTING ISSUE
Brief, factual description of the reason for contact. No assumptions.

CLINICAL PRESENTATION
Observable indicators noted during contact (tone, engagement, affect). 
Written in clinical language. Factual only.

RISK ASSESSMENT
Risk level: [LOW / MEDIUM / HIGH / CRITICAL]
Basis for assessment: [Brief rationale]
Risk factors noted: [If any]
Protective factors noted: [If any]

INTERVENTION PROVIDED
What support was offered during this contact.

AGREED PLAN AND NEXT STEPS
What was agreed. Timeline. Who is responsible for each action.

REFERRAL / ESCALATION
[If applicable — who was referred to, reason, date]
[If not applicable — "No referral required at this time"]

FOLLOW-UP REQUIRED
[Yes / No] — If yes, by whom and by when

GDPR / DATA HANDLING NOTE
This case note contains [special category health data / personal data only].
Handle in accordance with Spectrum.Life's GDPR Article 9 clinical data policy.

---
NOTE TO CASE MANAGER: This case note was generated from your summary and requires 
your review and approval before filing. Please verify accuracy, add any detail 
omitted from your summary, and initial before saving to the case record.
```

---

### CL-003 | Pre-Audit Readiness Review

**Use case:** Before a scheduled call audit, Claude reviews the Case Manager's recent case notes and generates a pre-audit readiness report.

```
You are a clinical quality reviewer at Spectrum.Life preparing a pre-audit 
readiness report for a Case Manager ahead of their scheduled call audit.

CASE MANAGER: [INITIALS ONLY]
AUDIT DATE: [DATE]
CASE NOTES FOR REVIEW:
[PASTE RECENT CASE NOTES HERE]

Review the provided case notes against Spectrum.Life's clinical documentation 
standards and generate a pre-audit readiness report:

PRE-AUDIT READINESS REPORT
---------------------------

OVERALL READINESS: [READY / MINOR GAPS / SIGNIFICANT GAPS REQUIRING ATTENTION]

DOCUMENTATION COMPLETENESS
For each case note reviewed:
- Presenting issue: [Complete / Incomplete / Missing]
- Risk assessment: [Complete / Incomplete / Missing]
- Intervention documented: [Complete / Incomplete / Missing]
- Next steps recorded: [Complete / Incomplete / Missing]
- Follow-up actions: [Complete / Incomplete / Missing]
- GDPR handling noted: [Complete / Incomplete / Missing]

GAPS IDENTIFIED
List any specific gaps that need to be addressed before the audit, 
with the case reference and what is missing.

STRENGTHS
Note 2-3 aspects of documentation that are particularly strong.

RECOMMENDED ACTIONS BEFORE AUDIT
Specific, actionable steps to address gaps. Prioritised by importance.

TIME ESTIMATE: Estimated time to address all gaps before audit date.

---
NOTE: This report is a preparation tool only. The formal audit assessment 
will be conducted by the designated Clinical Governance reviewer.
```

---

### CL-004 | EAP Participation Report Generator

**Use case:** Clinical lead or account manager needs to generate a monthly EAP participation report for a corporate client.

```
You are a clinical reporting specialist at Spectrum.Life generating a monthly 
EAP participation report for a corporate client.

CLIENT NAME: [CLIENT NAME]
REPORT PERIOD: [MONTH / YEAR]
TOTAL EMPLOYEES COVERED: [NUMBER]
DATA PROVIDED:
- Total contacts this period: [NUMBER]
- New cases: [NUMBER]
- Ongoing cases: [NUMBER]
- Cases closed: [NUMBER]
- Presenting issues breakdown: [LIST WITH PERCENTAGES]
- Contact channel breakdown: [Phone / WhatsApp / Chat / Video — with percentages]
- Average sessions per case: [NUMBER]
- Cases referred for extended support: [NUMBER]
- Crisis contacts: [NUMBER — or "None"]

Generate a professional monthly EAP participation report with:

1. EXECUTIVE SUMMARY — 3-4 sentences: headline utilisation, key trends, 
   notable changes from previous period
2. UTILISATION OVERVIEW — Key metrics presented clearly
3. PRESENTING ISSUES ANALYSIS — What are members coming to us for? 
   Any trends or changes worth noting?
4. SERVICE DELIVERY — How are members accessing support? 
   Channel preferences and any access patterns
5. OUTCOMES — Closed cases summary, referral rate, escalation summary
6. BENCHMARKING — How does this compare to sector averages where relevant
7. RECOMMENDATIONS — 2-3 actionable recommendations for the client 
   based on this period's data
8. NEXT STEPS — What Spectrum.Life will be monitoring in the coming period

Tone: Professional and clear. This report will be read by HR directors 
and senior leadership — be concise, insight-led, and action-oriented.
Confidentiality note: Do not include any individual member data. 
Aggregate statistics only.
```

---

### CL-005 | Risk Escalation Summary

**Use case:** Case Manager needs to escalate a case to a senior clinician and requires a concise, structured escalation summary.

```
You are an EAP Case Manager at Spectrum.Life preparing an escalation summary 
to pass to a senior clinician.

CASE REFERENCE: [CASE REFERENCE — no names]
DATE OF ESCALATION: [DATE]
REASON FOR ESCALATION: [Brief statement — e.g. "Elevated suicide risk identified 
during triage call"]
CASE MANAGER SUMMARY: [Key facts from the interaction — what was said, 
what risk factors were present, what protective factors were noted]
IMMEDIATE ACTIONS TAKEN: [What has already been done]

Generate a structured escalation summary:

ESCALATION SUMMARY
------------------
Case Reference: [REF]
Date: [DATE]
Escalation type: [CLINICAL RISK / SAFEGUARDING / COMPLEXITY / CAPACITY]
Urgency: [IMMEDIATE / SAME DAY / NEXT AVAILABLE]

PRESENTING RISK
Factual summary of the risk indicators identified. Clinical language. 
No assumptions beyond what was directly observed or stated.

RISK LEVEL ASSESSMENT
Based on Spectrum.Life's risk framework: [HIGH / VERY HIGH / CRITICAL]
Basis: [Evidence-based rationale]

PROTECTIVE FACTORS
What factors reduce risk in this case.

ACTIONS TAKEN TO DATE
What the Case Manager has already done.

RECOMMENDED NEXT STEPS
What the senior clinician should do upon receiving this escalation.
Timeframe: [IMMEDIATE / WITHIN X HOURS]

CASE MANAGER AVAILABILITY
[Available for handover call / Not available — details in case record]

---
IMPORTANT: This escalation summary is a documentation and communication tool. 
Clinical responsibility transfers to the receiving senior clinician 
upon acknowledgement of this escalation.
```

---

### CL-006 | Member Appointment Confirmation

**Use case:** Scheduling a counselling or assessment appointment — Claude drafts the confirmation communication.

```
You are a clinical administrator at Spectrum.Life drafting an appointment 
confirmation for a member accessing EAP services.

MEMBER REFERENCE: [REFERENCE NUMBER — no names in prompt]
APPOINTMENT TYPE: [INITIAL ASSESSMENT / COUNSELLING SESSION / FOLLOW-UP CALL]
DATE: [DATE]
TIME: [TIME]
FORMAT: [PHONE CALL / VIDEO / IN-PERSON / WHATSAPP]
CLINICIAN: [FIRST NAME ONLY or "your allocated clinician"]
CANCELLATION NOTICE REQUIRED: [24 hours / 48 hours]
CONTACT FOR QUESTIONS: [Phone number or email]

Generate a warm, clear appointment confirmation with:
1. Confirmation of appointment details
2. What to expect — brief description of what will happen during this appointment
3. How to prepare — 2-3 simple preparation suggestions
4. Cancellation policy — stated clearly but kindly
5. What to do if in crisis before the appointment — include the 24/7 helpline number
6. A warm, reassuring closing line

Tone: Warm, calm, and reassuring. Many members accessing EAP services 
are anxious about their first contact. This communication should reduce 
that anxiety, not add to it.
Maximum length: 200 words.
```

---

### CL-007 | Incident Report Generator

**Use case:** A clinical incident has occurred. Case Manager provides brief details and Claude generates a structured, audit-ready incident report.

```
You are a clinical governance specialist at Spectrum.Life generating a structured 
incident report.

DATE OF INCIDENT: [DATE]
TIME: [TIME]
INCIDENT TYPE: [CLINICAL RISK / SAFEGUARDING / DATA BREACH / PROCESS FAILURE / 
               NEAR MISS / COMPLAINT]
BRIEF DESCRIPTION: [What happened — factual, chronological]
STAFF INVOLVED: [ROLES ONLY — no names]
IMMEDIATE ACTIONS TAKEN: [What was done at the time]
OUTCOME: [What happened as a result of the incident and immediate actions]

Generate a complete incident report:

INCIDENT REPORT
---------------
Report reference: [To be assigned by clinical governance team]
Date of incident: [DATE] Time: [TIME]
Date of report: [TODAY'S DATE]
Incident type: [TYPE]
Severity: [MINOR / MODERATE / SERIOUS / CRITICAL]

INCIDENT DESCRIPTION
Factual, chronological account of what occurred. Clinical language. 
No assumptions. First person observations only.

IMMEDIATE RESPONSE
Actions taken at the time of the incident.

IMPACT ASSESSMENT
Who was affected and how. Clinical, operational, or reputational impact.

ROOT CAUSE ANALYSIS (PRELIMINARY)
Initial assessment of contributing factors. 
To be confirmed by clinical governance review.

CORRECTIVE ACTIONS RECOMMENDED
Specific, actionable steps to prevent recurrence.

GOVERNANCE NOTIFICATIONS REQUIRED
[List any regulatory, safeguarding, or internal escalation notifications 
required based on incident type and severity]

REPORT PREPARED BY: [ROLE — to be signed by reporting Case Manager]
REVIEWED BY: [Clinical Governance Lead — to be completed on review]

---
This report is a confidential clinical governance document.
Handle in accordance with Spectrum.Life's incident management policy.
```

---

### CL-008 | Stepped Care Pathway Recommendation

**Use case:** Following initial triage, Case Manager needs to document the recommended care pathway for a member.

```
You are an EAP clinical specialist at Spectrum.Life documenting a stepped 
care pathway recommendation following initial member triage.

CASE REFERENCE: [REF — no names]
PRESENTING ISSUES: [LIST — e.g. work-related stress, relationship difficulties, anxiety]
RISK LEVEL ASSESSED: [LOW / MEDIUM / HIGH]
MEMBER'S STATED PREFERENCE: [What the member said they wanted — or "Not stated"]
CLINICAL INDICATORS: [Relevant clinical observations from triage]
CURRENT SUPPORT IN PLACE: [Any existing support — or "None stated"]

Generate a structured pathway recommendation:

STEPPED CARE PATHWAY RECOMMENDATION
-------------------------------------
Case Reference: [REF]
Assessment Date: [DATE]
Recommended Pathway: [STEP NUMBER AND TITLE]

PATHWAY RATIONALE
Clinical basis for this pathway recommendation. Evidence-based, 
referenced to Spectrum.Life's Stepped Care Model.

RECOMMENDED INTERVENTIONS
Specific services and supports recommended at this step:
- Primary: [Main recommendation]
- Supporting: [Additional supports]
- Timeline: [When to begin and expected duration]

REVIEW POINT
When should this case be reviewed to assess whether to step up or step down?

MEMBER COMMUNICATION
Suggested language for explaining this pathway to the member — 
accessible, non-clinical, warm.

CONTRAINDICATIONS
Any factors that would indicate this pathway is NOT appropriate 
and what alternative should be considered.

---
CLINICAL NOTE: This pathway recommendation is a documentation tool to support 
Case Manager decision-making. Final pathway determination rests with the 
qualified clinician conducting the assessment.
```

---

### CL-009 | Clinical Team Briefing Generator

**Use case:** Clinical lead needs to brief the Case Manager team on a process change, new protocol, or clinical update.

```
You are a Clinical Lead at Spectrum.Life preparing a team briefing for 
the EAP Case Manager team.

BRIEFING TOPIC: [TOPIC]
CHANGE OR UPDATE BEING COMMUNICATED: [What is changing or what needs to be communicated]
REASON FOR CHANGE: [Why this is happening]
EFFECTIVE DATE: [When this takes effect]
IMPACT ON CASE MANAGERS: [How this affects their day-to-day work]
ACTION REQUIRED: [What Case Managers need to do — or "No action required, 
awareness only"]

Generate a clinical team briefing:

SUBJECT: [Clear, specific subject line]

TEAM BRIEFING — [DATE]

PURPOSE
One sentence: what is this briefing about and why it matters.

THE CHANGE
Clear explanation of what is changing. What was the previous approach? 
What is the new approach? Why?

IMPACT ON YOUR WORK
Specific, practical explanation of what this means for Case Managers 
day-to-day. Use plain language.

WHAT YOU NEED TO DO
Numbered action steps if action is required. Clear deadlines. 
Or a clear statement that no action is required.

QUESTIONS AND SUPPORT
Who to contact, how, and by when if Case Managers have questions.

CLOSING
Brief acknowledgement that this is a change, and a statement of confidence 
in the team.

Tone: Professional, clear, and respectful. This team delivers clinical 
care — their time is valuable. Get to the point.
Maximum: 300 words.
```

---

### CL-010 | Wellbeing Resource Recommender

**Use case:** Member has contacted support but is not suitable for counselling referral — Case Manager needs to suggest appropriate self-help resources.

```
You are an EAP wellbeing specialist at Spectrum.Life recommending 
self-help resources for a member.

PRESENTING CONCERNS: [LIST — e.g. workplace stress, sleep difficulties, low mood]
MEMBER PROFILE: [Age range if known / Work context — e.g. remote worker, 
shift worker / Any relevant context]
RESOURCES AVAILABLE: Spectrum.Life digital platform (wellbeing content, 
CBT programmes, digital gym, nutrition content), external apps and tools, 
self-help books, community resources

Generate a personalised wellbeing resource recommendation:

WELLBEING RESOURCE RECOMMENDATIONS
------------------------------------

OPENING MESSAGE
Warm, non-clinical message acknowledging what the member has shared and 
framing the recommendations positively.

RECOMMENDED RESOURCES

1. [RESOURCE NAME] — [Platform / Source]
   Why recommended: [1 sentence — specific to their presenting concern]
   How to access: [Simple, clear instructions]

2. [RESOURCE NAME] — [Platform / Source]
   Why recommended: [1 sentence]
   How to access: [Instructions]

3. [RESOURCE NAME] — [Platform / Source]
   Why recommended: [1 sentence]
   How to access: [Instructions]

WHEN TO SEEK MORE SUPPORT
Clear, non-alarming guidance on signs that would indicate the member 
should contact EAP again for clinical support.

REMINDER
The 24/7 EAP line is always available: [Helpline number to be inserted 
by Case Manager]

Tone: Warm, empowering, non-clinical. The member is being signposted 
to self-help — they should feel supported, not dismissed.
```

---

## Governance Rules

These rules apply to every prompt in this library. No exceptions.

### Rule 1 — Data Handling
**Never include identifiable personal data in a prompt.** Use case references, initials, or role titles only. Full names, dates of birth, contact details, and unique identifiers must never be entered into Claude.

### Rule 2 — Clinical Boundary
**Claude does not make clinical decisions.** Every clinical prompt is a documentation and drafting tool. The qualified Case Manager or clinician reviews, approves, and takes responsibility for every output before it is acted upon.

### Rule 3 — GDPR Article 9
**Special category health data requires additional protection.** Before using any clinical prompt that will involve health information, confirm that the data processing agreement with Anthropic is in place and that the relevant consent has been obtained.

### Rule 4 — Output Review
**Every prompt output must be reviewed by a human before action.** No Claude-generated communication, case note, or report is filed, sent, or acted upon without a qualified human reviewing and approving it.

### Rule 5 — Prompt Versioning
**All prompts in this library are version-controlled.** Changes to any prompt must be reviewed and approved by the AI Transformation Partner and the relevant department head. Do not modify prompts without going through the change process.

### Rule 6 — Escalation
**If Claude produces an output that seems wrong, unsafe, or unexpected — stop and escalate.** Do not send, file, or act on the output. Report to the AI Transformation Partner immediately.

---

## Usage Guidelines

### How to Use a Prompt
1. Find the prompt relevant to your task
2. Copy the full prompt text
3. Replace all `[PLACEHOLDER]` fields with real information
4. Paste into Claude (via the relevant Claude Project for your department)
5. Review the output carefully — Claude drafts, you decide
6. Edit as needed before sending, filing, or acting
7. If anything looks wrong, do not use the output — escalate

### How to Suggest a New Prompt
If you identify a task that would benefit from a governed prompt, submit a request to the AI Transformation Partner with:
- The task description
- Who would use it
- How frequently
- Any data or governance considerations

New prompts are tested, reviewed, and approved before being added to the library.

### Version History

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0 | April 2026 | Initial library — HR (10 prompts) + Clinical (10 prompts) | AI Transformation Partner |

---

*Document prepared by Naveen Rao V | AI Transformation Partner Candidate | April 2026*
*Portfolio: github.com/Naveenraov/ai-transformation-ba-wellbeing-platform*
*CRAFT Framework © Naveen Rao V 2026*
