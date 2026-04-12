# Project G — Agentforce Use Case Discovery Document
### Spectrum.Life | Salesforce DHOS | First Three Agentforce Implementations
### AI Transformation Partner Portfolio | Naveen Rao V | April 2026

---

## Executive Summary

Spectrum.Life has built its entire Digital Health Operating System on Salesforce. It is the operational backbone of a business serving 9.8 million members, 3,000 corporate clients, and 60 universities — growing at 50-60% per year toward a €100M revenue target by 2028.

Agentforce — Salesforce's autonomous AI agent capability — has not been touched. No use cases defined. No implementation started. Complete greenfield.

This document changes that.

It defines Spectrum.Life's first three Agentforce use cases, scopes each one to full BA requirements specification, and provides a clear implementation sequence. By the end of this document, Spectrum.Life has everything needed to brief a Salesforce developer or implementation partner and say: **build this.**

**The three use cases:**

| Agent | Department | Primary Problem Solved | Est. Daily Impact |
|---|---|---|---|
| **Agent 1 — Clinical Triage Routing** | Clinical / EAP Operations | Manual contact routing and intake pre-population wastes 8-12 min per intake | 400–600 min/day recovered across triage team |
| **Agent 2 — HR Onboarding** | HR & People Operations | New hire onboarding is manual, inconsistent, and unsustainable at 100+ hire pace | 70% reduction in HR onboarding admin |
| **Agent 3 — Sales Renewal** | Sales & Account Management | At-risk accounts identified too late — renewals managed reactively not proactively | 90-day earlier identification of at-risk accounts |

**Why these three first:** They are the highest-impact, lowest-clinical-risk automations available in Spectrum.Life's current Salesforce DHOS. They do not require new data infrastructure. They work with what already exists — just underutilised at ~30% of Salesforce capability.

---

## Section 1 — What Is Agentforce (BA Framing)

### The Plain-English Explanation

Agentforce is Salesforce's autonomous AI agent platform. An Agentforce agent is a configured, goal-directed workflow that can observe data in Salesforce, make decisions based on rules and AI reasoning, take actions across connected systems, and involve a human whenever a decision falls outside its defined boundaries.

The critical distinction from traditional Salesforce automation (Flows, Process Builder):

| Capability | Salesforce Flow | Agentforce Agent |
|---|---|---|
| Trigger | Specific event (record created, field changed) | Event, schedule, or natural language instruction |
| Decision making | Rules-based only | Rules + AI reasoning |
| Multi-step coordination | Linear — follows fixed path | Dynamic — adapts based on context |
| Language understanding | None | Full — can read and interpret text |
| Human handoff | Manual escalation only | Intelligent — knows when to involve a human |
| Connected systems | Salesforce objects only | Salesforce + external APIs + Claude |

### How Claude Fits

Claude is the language intelligence layer inside an Agentforce workflow. Agentforce handles the orchestration — what happens when, in what sequence, with what data. Claude handles the language — reading unstructured text, generating drafts, summarising context, classifying intent.

```
┌─────────────────────────────────────────────────────────────────┐
│                    AGENTFORCE AGENT                             │
│                                                                 │
│  TRIGGER          OBSERVE          REASON          ACT          │
│  (Event /    →   (Salesforce   →  (Rules +     →  (Update      │
│   Schedule)       data read)       Claude AI)      records /    │
│                                                    Send comms / │
│                                                    Route tasks) │
│                                    ↕                            │
│                              CLAUDE API                         │
│                         (Language layer:                        │
│                          classify / draft /                     │
│                          summarise / generate)                  │
│                                                                 │
│                              ↕                                  │
│                         HUMAN HANDOFF                           │
│                    (When decision exceeds                       │
│                     agent's defined boundaries)                 │
└─────────────────────────────────────────────────────────────────┘
```

### What an Agent Can Do at Spectrum.Life

- Read a new member contact record in Salesforce and classify its urgency
- Check Case Manager availability and route the contact automatically
- Pre-populate an intake form with member history from the DHOS
- Generate a first-draft communication using Claude and queue it for human approval
- Trigger a Salesforce workflow (create task, update record, send notification)
- Monitor a set of records over time and act when a threshold is crossed
- Escalate to a human whenever a decision falls outside defined boundaries

### What an Agent Cannot Do (Boundaries)

- Make clinical decisions — risk assessment, therapeutic judgement, pathway determination
- Take irreversible action on clinical records without human approval
- Access or process data outside its defined Salesforce permissions
- Override the human-in-the-loop checkpoints built into its design
- Operate without an audit trail — every agent action is logged in Salesforce

### BA Positioning Note

This document defines **what each agent needs to do, why, and how it should behave**. It does not specify Salesforce configuration steps, Flow builder settings, or developer-level implementation details. That is the role of the Salesforce developer or implementation partner who builds from these requirements. The BA owns the requirements. The developer owns the configuration.

