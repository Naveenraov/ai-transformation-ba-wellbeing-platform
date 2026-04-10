# Project D — Operations Automation Opportunity Map
### Spectrum.Life | AI Transformation Partner Portfolio | Naveen Rao V | April 2026

---

## Executive Summary

Spectrum.Life is targeting €100M in revenue by 2028 — a 4x growth trajectory that demands operational infrastructure capable of scaling at the same pace. Hiring alone cannot sustain that growth without proportional cost inflation. **Automation is how Spectrum.Life scales operations without scaling headcount.**

Stephen Costello has set a clear ambition: automate **40-60% of all operational tasks** using Claude and AI tooling. This document maps every operational area across Spectrum.Life to its automation potential — identifying where the highest-value opportunities sit, which tools best fit each area, and how to sequence delivery for maximum early impact.

> **North star principle:** Every automation identified in this document starts with a real person doing a real task that drains their time. The goal is not technology for its own sake — it is giving people back the hours they currently spend on repetition, so they can focus on the work only humans can do.

**Headline findings:**

- **8 operational departments** mapped across the full organisation
- **28 automation opportunities** identified and prioritised
- **Top 3 quick wins** deliverable within 90 days with existing tooling
- Estimated **1.5–2.5 hours per Case Manager per day** recoverable through clinical ops automation alone
- Claude, Salesforce Flows, and Agentforce together cover **95%+ of identified opportunities**

---

## Methodology

Each department was assessed across two dimensions:

**Automation Potential** — scored by:
- Volume: how many times does this task happen per day/week?
- Repetition: how rules-based and predictable is it?
- Data readiness: is the input structured enough for AI to act on?
- Current pain: how much time/frustration does it cause?

**Feasibility** — scored by:
- Risk level: are clinical decisions involved? What are the governance implications?
- Technical dependency: does it require integrations that don't yet exist?
- Change readiness: will the team adopt it?

**Tool selection logic:**
- **Claude** — unstructured language tasks: drafting, summarising, classifying, generating, answering
- **Salesforce Flows** — structured workflow automation within the DHOS: routing, triggers, notifications, approvals
- **Agentforce** — autonomous multi-step tasks: end-to-end processes that span multiple systems or decisions
- **Claude + Salesforce** — hybrid: AI handles the language layer, Salesforce handles the workflow layer

**Prioritisation tiers:**

| Tier | Label | Criteria |
|------|-------|----------|
| 🔴 | Quick Win | High impact + low effort + can start now with existing tools |
| 🟠 | Strategic Build | High impact + medium effort + requires some integration work |
| 🟡 | Future State | High impact + higher effort + requires Agentforce or new data pipelines |
| ⚪ | Low Priority | Lower volume or lower impact — revisit after quick wins proven |

---

## Department-by-Department Automation Map

---

### 1. Clinical Operations & EAP

**Context:** The operational heart of Spectrum.Life. Case Managers are fully qualified psychotherapists spending an estimated 40-50% of their day on admin tasks rather than clinical work. This is the single highest-value automation target in the organisation.

**Daily reality:** Inbound contacts across phone, WhatsApp, live chat, SMS, and email. Shared mail inbox management. Structured screening assessments. Risk assessments. Manual scheduling. Case note documentation. Monthly participation reporting. Regular call audits.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **Inbox triage & classification** — Claude reads incoming messages, classifies by urgency and type, drafts suggested response or action. Case Manager reviews and approves. | Claude | 🔴 Quick Win | 35–45 min/day per Case Manager |
| **Case note generation** — Case Manager provides a 2-sentence call summary; Claude generates a full, structured, audit-ready case note. | Claude | 🔴 Quick Win | 25–40 min/day per Case Manager |
| **Scheduling assistant** — Claude identifies available slots, proposes options, drafts confirmation messages to client and clinician. One click to approve. | Claude + Salesforce Flow | 🟠 Strategic | 20–30 min/day per Case Manager |
| **Pre-audit readiness report** — Claude reviews recent case notes against documentation guidelines, flags gaps before formal audit. | Claude | 🟠 Strategic | 1–2 hrs per audit cycle |
| **EAP participation reporting** — Claude auto-generates monthly utilisation and outcome reports from structured case data in Salesforce. | Claude + Salesforce | 🟠 Strategic | 3–5 hrs/month per team lead |
| **Risk flag summarisation** — Claude scans case records and surfaces members with unresolved risk flags for clinical review. | Claude + Agentforce | 🟡 Future State | Reduces oversight gaps |
| **Triage intake pre-population** — Agentforce pre-populates intake form fields from inbound contact data before Case Manager begins screening. | Agentforce | 🟡 Future State | 5–8 min per intake saved |

