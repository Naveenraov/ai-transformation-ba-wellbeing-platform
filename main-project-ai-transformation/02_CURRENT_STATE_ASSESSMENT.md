# 02 — Current State Assessment
## As-Is Process Analysis & Automation Opportunity Register

**Document type:** Current State Assessment  
**Author:** Naveen Rao V — AI Transformation Partner  
**Version:** 1.0 · April 2026  
**Audience:** Operations · Clinical · IT · Programme Steering Group

---

## Purpose

This document maps Spectrum.Life's current operational state across the five highest-impact process areas. For each area it documents: how the process works today, where the pain is, what manual effort it consumes, and what the automation opportunity looks like.

This is the foundation document. No solution is designed without first understanding the problem in this level of detail.

---

## How This Assessment Was Built

Discovery methodology:
- Stakeholder interviews across clinical, operations, HR, and finance teams
- Process observation — shadowing Case Managers through intake and triage calls
- Data analysis — call volumes, handling times, routing decisions, escalation rates
- Review of existing Salesforce configuration and workflow documentation
- Benchmarking against EAP industry standards and Spectrum.Life's own published outcome data

---

## Process Area 1 — Clinical Intake & Triage

### Current State
A member contacts Spectrum.Life via phone, app, live chat, WhatsApp, SMS, or email. A Case Manager picks up the contact, confirms eligibility (employer/university/insurer code), collects presenting information, completes a risk assessment, and determines the appropriate care pathway.

This triage assessment takes approximately 30 minutes per case. It is entirely manual, undocumented in real time, and dependent on the individual Case Manager's experience and judgement.

**Volume:** Interactions grew 9x in 2023 vs 2022. Stress and anxiety account for 35% of presenting issues. The volume is increasing; the process has not changed.

### Pain Points
| Pain Point | Impact | Severity |
|---|---|---|
| No structured triage framework | Inconsistent risk assessment quality across Case Managers | High |
| Manual documentation during live call | Errors, omissions, delay in case record creation | High |
| Risk escalation relies on individual judgement | High-risk cases can be under-triaged on busy days | Critical |
| GDPR Article 9 flags not systematically applied | Compliance risk on sensitive health data handling | Critical |
| No real-time decision support | Case Manager has no tool to sense-check their pathway decision | Medium |
| Triage outcome not captured in structured format | Cannot analyse triage patterns or quality at scale | Medium |

### Automation Opportunity
**Claude-assisted triage:** AI analyses intake data in real time and generates a structured triage recommendation — severity level, clinical picture, recommended pathway, next actions, safety flags, GDPR notes. Case Manager reviews, confirms, and acts.

**Estimated impact:** 40–60% reduction in triage assessment time. Consistent risk flagging. Audit-ready structured output on every case.

**Status:** Proof of concept built and tested — see `project-b-clinical-triage/`

---

## Process Area 2 — Case Routing & Counsellor Matching

### Current State
Following triage, a Case Manager manually matches the member to an available counsellor. Matching criteria include: presenting issue, language preference, counsellor specialism, availability, geographic proximity (for face-to-face), and member preference (video/phone/in-person).

This is a manual lookup process. Case Managers navigate availability spreadsheets, counsellor profiles, and Salesforce records to find the best match. Average time: 15–25 minutes per routing decision.

**Volume:** Spectrum.Life has a network of counsellors across the UK and Ireland covering 15+ languages. The matching complexity scales with the network size.

### Pain Points
| Pain Point | Impact | Severity |
|---|---|---|
| Manual availability lookup across multiple sources | Time-consuming, prone to double-booking | High |
| Counsellor specialism matching done from memory | Suboptimal matches, especially for trauma/complex cases | High |
| No automated waitlist management | Members fall through gaps when preferred counsellor unavailable | High |
| Language matching inconsistently applied | Members sometimes matched with counsellor without required language | Medium |
| No feedback loop from outcome data to matching | Poor matches not identified until complaint or poor outcome | Medium |

### Automation Opportunity
**Agentforce Routing Agent:** An AI agent that reads the triage output, applies matching rules across the counsellor network, and presents the top 3 matched counsellors with availability. Case Manager selects and confirms. Agent sends booking confirmation to member and counsellor, updates Salesforce record, and triggers reminder workflows.

**Estimated impact:** 70% of routine cases auto-routed. 15–25 minutes saved per case. Waitlist managed automatically.

---

## Process Area 3 — Session Documentation & Case Records

### Current State
Following each counselling session, the counsellor completes a session note in the case management system. Notes cover: presenting issues discussed, interventions used, member response, risk assessment, plan for next session, and any escalation decisions.

This documentation is done after the session, from memory, with no structured template. Quality varies significantly. Average time: 20–35 minutes per session.

**Volume:** Spectrum.Life delivered tens of thousands of counselling sessions in 2023. At 20–35 minutes of documentation per session, this is one of the highest administrative time sinks in the organisation.