---

## Section 2 — Agentforce Integration Architecture

### System Architecture Overview

```
                        SPECTRUM.LIFE DIGITAL HEALTH OPERATING SYSTEM
                                   (Salesforce DHOS)
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              │                           │                           │
    ┌─────────▼─────────┐     ┌──────────▼──────────┐    ┌──────────▼──────────┐
    │   AGENT 1          │     │   AGENT 2            │    │   AGENT 3           │
    │ Clinical Triage    │     │ HR Onboarding        │    │ Sales Renewal       │
    │ Routing            │     │                      │    │                     │
    └─────────┬─────────┘     └──────────┬──────────┘    └──────────┬──────────┘
              │                           │                           │
              └───────────────────────────┼───────────────────────────┘
                                          │
                              ┌───────────▼───────────┐
                              │    CLAUDE API          │
                              │  (Language layer)      │
                              │                        │
                              │  • Classify intent     │
                              │  • Generate drafts     │
                              │  • Summarise context   │
                              │  • Score risk/renewal  │
                              └───────────┬───────────┘
                                          │
                              ┌───────────▼───────────┐
                              │   SALESFORCE DATA      │
                              │                        │
                              │  • Contact records     │
                              │  • Case records        │
                              │  • Account data        │
                              │  • Staff/HR records    │
                              │  • Utilisation data    │
                              │  • Calendar/schedules  │
                              └───────────┬───────────┘
                                          │
                              ┌───────────▼───────────┐
                              │   HUMAN REVIEW LAYER   │
                              │                        │
                              │  All agent outputs     │
                              │  reviewed before       │
                              │  clinical/financial    │
                              │  action is taken       │
                              └───────────────────────┘
```

### Data Flow Principles

**Trigger → Observe → Reason → Act → Review**

Every agent follows this sequence. No agent skips the Review step for clinical or financial actions.

| Step | What Happens | Salesforce Component | Claude Involvement |
|---|---|---|---|
| **Trigger** | An event occurs — new record, schedule reached, threshold crossed | Flow trigger / Schedule / Platform Event | None |
| **Observe** | Agent reads relevant Salesforce data for this event | SOQL query / Record access | None |
| **Reason** | Agent applies rules and calls Claude for language intelligence | Agentforce reasoning engine | Classifies, scores, summarises, drafts |
| **Act** | Agent updates records, creates tasks, sends notifications | Salesforce actions / API calls | Generates communication drafts |
| **Review** | Human reviews agent output before clinical/financial action | Task assignment / Approval process | None — human step |

### GDPR Article 9 Integration Consideration

Agent 1 (Clinical Triage) interacts with health-related contact data — special category data under GDPR Article 9. Before deployment:

- Data Processing Agreement (DPA) with Salesforce and Anthropic confirmed
- Consent mapping for member data confirmed
- Data minimisation principle applied — agent accesses only the fields required for routing decisions
- No special category health data passed to Claude API without explicit consent mapping in place
- All agent actions logged with timestamp, action type, and data accessed

---

## Section 3 — Opportunity Map: Where Agentforce Fits Across Spectrum.Life

Before the three selected use cases, here is the full picture of where Agentforce could eventually operate across the DHOS — and why these three come first.

| Department | Potential Agentforce Use Cases | Priority | Reason for Sequencing |
|---|---|---|---|
| **Clinical / EAP** | Triage routing, risk flag monitoring, session scheduling, case escalation | 🔴 First | Highest daily volume, highest pain, directly supports revenue-generating clinical delivery |
| **HR & People** | New hire onboarding, offboarding, CPD tracking, leave management | 🔴 First | 100+ hires underway, Lynda managing manually, immediate capacity need |
| **Sales & Account Mgmt** | Renewal management, lead qualification, client health monitoring | 🔴 First | 3,000 clients, revenue protection, direct commercial impact |
| **Finance** | Invoice processing, budget variance alerts, ROI reporting | 🟠 Phase 2 | Dependent on Salesforce financial data quality — needs audit first |
| **Clinical Governance** | Audit scheduling, compliance tracking, incident follow-up | 🟠 Phase 2 | Builds on clinical agent foundation — sequence after Agent 1 |
| **Learning & Development** | CPD assignment, training completion tracking, onboarding guides | 🟠 Phase 2 | Builds on HR agent foundation — sequence after Agent 2 |
| **Marketing** | Campaign triggers, content scheduling, partner communications | 🟡 Phase 3 | Lower urgency relative to clinical and commercial priorities |
| **Product & Technology** | Bug triage routing, release communication, support ticket classification | 🟡 Phase 3 | Requires technical Salesforce objects not yet in scope |

