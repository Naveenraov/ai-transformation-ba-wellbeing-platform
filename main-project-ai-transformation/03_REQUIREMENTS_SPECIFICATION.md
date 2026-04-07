# 03 — Requirements Specification
## AI Transformation Programme — Functional & Non-Functional Requirements

**Document type:** Business Requirements Document (BRD)  
**Author:** Naveen Rao V — AI Transformation Partner  
**Version:** 1.0 · April 2026  
**Audience:** Development Partners · IT · Clinical Governance · DPO · Programme Steering Group

---

## Document Purpose

This document translates the automation opportunities identified in the Current State Assessment into structured, actionable requirements. It covers both workstreams — Claude AI workflows and Salesforce/Agentforce automation — and is the primary handoff document from business analysis to technical delivery.

Requirements are structured as: Functional Requirements (what the system must do), Non-Functional Requirements (how it must perform), and User Stories (who needs what and why).

---

## Workstream 2 — Claude AI Requirements

### Feature 1: Clinical Intake Triage Assistant

#### Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| CTA-001 | System must accept structured intake data: age, referral type, service requested, presenting concerns, risk level, duration, and free-text notes | Must Have | All 7 fields accepted and passed to Claude API |
| CTA-002 | System must return a triage level from exactly four values: Urgent, Moderate, Routine, Safety Alert | Must Have | Only these four values returned; any other value treated as error |
| CTA-003 | System must generate a plain-language clinical picture summary of maximum 2 sentences | Must Have | Output readable by non-clinical coordinator; no jargon |
| CTA-004 | System must generate a specific recommended pathway — not a generic suggestion | Must Have | Pathway includes timeframe (e.g. "within 24 hours") and specific next step |
| CTA-005 | System must generate a minimum of 3 next actions for the intake coordinator | Must Have | Actions are specific and actionable, not generic |
| CTA-006 | System must automatically trigger a safety flag when crisis signals are detected | Must Have | Flag triggered on: suicidal ideation, self-harm, crisis language in any field |
| CTA-007 | When safety flag is triggered, system must generate a specific safety protocol message | Must Have | Protocol message references Spectrum.Life escalation procedure |
| CTA-008 | System must surface a GDPR Article 9 note when sensitive health data is present | Must Have | Note appears in clinician field; references data handling obligation |
| CTA-009 | Every triage output must display a human review required notice | Must Have | Visible on every output regardless of triage level |
| CTA-010 | System must log every triage assessment with timestamp, input data, and output for audit | Must Have | Log queryable; retained per GDPR data retention policy |
| CTA-011 | Case Manager must be able to override any AI recommendation | Must Have | Override captured and logged with reason |
| CTA-012 | System must complete triage assessment within 10 seconds of submission | Should Have | 95th percentile response time ≤ 10 seconds |

#### Non-Functional Requirements

| ID | Requirement | Category | Target |
|---|---|---|---|
| CTA-NFR-001 | System must be available 24/7 — matching Spectrum.Life's helpline availability | Availability | 99.9% uptime |
| CTA-NFR-002 | All data transmitted to Claude API must be encrypted in transit | Security | TLS 1.2 minimum |
| CTA-NFR-003 | No member PII to be stored in Claude API call logs | Data Privacy | GDPR Article 9 compliant |
| CTA-NFR-004 | System must handle concurrent assessments without degraded performance | Performance | 100 concurrent sessions minimum |
| CTA-NFR-005 | Triage output accuracy validated against clinical benchmark | Quality | 85%+ agreement with senior clinician assessment in UAT |
| CTA-NFR-006 | System must degrade gracefully — if API unavailable, manual triage workflow presented | Resilience | Fallback within 3 seconds of API timeout |

#### User Stories

```
As a Case Manager,
I want a structured AI-generated triage recommendation when I open a new intake,
So that I can make a faster, more consistent pathway decision without starting from a blank page.

As a Clinical Director,
I want every AI-assisted triage assessment to be logged with the human reviewer's name,
So that I have a full audit trail for clinical governance and safeguarding compliance.

As a Data Protection Officer,
I want GDPR Article 9 flags to surface automatically when sensitive health data is present,
So that Case Managers handle special category data correctly without relying on individual awareness.

As a Case Manager dealing with a high-risk member,
I want a clear safety protocol message to appear immediately when crisis signals are detected,
So that I follow the correct escalation procedure every time, under pressure.
```

---

### Feature 2: Session Documentation Assistant

#### Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| SD-001 | Counsellor can input bullet-point session notes (minimum 3 bullets) | Must Have | Input accepted in free-text format |
| SD-002 | System generates a structured session note with: presenting issues, interventions used, member response, risk status, next session plan | Must Have | All 5 fields populated in output |
| SD-003 | Risk flags in session content automatically identified and surfaced | Must Have | Any mention of self-harm, suicidal ideation, or safeguarding concern flagged |
| SD-004 | Counsellor can edit AI-generated note before saving | Must Have | Full edit capability; AI draft is starting point not final record |
| SD-005 | Approved note saved directly to Salesforce case record | Must Have | Salesforce record updated on approval; no duplicate entry |
| SD-006 | System tracks whether note was AI-generated, edited, or manually written | Should Have | Metadata tag on every note record |