### Pain Points
| Pain Point | Impact | Severity |
|---|---|---|
| Post-session documentation from memory | Omissions, inaccuracies, inconsistent quality | High |
| No structured template enforced | Cannot analyse session data at scale | High |
| Documentation time competes with session availability | Counsellors see fewer members due to admin burden | High |
| Risk flags in sessions not always captured formally | Safeguarding risks can go undocumented | Critical |
| No automated escalation trigger from notes | Escalation depends on counsellor remembering to flag | High |

### Automation Opportunity
**Claude Session Documentation Assistant:** AI generates a structured session note draft based on counsellor's brief bullet-point input post-session. Counsellor reviews, edits, and approves. Structured output includes: presenting issues, interventions, risk status, next steps, and any escalation flags.

**Estimated impact:** 80% reduction in documentation time. Consistent structured records. Automated escalation triggers on risk flags.

---

## Process Area 4 — Referral Letter Generation

### Current State
When a member requires referral to a specialist — psychiatrist, GP, inpatient service, or longer-term therapy provider — a referral letter must be produced. This letter summarises the clinical picture, intervention history, current risk status, and reason for referral.

Currently produced manually by the Case Manager or counsellor, drawing information from across multiple case records. Average time: 45–90 minutes per letter. Often delayed by 24–48 hours.

### Pain Points
| Pain Point | Impact | Severity |
|---|---|---|
| Manual letter production is time-intensive | 24–48hr delay in referral — critical for urgent cases | Critical |
| Information drawn from multiple sources manually | Risk of missing key clinical history | High |
| No standard letter template | Quality and completeness varies | Medium |
| Delays in urgent psychiatric referrals | Clinical risk during waiting period | Critical |

### Automation Opportunity
**Claude Referral Letter Generator:** AI pulls structured data from the case record and generates a complete, clinically appropriate referral letter. Clinician reviews and approves before sending. Urgent referrals flagged for same-day turnaround.

**Estimated impact:** 48-hour delay reduced to same-day. Consistent clinical quality. Full audit trail.

---

## Process Area 5 — Reporting & Performance Analytics

### Current State
Spectrum.Life provides employers, universities, and insurers with utilisation reports — showing how their members are accessing and benefiting from the service. Reports are produced manually by the operations team, compiled from Salesforce exports and spreadsheets.

Monthly reporting cycle takes 3–5 days of analyst time per client segment. Reports are retrospective, standardised, and offer limited insight.

### Pain Points
| Pain Point | Impact | Severity |
|---|---|---|
| Manual report compilation from multiple sources | 3–5 days per cycle, high error risk | High |
| Retrospective only — no real-time view | Issues identified too late to act | High |
| Standardised reports don't reflect client priorities | Low perceived value from corporate and university clients | Medium |
| No AI usage or cost tracking | Cannot demonstrate ROI of AI programme | High |
| No outcome trend analysis | Cannot identify deteriorating cohorts proactively | High |

### Automation Opportunity
**Automated Reporting & Analytics Dashboard:** Salesforce-integrated dashboards delivering real-time utilisation, outcome, and AI performance data. Client-specific reports generated automatically. AI cost and ROI tracking built in from day one.

**Estimated impact:** Reporting cycle from 3–5 days to automated. Real-time visibility for CEO, CPO, and client accounts.

---

## Automation Opportunity Register — Prioritised

| # | Process | Automation Type | Effort | Impact | Priority |
|---|---|---|---|---|---|
| 1 | Clinical intake triage | Claude AI assist | Low (POC built) | Critical | **P1 — Now** |
| 2 | Session documentation | Claude AI assist | Medium | High | **P1 — Now** |
| 3 | Case routing & matching | Agentforce agent | Medium | High | **P2 — Q3** |
| 4 | Referral letter generation | Claude + template | Low | Critical | **P2 — Q3** |
| 5 | Reporting & dashboards | Salesforce automation | Medium | High | **P2 — Q3** |
| 6 | HR onboarding workflows | Agentforce agent | Medium | Medium | **P3 — Q4** |
| 7 | Finance & billing reconciliation | Salesforce flows | High | Medium | **P3 — Q4** |
| 8 | Manager guidance tool | Claude AI assist | Low | Medium | **P3 — Q4** |

---

## Key Insight for the Steering Group

The highest-impact automation opportunities — triage, documentation, and referrals — all sit in the clinical delivery layer. This is where Spectrum.Life's core service is delivered and where AI can have the greatest impact on both quality and efficiency.

These are also the highest-risk areas for AI deployment. That is why the governance framework (`05_GOVERNANCE_FRAMEWORK.md`) is a Phase 1 deliverable, not a Phase 2 afterthought.

---

*Document 02 of 06 · Spectrum.Life AI Transformation Programme · Naveen Rao V · April 2026*