**Selection rationale for the three first use cases:**
The selected agents share four characteristics that make them the right starting point: (1) they solve a named, confirmed pain point; (2) they work with Salesforce data that already exists; (3) they do not require new integrations beyond Claude API; (4) they have clear, measurable success metrics.

---

## Section 4 — Use Case 1: Clinical Triage Routing Agent

### Problem Statement

When a member contacts Spectrum.Life via any channel — phone, WhatsApp, live chat, email — a Case Manager must manually: read the contact, assess urgency, check which Case Manager is available, route the contact, and then manually begin populating the intake form. This process takes 8-12 minutes per intake before any clinical work begins.

At 50+ intakes per day across the clinical team, this represents **400-600 minutes of pre-clinical admin per day** — work that keeps qualified psychotherapists away from the members who need them.

### As-Is Process (Current State)

```
Member contacts Spectrum.Life
         ↓
Message arrives in shared inbox / phone queue
         ↓
Case Manager reads contact (manual)
         ↓
Case Manager assesses urgency (manual judgement)
         ↓
Case Manager checks colleague availability (manual — calls/messages)
         ↓
Case Manager routes to appropriate colleague (manual — email/message)
         ↓
Case Manager begins intake form — searches for member history (manual)
         ↓
Intake form partially populated from memory/search (manual, inconsistent)
         ↓
Clinical assessment begins
```

**Pain points confirmed:** High manual overhead, inconsistent routing, intake forms incompletely populated, 8-12 minutes lost before any clinical work, Case Manager availability checking is disruptive to ongoing sessions.

### To-Be Process (Agentforce Agent)

```
Member contacts Spectrum.Life
         ↓
Contact record created/updated in Salesforce DHOS
         ↓
Agent 1 TRIGGERED (Platform Event)
         ↓
Agent OBSERVES: reads contact content, member history,
                channel, time of contact
         ↓
Agent calls CLAUDE: classify urgency (Critical/Urgent/Routine/Admin)
                    classify type (New Referral/Existing Case/Admin)
                    summarise presenting context in 2 sentences
         ↓
Agent REASONS: checks Case Manager availability in Salesforce calendar
               applies routing rules (urgency + specialisation + load)
               selects appropriate Case Manager
         ↓
Agent ACTS:
  • Updates contact record with urgency classification and summary
  • Pre-populates intake form with member history from DHOS
  • Creates routing task assigned to selected Case Manager
  • Sends internal notification to Case Manager with context summary
  • Sends acknowledgement to member (Claude-drafted, human-approved)
         ↓
Case Manager REVIEWS:
  • Receives pre-populated intake, classification, and context
  • Confirms routing (one click) or overrides
  • Reviews member acknowledgement before it sends
         ↓
Clinical assessment begins — with full context already in place
```

### Agent Design Specification

**Agent Name:** ClinicalTriageRouter_v1
**Agent Type:** Event-triggered autonomous agent
**Trigger:** New or updated Contact record in Salesforce where channel = [Phone / WhatsApp / Chat / Email] and status = "Awaiting Triage"
**Salesforce Objects Accessed:** Contact, Case, User (Case Manager), Calendar Event, Custom Intake Form object

**Agent Actions:**

| Action | Type | Claude Involvement | Human Approval Required |
|---|---|---|---|
| Classify urgency and type | AI reasoning | Yes — Claude classifies from contact content | No — classification is a recommendation |
| Summarise presenting context | AI generation | Yes — Claude generates 2-sentence summary | No — Case Manager sees and can correct |
| Check Case Manager availability | Data query | No — rules-based calendar lookup | No |
| Route contact to Case Manager | Record update + Task creation | No | No — routing is administrative |
| Pre-populate intake form | Data mapping | No — pulls from existing Salesforce fields | No |
| Generate member acknowledgement | AI generation | Yes — Claude drafts acknowledgement | Yes — Case Manager approves before sending |
| Send internal notification | Notification | No | No |

### Functional Requirements

| Req ID | Requirement | Priority |
|---|---|---|
| CTR-FR-001 | Agent must trigger within 60 seconds of a new contact record being created or updated to "Awaiting Triage" status | Must Have |
| CTR-FR-002 | Agent must classify urgency as Critical, Urgent, Routine, or Admin using Claude — with confidence score | Must Have |
| CTR-FR-003 | Agent must check real-time Case Manager availability from Salesforce calendar before routing | Must Have |
| CTR-FR-004 | Agent must pre-populate a minimum of 8 intake form fields from existing DHOS member record | Must Have |
| CTR-FR-005 | Agent must create a Salesforce Task assigned to the routing Case Manager with full context attached | Must Have |
| CTR-FR-006 | Agent must generate a draft member acknowledgement for Case Manager review — not auto-send | Must Have |
| CTR-FR-007 | Case Manager must be able to override routing decision with one click — override logged in Salesforce | Must Have |
| CTR-FR-008 | All agent actions must be logged with timestamp, action type, and data accessed | Must Have |
| CTR-FR-009 | Agent must escalate to senior clinician if urgency classification = Critical and no senior clinician available within 15 minutes | Must Have |
| CTR-FR-010 | Agent must operate across all contact channels: Phone queue, WhatsApp, Live Chat, Email | Must Have |
| CTR-FR-011 | Agent must support routing by clinical specialisation where member history indicates preferred specialism | Should Have |
| CTR-FR-012 | Agent must provide a daily routing summary to Clinical Lead — contacts received, classified, routed, overrides | Should Have |