**Aggregate opportunity:** Each Case Manager recovers **1.5–2.5 hours of clinical time per day**. Across a team of 10–15 Case Managers, this equals **15–37 additional clinical hours per day** — equivalent to 2–4 additional clinical FTEs without new headcount.

---

### 2. HR & People Operations

**Context:** Lynda's team is managing Spectrum.Life's most intensive hiring period — 100+ new hires over 18 months — while simultaneously managing Salesforce without a dedicated BA. One live Claude deployment already exists: the MS Teams HR FAQ chatbot. This is the most natural starting point for Claude expansion.

**Daily reality:** High-volume candidate management, onboarding documentation, policy queries (the existing Teams bot handles these), payroll admin, counsellor CPD tracking, staff communications at scale.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **HR FAQ chatbot expansion** — Build on the existing MS Teams Claude chatbot. Expand from basic FAQs to cover onboarding process, benefits queries, leave policies, and CPD questions using Claude Projects. | Claude Projects | 🔴 Quick Win | Reduces HR query volume 40-60% |
| **Onboarding document pack generation** — Claude generates personalised onboarding documents (welcome letter, role overview, team intro, IT setup checklist) for each new hire from a template + Salesforce data. | Claude + Salesforce Flow | 🔴 Quick Win | 45–60 min per new hire saved |
| **Job description drafting** — Claude generates first-draft JDs from a role brief. Hiring manager reviews and refines. Consistent format, faster time-to-post. | Claude | 🔴 Quick Win | 1–2 hrs per hire saved |
| **Interview scheduling automation** — Salesforce Flow triggers scheduling workflow on application status change; Claude drafts confirmation and briefing emails. | Claude + Salesforce Flow | 🟠 Strategic | Reduces coordination admin 50%+ |
| **Counsellor CPD tracking** — Automated reminders and tracking of CPD completion status. Flags at-risk counsellors before accreditation deadlines. | Salesforce Flow | 🟠 Strategic | Eliminates manual tracking |
| **Offboarding workflow** — Automated checklist triggered on resignation: IT access revocation, final pay processing, knowledge transfer tasks. | Agentforce | 🟡 Future State | Reduces HR offboarding admin 70% |

---

### 3. Sales & Account Management

**Context:** Spectrum.Life manages 3,000 corporate clients across UK and Ireland, with majority of new business growth coming from the UK. Client renewals, proposals, utilisation reporting, and partnership management are all high-volume, repetitive, and currently largely manual. Salesforce DHOS is the CRM but only ~30% utilised.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **Renewal risk scoring** — Salesforce Flow calculates renewal risk score for each account based on usage data, NPS, and last engagement date. Flags at-risk accounts to account manager automatically. | Salesforce Flow | 🔴 Quick Win | Prevents revenue churn |
| **Proposal drafting** — Claude generates first-draft client proposals from a brief covering client size, sector, and EAP requirements. Account manager refines and personalises. | Claude | 🔴 Quick Win | 2–3 hrs per proposal saved |
| **Client EAP utilisation reports** — Claude generates monthly utilisation summary reports for corporate clients from Salesforce data. Consistent format, no manual compilation. | Claude + Salesforce | 🟠 Strategic | 30–60 min per client per month saved |
| **Lead qualification** — Agentforce qualifies inbound leads against ideal client profile (size, sector, geography, budget signals) before routing to sales team. | Agentforce | 🟠 Strategic | Reduces unqualified pipeline noise |
| **Post-meeting follow-up** — Claude generates follow-up emails and action summaries from meeting notes or call transcripts. | Claude | 🔴 Quick Win | 20–30 min per meeting saved |
| **Contract renewal pack** — Automated generation of renewal pack (updated pricing, utilisation summary, case for renewal) when contract end date approaches. | Claude + Salesforce Flow | 🟡 Future State | Scales renewal management 3x |

---