#### User Stories

```
As a Counsellor,
I want to input brief session bullets and receive a structured note draft,
So that I spend 5 minutes on documentation instead of 30, and can see more members each day.

As a Clinical Director,
I want consistent structured session notes across all counsellors,
So that I can analyse clinical patterns and identify quality issues at scale.
```

---

### Feature 3: Referral Letter Generator

#### Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| RL-001 | System pulls case history, triage summary, and session notes from Salesforce automatically | Must Have | No manual data entry for letter generation |
| RL-002 | System generates a complete referral letter including: clinical picture, intervention history, current risk, reason for referral, and urgency level | Must Have | Letter clinically appropriate; reviewed against GP/psychiatry referral standards |
| RL-003 | Urgent referrals flagged for same-day turnaround and assigned to senior clinician for review | Must Have | Urgent flag triggers notification within 15 minutes |
| RL-004 | Clinician reviews and approves before letter is sent | Must Have | No automated sending without human sign-off |
| RL-005 | Sent letters logged in Salesforce with timestamp and approver name | Must Have | Full audit trail |

---

## Workstream 1 — Salesforce & Agentforce Requirements

### Feature 4: Case Routing & Counsellor Matching Agent

#### Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| CR-001 | Agent reads structured triage output and extracts matching criteria | Must Have | Criteria extracted: presenting issue, language, specialism needed, session format preference |
| CR-002 | Agent queries counsellor availability across the network in real time | Must Have | Availability data current within 15 minutes |
| CR-003 | Agent returns top 3 counsellor matches ranked by fit score | Must Have | Ranking based on: specialism match, availability, language, location |
| CR-004 | Case Manager selects from recommendations and confirms | Must Have | Human confirmation required before booking |
| CR-005 | Agent sends booking confirmation to member and counsellor | Must Have | Confirmation sent within 2 minutes of Case Manager confirmation |
| CR-006 | Agent manages waitlist automatically when no immediate availability | Should Have | Member notified; position tracked; Case Manager alerted when slot opens |
| CR-007 | Salesforce case record updated automatically on routing decision | Must Have | No manual record update required |

#### User Stories

```
As a Case Manager,
I want the system to present me with the top 3 matched counsellors and their availability,
So that I can make a high-quality routing decision in 2 minutes instead of 20.

As a member contacting Spectrum.Life,
I want to receive a booking confirmation within minutes of my triage call,
So that I feel supported and know my next step clearly.
```

---

### Feature 5: Automated Reporting & ROI Dashboard

#### Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| RPT-001 | Dashboard displays real-time utilisation data by client (employer/university/insurer) | Must Have | Data refreshed every 4 hours minimum |
| RPT-002 | Dashboard tracks AI automation performance: triage assessments completed, routing decisions made, letters generated | Must Have | Separate AI performance section visible to programme team |
| RPT-003 | Dashboard calculates and displays cost savings from automation against baseline | Must Have | Methodology transparent; baseline defined in this document |
| RPT-004 | Monthly client reports generated automatically from dashboard data | Should Have | Report generated on 1st of each month; reviewed before distribution |
| RPT-005 | CEO/CPO summary view: one-page programme health snapshot | Must Have | RAG status, top 3 metrics, month-on-month trend |

---

## Requirements Traceability Matrix

| Business Objective | Requirements | Features |
|---|---|---|
| Reduce triage time 40–60% | CTA-001 to CTA-012 | Clinical Triage Assistant |
| Automate 70% of case routing | CR-001 to CR-007 | Case Routing Agent |
| AI-assist 80% of session notes | SD-001 to SD-006 | Session Documentation Assistant |
| Same-day referral letters | RL-001 to RL-005 | Referral Letter Generator |
| Live ROI reporting | RPT-001 to RPT-005 | Reporting Dashboard |
| GDPR Art. 9 compliance | CTA-008, CTA-010, CTA-NFR-003 | All AI features |
| Human-in-the-loop governance | CTA-009, CTA-011, SD-004, RL-004 | All AI features |

---

## Sign-Off Required

| Role | Name | Sign-Off | Date |
|---|---|---|---|
| Chief People Officer | Lynda | ☐ Pending | |
| Clinical Director | TBC | ☐ Pending | |
| Data Protection Officer | TBC | ☐ Pending | |
| Head of Operations | TBC | ☐ Pending | |
| IT Lead | TBC | ☐ Pending | |

---

*Document 03 of 06 · Spectrum.Life AI Transformation Programme · Naveen Rao V · April 2026*