### Non-Functional Requirements

| Req ID | Requirement | Standard |
|---|---|---|
| CTR-NFR-001 | Response time: triage classification and routing task created within 60 seconds of trigger | Performance |
| CTR-NFR-002 | Availability: agent must operate 24/7/365 — matches Spectrum.Life's always-on clinical service | Availability |
| CTR-NFR-003 | GDPR Article 9: contact content passed to Claude API must have DPA and consent mapping confirmed | Compliance |
| CTR-NFR-004 | Data minimisation: agent accesses only fields required for routing — no unnecessary health data exposure | Compliance |
| CTR-NFR-005 | Audit trail: every agent action logged — immutable, reviewable by Clinical Governance | Governance |
| CTR-NFR-006 | Accuracy: urgency classification accuracy target ≥ 90% — measured via Case Manager override rate | Quality |
| CTR-NFR-007 | Fallback: if Claude API unavailable, agent routes to default senior Case Manager with alert — no contact lost | Resilience |

### Acceptance Criteria

- [ ] Agent triggers within 60 seconds of a new Awaiting Triage contact record
- [ ] Urgency classification produced for 100% of contacts — with confidence score
- [ ] Case Manager availability correctly checked in real-time — no routing to unavailable staff
- [ ] Minimum 8 intake form fields pre-populated from member history
- [ ] Draft member acknowledgement generated and held for approval — not auto-sent
- [ ] Case Manager override capability working — override logged
- [ ] All actions logged with full audit trail
- [ ] Critical contacts escalated correctly when senior clinician unavailable
- [ ] Fallback to default routing confirmed when Claude API unavailable
- [ ] UAT sign-off from Clinical Lead and at least 3 Case Managers

### Success Metrics (90 Days Post-Launch)

| Metric | Baseline | Target |
|---|---|---|
| Pre-clinical admin time per intake | 8-12 minutes | Under 3 minutes |
| Case Manager override rate | N/A (new) | Below 15% — indicates routing accuracy |
| Intake form completion at assessment start | ~40% (estimated) | 85%+ |
| Critical contact response time | Variable | Under 15 minutes 100% of the time |
| Case Manager satisfaction with routing | N/A | 4+/5 in monthly pulse |

---

## Section 5 — Use Case 2: HR Onboarding Agent

### Problem Statement

Spectrum.Life is in the most intensive hiring period in its history — 100+ new hires over 18 months. Every new hire requires: a personalised welcome pack, IT access setup, system profile creation, onboarding document generation, manager check-in scheduling, and completion tracking. Currently this is manual, inconsistent, and taking significant time from Lynda's HR team.

At current hiring pace, the manual onboarding process is not sustainable. An agent that triggers automatically on new hire confirmation and orchestrates the full onboarding workflow reduces HR admin by an estimated 70% per hire.

### As-Is Process (Current State)

```
New hire offer accepted
         ↓
HR manually creates employee record in Salesforce (manual)
         ↓
HR manually generates welcome email (manual, inconsistent format)
         ↓
HR manually creates onboarding document pack (manual, 45-60 min/hire)
         ↓
HR manually requests IT access (manual email to IT team)
         ↓
HR manually schedules Week 1 check-ins with manager (manual)
         ↓
HR manually tracks onboarding task completion (manual spreadsheet)
         ↓
HR follows up on incomplete tasks manually
```

**Pain points:** Manual at every step, inconsistent output quality, significant time drain during 100+ hire surge, completion tracking unreliable, no automated escalation when tasks slip.

### To-Be Process (Agentforce Agent)

```
New hire confirmed — Salesforce record status = "Offer Accepted"
         ↓
Agent 2 TRIGGERED
         ↓
Agent OBSERVES: new hire record — role, department, start date,
                manager, location, contract type
         ↓
Agent calls CLAUDE: generates personalised welcome message
                    generates personalised onboarding document pack
                    generates IT access request communication
         ↓
Agent ACTS (pre-start day):
  • Creates complete employee Salesforce profile
  • Assigns new hire to correct Claude Project for their role
  • Sends IT access request with role and system requirements
  • Generates and queues personalised welcome pack for HR approval
  • Creates onboarding task checklist in Salesforce — assigned to manager
  • Schedules automated Week 1 check-in reminders for manager
         ↓
HR REVIEWS and approves welcome pack (one click)
         ↓
Agent SENDS approved welcome pack to new hire
         ↓
Agent MONITORS: tracks task completion against onboarding checklist
         ↓
Agent ESCALATES: flags incomplete tasks to HR 3 days before start date
         ↓
New hire starts — full onboarding context in Salesforce, all comms sent
```

