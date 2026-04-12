# Project G — Agentforce Use Case Discovery Document
### Salesforce DHOS | First Three Agentforce Implementations | Full BA Requirements
### Spectrum.Life | AI Transformation Partner Portfolio | Naveen Rao V | April 2026

---

## What This Project Is

Spectrum.Life has built its entire Digital Health Operating System on Salesforce. Agentforce — Salesforce's autonomous AI agent capability — has never been touched. No use cases defined. No implementation started. Complete greenfield.

This document defines Spectrum.Life's first three Agentforce use cases, scopes each one to full BA requirements specification, and provides a clear implementation sequence. Everything needed to brief a Salesforce developer and say: **build this.**

---

## The Three Agents

| Agent | Department | Problem Solved | Daily Impact |
|---|---|---|---|
| **Agent 1 — Clinical Triage Routing** | Clinical / EAP | 8-12 min of pre-clinical admin per intake | 400-600 min/day recovered |
| **Agent 2 — HR Onboarding** | HR & People | 3-4 hrs of manual onboarding per hire | 70% admin reduction |
| **Agent 3 — Sales Renewal** | Sales & Account Mgmt | Renewals managed reactively, too late | 90-day earlier risk identification |

---

## Integration Architecture

```
AGENTFORCE AGENT
TRIGGER → OBSERVE → REASON → ACT → HUMAN REVIEW
              ↕
        CLAUDE API (Language layer)
        Classify · Draft · Summarise · Score
              ↕
        SALESFORCE DHOS (Data layer)
        Contacts · Cases · Accounts · Employee records
              ↕
        HUMAN REVIEW LAYER
        All clinical and financial outputs reviewed before action
```

Claude is the language intelligence layer inside each Agentforce workflow. Agentforce orchestrates. Claude handles language. Salesforce holds the data. Humans review clinical and financial decisions.

---

## Document Sections

| Section | Contents |
|---------|----------|
| 1 — What Is Agentforce | BA-level explanation, Flow vs Agent comparison, Claude integration architecture |
| 2 — Opportunity Map | All 8 departments mapped to Agentforce potential with prioritisation rationale |
| 3 — Agent 1: Clinical Triage Routing | Full BA spec — problem, as-is/to-be, 12 FRs, 7 NFRs, acceptance criteria, success metrics |
| 4 — Agent 2: HR Onboarding | Full BA spec — problem, as-is/to-be, 12 FRs, 5 NFRs, acceptance criteria, success metrics |
| 5 — Agent 3: Sales Renewal | Full BA spec — problem, renewal risk scoring model, 12 FRs, 5 NFRs, acceptance criteria, success metrics |
| 6 — Implementation Sequence | Build order rationale, 25-week timeline, pre-implementation checklist |
| 7 — Governance and Risk | Risk register, EU AI Act consideration for Agent 1, GDPR Article 9 |
| 8 — Success Definition | 90-day target state across all three agents |

---

## Key Design Decisions

**Build Agent 2 first (HR Onboarding) — not Agent 1 (Clinical)**
Counter-intuitive but correct. Agent 2 has the clearest data in Salesforce, lowest governance overhead, and delivers immediate visible impact to Lynda — building organisational confidence before the more complex clinical deployment.

**Claude as language layer, not as decision-maker**
Claude classifies, drafts, summarises, and scores. Agentforce orchestrates the workflow. Salesforce holds the data. Humans review clinical and financial decisions. Clean separation of concerns.

**BA requirements, not technical configuration**
This document defines what each agent needs to do and why. Salesforce configuration is the developer's job. The BA owns requirements. The developer owns implementation.

---

## Files

| File | Contents |
|------|----------|
| `project-g-agentforce-use-cases.md` | Full markdown document — GitHub-ready |
| `Project-G-Agentforce-Use-Case-Discovery.docx` | Professional Word version — shareable with Stephen |

---

## About the Author

**Naveen Rao V** — Business Analyst | AI & Automation | Dublin, Ireland

6+ years BA experience. MSc Data Analytics, NCI Dublin. Certified ScrumMaster. Google Prompting Essentials + Claude 101.

Portfolio: [github.com/Naveenraov/ai-transformation-ba-wellbeing-platform](https://github.com/Naveenraov/ai-transformation-ba-wellbeing-platform)

---

*Part of the AI Transformation Partner Portfolio — Spectrum.Life Interview Preparation | April 2026*