### 4. Finance & Reporting

**Context:** Spectrum.Life is tracking revenue against a €100M 2028 target with 50%+ annual growth. Finance reporting, cost tracking, and ROI analysis for automation initiatives are all currently manual. Leadership requires clear, regular performance summaries.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **Weekly revenue dashboard narrative** — Claude generates a 1-page plain-English narrative summary of the week's financial performance from Salesforce/reporting data. Ready for Stephen and the board. | Claude + Salesforce | 🔴 Quick Win | 2–3 hrs/week saved |
| **Automation ROI tracking** — Standardised template and Claude-generated summary tracking the cost savings and efficiency gains from each automation initiative deployed. | Claude + Salesforce | 🟠 Strategic | Makes the business case visible |
| **Budget variance flagging** — Salesforce Flow monitors actuals vs budget monthly and triggers alert with Claude-generated variance explanation when threshold exceeded. | Salesforce Flow + Claude | 🟠 Strategic | Faster exception management |
| **Investor/board update drafting** — Claude generates first-draft quarterly board updates from structured financial and operational data. | Claude | 🟡 Future State | 4–6 hrs per quarter saved |

---

### 5. Clinical Governance & Quality

**Context:** Clinical governance is non-negotiable at Spectrum.Life — they operate in a regulated environment serving vulnerable members. Cara is already CE Class I certified and progressing to Class II. GDPR Article 9 applies to all clinical data. Audit and compliance documentation is currently manual and inconsistent.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **Governance document drafting** — Claude generates first drafts of policy updates, audit reports, and compliance summaries. Clinical governance lead reviews and approves. | Claude | 🔴 Quick Win | 3–5 hrs per document saved |
| **GDPR Article 9 consent tracking** — Salesforce Flow tracks consent status for all clinical data interactions. Flags missing or expired consents automatically. | Salesforce Flow | 🟠 Strategic | Eliminates manual consent audit |
| **Incident report generation** — Claude generates structured incident report from brief case manager input. Consistent format. Audit-ready immediately. | Claude | 🟠 Strategic | 45–60 min per incident saved |
| **EU AI Act compliance monitoring** — Claude monitors Cara-related documentation and flags where internal practices diverge from EU AI Act Article 6 obligations. | Claude | 🟡 Future State | Proactive compliance posture |
| **Call audit support** — Claude pre-reviews case notes against clinical standards before formal audit. Pre-audit readiness report generated automatically. | Claude | 🟠 Strategic | 1–2 hrs per audit cycle saved |

---

### 6. Learning & Development

**Context:** With 100+ new hires coming and counsellor turnover a known issue, L&D is under pressure. Stephen is also pushing the entire organisation to build Claude confidence — the AI enablement workstream needs structure and governance.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **AI enablement training content** — Claude generates department-specific AI training materials: what Claude can do for your team, how to use it safely, prompt examples. Scales Stephen's push org-wide. | Claude Skills | 🔴 Quick Win | Enables org-wide Claude adoption |
| **Counsellor onboarding guide generation** — Claude generates personalised onboarding guides for new counsellors covering clinical protocols, EAP procedures, Salesforce basics, and escalation rules. | Claude | 🔴 Quick Win | Reduces onboarding inconsistency |
| **CPD content curation** — Claude curates relevant CPD resources for each counsellor based on their specialisation and upcoming accreditation requirements. | Claude | 🟠 Strategic | Supports counsellor retention |
| **Training needs analysis** — Claude analyses case audit results and performance data to identify training gaps across the clinical team. | Claude + Salesforce | 🟡 Future State | Data-driven L&D targeting |

---

### 7. Marketing & Content

**Context:** Spectrum.Life produces a high volume of content — case studies, resources, leadership guides, partner proposals, and social content. Content is a significant driver of their B2B pipeline. Most production is currently manual.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **Case study drafting** — Claude generates first-draft client case studies from a structured brief (client, challenge, solution, outcome). Marketing team refines and approves. | Claude | 🔴 Quick Win | 3–4 hrs per case study saved |
| **Partner proposal generation** — Claude generates tailored proposals for new insurer or corporate partnerships from a standard template + client context. | Claude | 🟠 Strategic | 2–3 hrs per proposal saved |
| **Blog and resource content** — Claude drafts thought leadership content, wellbeing resources, and educational articles. Editor reviews and publishes. | Claude | 🔴 Quick Win | 2–3 hrs per piece saved |
| **Social content calendar** — Claude generates a month of LinkedIn and social content from a brief covering themes, key messages, and upcoming events. | Claude | 🟠 Strategic | 4–6 hrs/month saved |