### Agent Design Specification

**Agent Name:** HROnboardingOrchestrator_v1
**Agent Type:** Record-triggered orchestration agent
**Trigger:** Employee record in Salesforce updated to status = "Offer Accepted"
**Salesforce Objects Accessed:** Contact/Employee record, User, Department, Role, Manager record, Calendar, Task, Claude Project assignment (custom object)

**Agent Actions:**

| Action | Type | Claude Involvement | Human Approval Required |
|---|---|---|---|
| Create complete Salesforce employee profile | Record creation | No | No |
| Generate personalised welcome message | AI generation | Yes | Yes — HR approves before sending |
| Generate onboarding document pack | AI generation | Yes | Yes — HR reviews before sending |
| Send IT access request | Automated communication | No | No — templated, rule-based |
| Assign Claude Project for role | Record update | No | No |
| Create onboarding task checklist | Task creation | No | No |
| Schedule manager check-in reminders | Calendar action | No | No |
| Monitor task completion | Scheduled data check | No | No |
| Escalate incomplete tasks | Alert + Task | No | No — escalation is automatic |

### Functional Requirements

| Req ID | Requirement | Priority |
|---|---|---|
| OB-FR-001 | Agent triggers within 1 hour of Offer Accepted status on employee record | Must Have |
| OB-FR-002 | Agent generates personalised welcome message using Claude — name, role, manager, start date incorporated | Must Have |
| OB-FR-003 | Agent generates personalised onboarding document pack — role-specific content from Salesforce data | Must Have |
| OB-FR-004 | Agent creates complete Salesforce employee profile including all required fields for DHOS access | Must Have |
| OB-FR-005 | Agent sends IT access request with correct system requirements for role — based on department and role mapping | Must Have |
| OB-FR-006 | Agent creates full onboarding task checklist in Salesforce — assigned to manager and HR | Must Have |
| OB-FR-007 | Agent schedules automated check-in reminders for manager at Day 3, Week 1, Week 2, and Month 1 | Must Have |
| OB-FR-008 | Agent assigns new hire to correct role-specific Claude Project — based on department/role mapping | Must Have |
| OB-FR-009 | Agent monitors onboarding checklist completion and escalates incomplete tasks 3 days before start date | Must Have |
| OB-FR-010 | All Claude-generated content (welcome message, onboarding pack) held for HR approval before sending | Must Have |
| OB-FR-011 | Agent generates a weekly onboarding pipeline report for Lynda — hires in progress, completion status | Should Have |
| OB-FR-012 | Agent supports remote, hybrid, and Dublin/London office onboarding variations | Should Have |

### Non-Functional Requirements

| Req ID | Requirement | Standard |
|---|---|---|
| OB-NFR-001 | All communications sent within agreed SLA of trigger event | Performance |
| OB-NFR-002 | Welcome pack generated within 30 minutes of trigger — ready for HR review | Performance |
| OB-NFR-003 | GDPR compliance: new hire personal data handled per Spectrum.Life data policy | Compliance |
| OB-NFR-004 | Audit trail: all agent actions logged — immutable, reviewable by HR and IT governance | Governance |
| OB-NFR-005 | Scalability: agent must handle concurrent new hires without degradation — tested to 20 simultaneous | Scalability |

### Acceptance Criteria

- [ ] Agent triggers within 1 hour of Offer Accepted status
- [ ] Personalised welcome message generated using new hire's actual name, role, and manager
- [ ] Onboarding document pack generated and held for HR approval — not auto-sent
- [ ] Salesforce employee profile created with all required fields populated
- [ ] IT access request sent with correct system requirements for role
- [ ] Onboarding task checklist created and assigned to correct manager
- [ ] Manager check-in reminders scheduled at correct intervals
- [ ] Claude Project assignment completed for new hire's role
- [ ] Incomplete task escalation tested — fires 3 days before start date
- [ ] UAT sign-off from Lynda and 2 HR team members

### Success Metrics (90 Days Post-Launch)

| Metric | Baseline | Target |
|---|---|---|
| HR admin time per new hire onboarding | 3-4 hours | Under 45 minutes |
| Onboarding pack consistency | Variable | 100% — same structure, personalised content |
| IT access ready on Day 1 | ~70% (estimated) | 95%+ |
| Manager check-in completion rate | Variable | 80%+ (tracked in Salesforce) |
| New hire Day 1 satisfaction score | Not currently measured | 4+/5 |

---

## Section 6 — Use Case 3: Sales Renewal Agent

### Problem Statement

Spectrum.Life manages 3,000 corporate clients. Majority of revenue growth comes from the UK. Client renewals are managed reactively — account managers typically identify at-risk renewals too late, proposal drafting is manual and time-consuming, and there is no systematic early warning system in the Salesforce DHOS.

A 5% improvement in renewal rate at €25M revenue = €1.25M protected annually. The Sales Renewal Agent makes renewal management proactive, systematic, and scalable.

### As-Is Process (Current State)

```
Contract end date approaches
         ↓
Account Manager notices (manually — calendar or Salesforce date field)
         ↓
Account Manager manually reviews account health (manual — multiple Salesforce screens)
         ↓
Account Manager manually assesses renewal risk (subjective, inconsistent)
         ↓
Account Manager manually drafts renewal proposal (2-3 hours per proposal)
         ↓
Account Manager manually schedules renewal conversation (manual outreach)
         ↓
Renewal won or lost — no systematic tracking of risk factors
```

**Pain points:** Reactive not proactive, inconsistent risk assessment, proposal drafting is a major time drain, no early warning system, at-risk accounts often identified too late to recover.

### To-Be Process (Agentforce Agent)

```
Scheduled: Agent runs daily at 06:00 against all active accounts
         ↓
Agent OBSERVES: for each account — contract end date, last login,
                EAP utilisation rate, NPS score, support tickets,
                last account manager contact date, invoice history
         ↓
Agent calls CLAUDE: calculates renewal risk score (0-100)
                    identifies top 3 risk factors for this account
                    generates renewal risk narrative (2 sentences)
         ↓
Agent REASONS: applies renewal risk thresholds
               90+ days to renewal = monitor
               60-89 days = amber alert
               Under 60 days = red alert
               Under 30 days + high risk = escalate to manager
         ↓
Agent ACTS:
  • Updates account record with renewal risk score and narrative
  • Creates renewal task for account manager at 90-day mark
  • Sends amber alert to account manager at 60-day mark
  • Generates first-draft renewal proposal at 60-day mark (Claude)
  • Sends red alert with escalation recommendation at 30-day mark
  • Escalates high-risk renewals under 30 days to sales manager
         ↓
Account Manager REVIEWS:
  • Receives renewal task with risk score, narrative, and proposal draft
  • Refines proposal and personalises (30-60 min vs 2-3 hours)
  • Initiates renewal conversation with full context in hand
         ↓
Renewal outcome logged in Salesforce — win/loss and reason
```

### Agent Design Specification

**Agent Name:** SalesRenewalIntelligence_v1
**Agent Type:** Scheduled monitoring and alert agent
**Trigger:** Daily schedule — 06:00. Also triggered on significant account health change (utilisation drop >20% in 30 days)
**Salesforce Objects Accessed:** Account, Contract, Opportunity, Case (support tickets), NPS Score (custom object), Login/Usage Data (custom object), User (Account Manager)

**Agent Actions:**

| Action | Type | Claude Involvement | Human Approval Required |
|---|---|---|---|
| Calculate renewal risk score | AI scoring | Yes — Claude weights factors and scores 0-100 | No — score is a data point |
| Generate renewal risk narrative | AI generation | Yes — 2-sentence plain English explanation | No — narrative is informational |
| Create renewal task at 90 days | Task creation | No | No |
| Send amber alert at 60 days | Notification | No | No |
| Generate first-draft renewal proposal | AI generation | Yes — full proposal draft | Yes — Account Manager reviews and refines |
| Send red alert at 30 days | Notification | No | No |
| Escalate high-risk under 30 days | Task + Alert to manager | No | No — escalation is automatic |
| Update account renewal health dashboard | Record update | No | No |

### Functional Requirements

| Req ID | Requirement | Priority |
|---|---|---|
| REN-FR-001 | Agent runs daily at 06:00 and processes all active accounts with contracts ending within 180 days | Must Have |
| REN-FR-002 | Agent calculates renewal risk score (0-100) for each account based on minimum 6 data inputs: contract end date, utilisation rate, NPS, support ticket volume, last AM contact, invoice status | Must Have |
| REN-FR-003 | Agent generates renewal risk narrative in plain English — top 3 risk factors identified | Must Have |
| REN-FR-004 | Agent creates renewal task assigned to Account Manager at 90-day mark | Must Have |
| REN-FR-005 | Agent sends amber alert notification to Account Manager at 60-day mark with risk score and narrative | Must Have |
| REN-FR-006 | Agent generates first-draft renewal proposal using Claude at 60-day mark — held for AM review | Must Have |
| REN-FR-007 | Agent sends red alert to Account Manager and Sales Manager at 30-day mark | Must Have |
| REN-FR-008 | Agent escalates accounts scoring 70+ risk with under 30 days to renewal — creates manager task | Must Have |
| REN-FR-009 | Agent triggers alert on significant utilisation drop (>20% in 30 days) regardless of contract end date | Must Have |
| REN-FR-010 | Agent maintains a live renewal health dashboard in Salesforce — all accounts, risk scores, status | Must Have |
| REN-FR-011 | Agent logs renewal outcome (won/lost/reason) for analysis and model improvement | Should Have |
| REN-FR-012 | Agent generates weekly renewal pipeline summary for Sales Lead — accounts at each risk tier | Should Have |