---

### 8. Product & Technology

**Context:** The Product and Technology team maintains the DHOS (Salesforce), manages Cara's development pipeline, and owns SDK integrations for insurer partners. Agentforce is entirely greenfield — no use cases defined, no implementation started.

| Automation Opportunity | Tool | Priority | Estimated Impact |
|---|---|---|---|
| **Agentforce use case scoping** — Define and document the first 3 Agentforce use cases for Spectrum.Life's DHOS. Clinical triage routing, HR onboarding, and sales renewal are the recommended starting points. | Agentforce | 🟠 Strategic | Unlocks greenfield capability |
| **Release notes and documentation** — Claude generates structured release notes and technical documentation from developer commit summaries or brief inputs. | Claude | 🔴 Quick Win | 1–2 hrs per release saved |
| **Bug triage summarisation** — Claude summarises and classifies inbound bug reports or support tickets before routing to the appropriate technical team. | Claude + Salesforce Flow | 🟠 Strategic | Reduces triage time 40–60% |
| **Cara monitoring reports** — Claude generates weekly clinical safety monitoring summaries for Cara — conversation quality, escalation rates, risk flag trends — for clinical governance review. | Claude + Salesforce | 🟡 Future State | Keeps Cara CE-compliant at scale |

---

## Prioritisation Matrix

```
HIGH IMPACT
     │
     │  ● Inbox Triage (Clinical)        ● Agentforce Use Cases (Product)
     │  ● Case Note Generation           ● Lead Qualification (Sales)
     │  ● HR FAQ Expansion               ● EAP Utilisation Reports (Sales)
     │  ● Onboarding Docs (HR)           ● Risk Flag Monitoring (Clinical)
     │  ● Renewal Risk Scoring (Sales)
     │  ● Proposal Drafting (Sales)
     │
     │─────────────────────────────────────────────────────────────────────
     │
     │  ● Revenue Dashboard (Finance)    ● Cara Monitoring (Product)
     │  ● Case Study Drafting            ● Investor Update (Finance)
     │  ● Governance Doc Drafting        ● Training Needs Analysis (L&D)
     │
LOW IMPACT
     └─────────────────────────────────────────────────────────────────────
           LOW EFFORT                              HIGH EFFORT
           (Start now)                             (Plan carefully)
```

**Quick Wins** (top-left): Start immediately. Existing tools. High return.
**Strategic Builds** (top-right): Plan now. Build Q2–Q3. Unlock major capability.
**Supporting** (bottom-left): Run alongside quick wins. Low overhead.
**Future State** (bottom-right): Sequence after foundations proven.

---

## 90-Day Quick Win Plan

These three automations can be started immediately with Claude and Salesforce Flows — no new integrations, no Agentforce configuration required.

---

### Quick Win 1 — Clinical Inbox Triage & Case Note Generator
**Department:** Clinical Operations
**Tool:** Claude (API — existing setup from Project B)
**Timeline:** Weeks 1–3

**What it does:**
- Reads incoming Case Manager emails and WhatsApp messages
- Classifies each by urgency (routine / urgent / critical) and type (new referral / existing case / admin)
- Drafts a suggested response or action
- After each call, generates a full structured case note from a 2-sentence summary

**Why first:**
This is the highest-pain, highest-volume, lowest-risk automation in the organisation. It requires no Salesforce integration, no clinical decision-making — only language processing. It demonstrates immediate, measurable value to the clinical team.

**Success metric:** Case Manager admin time reduced by 35–45 minutes per day within 30 days of deployment.

---

### Quick Win 2 — HR FAQ Chatbot Expansion
**Department:** HR & People Operations
**Tool:** Claude Projects (expanding the existing MS Teams deployment)
**Timeline:** Weeks 2–4

**What it does:**
- Extends the existing Teams HR chatbot from basic FAQs to a full Claude Project
- Adds persistent context: HR policies, onboarding procedures, benefits information, CPD requirements
- Generates personalised onboarding document packs for each new hire