### Non-Functional Requirements

| Req ID | Requirement | Standard |
|---|---|---|
| REN-NFR-001 | Daily run completes within 2 hours for full account portfolio | Performance |
| REN-NFR-002 | Risk score recalculated within 4 hours of significant account health change | Performance |
| REN-NFR-003 | Proposal draft generated within 30 minutes of 60-day trigger | Performance |
| REN-NFR-004 | Audit trail: all scoring decisions and alert actions logged with data inputs used | Governance |
| REN-NFR-005 | Accuracy: renewal risk score predictive accuracy tracked — refined quarterly based on won/lost outcomes | Quality |

### Acceptance Criteria

- [ ] Agent runs daily at 06:00 — confirmed for full account portfolio
- [ ] Renewal risk score calculated for 100% of accounts with contract end within 180 days
- [ ] Risk score uses minimum 6 confirmed data inputs from Salesforce
- [ ] Renewal task created at 90-day mark — confirmed with correct AM assignment
- [ ] Amber alert sent at 60-day mark — includes risk score and plain-English narrative
- [ ] Renewal proposal draft generated at 60-day mark — held for AM review, not auto-sent
- [ ] Red alert sent at 30-day mark — Account Manager and Sales Manager both notified
- [ ] High-risk escalation (70+ score, under 30 days) tested and confirmed
- [ ] Utilisation drop trigger (>20% in 30 days) tested and confirmed
- [ ] UAT sign-off from Sales Lead and 3 Account Managers

### Success Metrics (90 Days Post-Launch)

| Metric | Baseline | Target |
|---|---|---|
| Average renewal identification lead time | ~30 days | 90+ days |
| Proposal drafting time | 2-3 hours | 30-45 minutes |
| Renewal rate (won/total renewals) | Current rate (establish baseline at launch) | +5% improvement |
| At-risk accounts actioned before 30 days | ~40% (estimated) | 90%+ |
| Account Manager satisfaction with renewal support | N/A | 4+/5 in monthly pulse |

---

## Section 7 — Implementation Sequence

### Recommended Build Order

**Build Agent 2 (HR Onboarding) first.**

Counter-intuitive — but correct. Here is the rationale:

| Factor | Agent 1 Clinical | Agent 2 HR | Agent 3 Sales |
|---|---|---|---|
| Data readiness | Medium — member contact data needs mapping | High — employee records already in Salesforce | Medium — utilisation data quality needs audit |
| Clinical risk | High — requires full GDPR Article 9 review | Low — standard personal data only | Low — commercial data only |
| Governance requirements | Extensive — DPA, consent mapping, clinical boundary review | Standard — GDPR standard | Standard — GDPR standard |
| Business urgency | High — ongoing daily pain | Very high — 100+ hires NOW | High — ongoing revenue risk |
| Complexity | High — 24/7, multi-channel, real-time routing | Medium — event-triggered, clear workflow | Medium — scheduled, data-driven |
| Quick win potential | Medium | **Highest** | High |

Agent 2 is the fastest to implement, has the clearest data in Salesforce, and delivers immediate visible impact to Lynda — which builds the organisational confidence for the clinical deployment.

**Recommended sequence:**

```
Week 1-2:   Requirements review and Salesforce data audit
Week 3-6:   Agent 2 (HR Onboarding) — build and UAT
Week 7-8:   Agent 2 live · begin Agent 3 requirements
Week 9-14:  Agent 3 (Sales Renewal) — build and UAT
Week 15-16: Agent 3 live · begin Agent 1 requirements + GDPR review
Week 17-24: Agent 1 (Clinical Triage) — build, extended UAT, clinical governance sign-off
Week 25:    All three agents live · monitoring and optimisation begins
```

### Pre-Implementation Requirements

Before any agent is built, these must be confirmed:

**All agents:**
- [ ] Salesforce data quality audit — are the required fields populated and accurate?
- [ ] Agentforce licence confirmed and activated in Spectrum.Life's Salesforce org
- [ ] Claude API integration configured within Salesforce
- [ ] AI Transformation Partner has read access to all relevant Salesforce objects for requirements validation

**Agent 1 (Clinical) additionally:**
- [ ] Data Processing Agreement with Anthropic confirmed for Article 9 data
- [ ] Consent mapping for member contact data documented
- [ ] Clinical governance sign-off from Dr. Sarah O'Neill (Chief Clinical Officer)
- [ ] 24/7 fallback routing rules defined for when agent or Claude API is unavailable

---

## Section 8 — Governance and Risk

### Risk Register

| Risk | Agent | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| Clinical data mishandled in Agent 1 | Agent 1 | Low | Very High | Full GDPR Article 9 review before build. DPA and consent mapping mandatory. No build without sign-off. |
| Incorrect urgency classification causing delayed clinical response | Agent 1 | Medium | High | Conservative classification — when in doubt, classify up. Fallback to senior CM. Override capability always available. |
| Salesforce data quality insufficient for risk scoring | Agent 3 | Medium | Medium | Data audit before build. Minimum 6 data fields must be populated for 90%+ of accounts before go-live. |
| Over-reliance on agent — staff stop applying judgement | All | Low | Medium | Training emphasises agent as decision support, not decision replacement. Override rates monitored. |
| Claude API downtime affecting agent operation | All | Low | Medium | Fallback rules defined for all agents — default routing, manual alerts. No single point of failure. |
| Agentforce configuration complexity exceeds BA scope | All | Medium | Medium | BA defines requirements. Salesforce developer configures. Clear handoff point documented. |
| Staff resistance to automated routing/onboarding | Agent 1, 2 | Medium | Low | Enablement-first — involve Case Managers and HR team in UAT. Focus on time saved, not job threat. |

### EU AI Act Considerations

Agent 1 (Clinical Triage Routing) involves AI-assisted triage of health-related contacts. Under the EU AI Act, systems that influence access to healthcare services may fall under the **high-risk AI system** classification (Annex III).

**Required actions before Agent 1 deployment:**
- Legal review of EU AI Act Article 6 applicability to this specific use case
- If high-risk classification confirmed: conformity assessment, technical documentation, human oversight measures, and transparency obligations must be met
- Alignment with Cara's existing EU AI Act compliance framework — leverage existing governance infrastructure
- Clinical governance sign-off confirming agent does not cross the threshold from administrative routing to clinical decision-making

**Agents 2 and 3** do not involve healthcare data or clinical decision-making — standard AI governance principles apply.

---

## Section 9 — Success Definition

### 90-Day Target State (All Three Agents Live)

| Dimension | Target |
|---|---|
| Pre-clinical admin per intake | Under 3 minutes (from 8-12 minutes) |
| HR onboarding admin per hire | Under 45 minutes (from 3-4 hours) |
| Renewal identification lead time | 90+ days (from ~30 days) |
| Salesforce DHOS utilisation | 50%+ (from ~30%) |
| Case Manager override rate (Agent 1) | Below 15% |
| IT access ready on Day 1 (Agent 2) | 95%+ |
| Renewal rate improvement (Agent 3) | +5% vs baseline |
| Agent-related GDPR incidents | Zero |
| Staff satisfaction with agents | 4+/5 across all three user groups |

### Longer-Term Vision

These three agents are the foundation — not the ceiling. Once live and proven, they create the platform for the next wave of Agentforce deployment across Clinical Governance, Finance, and Learning & Development (Phase 2 in the Agentforce Opportunity Map).

The architecture built for these three agents — Claude as language layer, Salesforce as data layer, human review as governance layer — scales to every subsequent use case. The investment in getting the foundation right pays back across every agent that follows.

---

## Appendix — Agentforce Glossary

| Term | Definition |
|---|---|
| **Agent** | A configured, goal-directed AI workflow in Agentforce that can observe, reason, and act within defined boundaries |
| **Trigger** | The event or schedule that activates an agent |
| **Action** | A specific operation an agent can perform — update a record, send a notification, call an API |
| **Boundary** | A defined limit on what an agent can do autonomously — anything beyond the boundary requires human involvement |
| **Human-in-the-loop** | A checkpoint where a human must review and approve before the agent proceeds |
| **Fallback** | The predefined behaviour when an agent cannot complete its normal workflow — ensures no process fails silently |
| **Audit trail** | The immutable log of every action an agent takes — required for governance and clinical compliance |
| **Claude API** | The programmatic connection to Claude (Anthropic) — used as the language intelligence layer within Agentforce workflows |
| **DHOS** | Digital Health Operating System — Spectrum.Life's term for their Salesforce platform |
| **Override** | A human's ability to countermand an agent's decision — always available, always logged |

---

*Document prepared by Naveen Rao V | AI Transformation Partner Candidate | April 2026*
*Portfolio: github.com/Naveenraov/ai-transformation-ba-wellbeing-platform*