**Why second:**
The infrastructure already exists. One live Claude HR deployment is already running. Expanding it is the fastest path to demonstrating Claude Projects in action — which is exactly what Stephen wants to show the organisation.

**Success metric:** HR query volume handled by Claude increases from ~20% to 60%+ within 60 days.

---

### Quick Win 3 — Sales Renewal Risk Scoring & Proposal Drafting
**Department:** Sales & Account Management
**Tool:** Salesforce Flow (renewal scoring) + Claude (proposal drafting)
**Timeline:** Weeks 3–6

**What it does:**
- Salesforce Flow calculates a renewal risk score for every account based on last login, usage data, NPS, and contract end date
- Flags at-risk accounts automatically to the account manager
- Claude generates first-draft renewal proposals from account data
- Account manager personalises and sends

**Why third:**
With 3,000 corporate clients and majority growth coming from UK, renewal management is a direct revenue protection play. Even a 5% improvement in renewal rate at €25M revenue is a €1.25M impact.

**Success metric:** At-risk account identification lead time increased by 60+ days. Proposal drafting time reduced from 2–3 hours to 30 minutes.

---

## Governance & Responsible AI

Every automation in this map is subject to Spectrum.Life's responsible AI principles:

**Clinical boundary:** Claude and Agentforce handle the administrative and language layer only. Clinical decisions — risk assessments, therapeutic judgements, escalation calls — remain with qualified clinicians at all times. Human-in-the-loop is preserved at every clinical step.

**Data handling:** All automations involving clinical data must comply with GDPR Article 9 (special category data). No clinical data is passed to external AI APIs without explicit consent mapping and data processing agreements in place.

**EU AI Act alignment:** Cara is already progressing to Class II CE certification under the EU AI Act. Internal automation tools must be assessed against the Act's high-risk classification criteria — any tool that influences clinical care pathways requires the same governance rigour applied to Cara.

**Audit trail:** Every Claude-generated output (case notes, reports, proposals) is reviewed and approved by a human before action. All approvals are logged.

**Escalation:** Any automation that produces an output flagged as high-risk (clinical or financial) must route to a human reviewer before it is acted upon. No fully autonomous action on sensitive data.

---

## 12-Month Roadmap Summary

| Phase | Timeline | Focus | Key Deliverables |
|---|---|---|---|
| **Foundation** | Months 1–3 | Quick wins — prove value fast | Inbox triage, case note generator, HR FAQ expansion, renewal risk scoring |
| **Expansion** | Months 4–6 | Deepen and broaden | Scheduling assistant, onboarding automation, client utilisation reports, governance doc automation |
| **Scale** | Months 7–9 | Agentforce first use cases | Clinical triage routing agent, HR onboarding agent, sales lead qualification agent |
| **Optimise** | Months 10–12 | Close the loop | ROI measurement, Cara monitoring automation, advanced reporting, org-wide Claude adoption |

**Target by Month 12:** 40% of identified operational tasks automated or AI-assisted. Case Manager clinical time recovered by 2+ hours/day. Salesforce DHOS utilisation increased from 30% to 70%+. Claude adoption across HR, Clinical, Sales, Finance, and Marketing teams.

---

## Key Statistics for Stakeholder Conversations

| Metric | Figure | Source |
|---|---|---|
| Revenue target | €100M by 2028 | Stuart McGoldrick, May 2024 |
| Current revenue | ~€25M (2024) | Public reporting |
| Annual growth rate | 50–60% | Public reporting |
| Members served | 9.8M+ | Stephen Costello, Insurtech Insights |
| Corporate clients | 3,000 | Spectrum.Life |
| Salesforce utilisation | ~30% | Lynda (CPO) — Round 2 intelligence |
| Stephen's automation target | 40–60% of all operational tasks | Lynda (CPO) — Round 2 intelligence |
| Clinical time recoverable (per CM) | 1.5–2.5 hrs/day | Derived from Case Manager job description analysis |
| Live Claude deployments | 1 (MS Teams HR chatbot) | Lynda (CPO) — Round 2 intelligence |

---

*Document prepared by Naveen Rao V | AI Transformation Partner Candidate | April 2026*
*Portfolio repository: github.com/Naveenraov/ai-transformation-ba-wellbeing-platform*
