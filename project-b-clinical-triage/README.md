# Project B — Clinical Intake Triage Assistant

> AI-powered mental health intake triage tool built with Claude (Anthropic)  
> Part of: **AI Transformation BA Portfolio — Spectrum.Life Interview Preparation**  
> Author: **Naveen Rao V** — AI-Focused Business Analyst, Dublin, Ireland

---

## What This Project Is

A live, working clinical triage assistant that helps intake coordinators at a mental health platform rapidly assess incoming member referrals. Built to demonstrate hands-on Claude API experience, prompt engineering skill, and clinical governance awareness — directly aligned to the Spectrum.Life AI Transformation Partner role.

The tool takes structured intake data — age, referral type, presenting concerns, risk level, and free-text notes — sends it to Claude via the Anthropic API, and returns a structured clinical output including:

- **Triage level** — Urgent / Moderate / Routine / Safety Alert
- **Clinical picture summary** — plain-language, 2-sentence assessment
- **Recommended pathway** — specific next step (e.g. "Refer to senior counsellor within 24 hours")
- **Next actions** — 3-point action list for the intake coordinator
- **Safety flag** — triggered automatically when crisis signals are detected
- **Clinician note** — includes GDPR Article 9 flags where sensitive health data is present

---

## Why This Matters to Spectrum.Life

Spectrum.Life runs a 24/7 EAP (Employee Assistance Programme) and mental health platform serving:
- 7.5 million insurance members
- 4,000+ corporate clients
- 50+ universities

Every member who accesses support goes through a **triage process** — a Case Manager assesses urgency, risk, and appropriate pathway. At scale, this is time-intensive, inconsistent, and dependent on individual judgement under pressure.

This tool is a direct proof-of-concept for AI-assisted triage — Claude does the pattern recognition and structured first-pass; the clinician validates and acts. Human-in-the-loop is non-negotiable and is built into the design.

---

## Live Demo

The artifact is built as a React component using the Anthropic API.

**To run:** Open `clinical_triage_assistant.jsx` in Claude.ai as an artifact — the API is pre-connected.

**Demo scenario (recommended for screen-share):**
```
Age: 26
Referral: Employer EAP
Service: Counselling
Concerns: Anxiety, Stress / burnout, Self-harm thoughts
Duration: Ongoing (2–6 months)
Risk: Moderate — review needed
Notes: Patient reports 3 months of sleep disruption, increased alcohol use,
       and intrusive thoughts about self-harm. Disclosed under pressure from manager.
```
**Expected output:** Safety Alert · safety_flag: true · GDPR Article 9 note

---

## Files in This Project

| File | Description |
|---|---|
| `clinical_triage_assistant.jsx` | Live React artifact — Claude API connected, fully functional |
| `PROMPT_LIBRARY.md` | Full prompt engineering documentation — all 7 prompts annotated |
| `Prompt_Engineering_Library_ProjectB.docx` | Word doc version of the prompt library — portfolio / interview use |
| `README.md` | This file |

---

## Prompt Engineering Techniques Used

This project applies five distinct prompt engineering techniques, fully documented in `PROMPT_LIBRARY.md`:

| Technique | Description |
|---|---|
| **Role + Context Prompting** | Defines Claude's identity as a clinical triage assistant with explicit human-in-the-loop constraints |
| **Structured Input Formatting** | Converts form data into labelled, ordered context blocks with explicit fallback strings |
| **Structured Output Prompting** | Forces JSON-only responses with a defined schema — machine-readable, UI-renderable |
| **Conditional Logic in Prompts** | Embeds if/then safety business rules in natural language — no separate backend logic needed |
| **Output Quality Constraints** | Controls tone and reading level — "concise, clinically grounded, risk-aware" |

---

## Governance & Compliance Design

Clinical AI tools require governance baked in from day one — not bolted on. This tool demonstrates:

- **Human-in-the-loop** — every output is explicitly framed as AI-assisted, not AI-decided
- **GDPR Article 9** — sensitive health data flags surface automatically in the clinician note
- **Safeguarding** — safety flag and protocol text triggered by crisis signals in any field
- **Auditability** — structured JSON output means every assessment is loggable and reviewable
- **No false authority** — role prompt explicitly states "you never replace clinical judgement"

---

## Alignment to Role Requirements (Spectrum.Life JD)

| JD Requirement | How This Project Demonstrates It |
|---|---|
| Hands-on Claude / LLM experience | Live API integration, structured prompt design, iterative testing |
| Prompt design and structured workflows | 7-prompt library with full rationale and reuse notes |
| Clinical / regulated environment awareness | GDPR Art. 9, safeguarding, human-in-the-loop governance |
| Process mapping and requirements thinking | Intake form design mirrors Spectrum.Life's actual EAP triage flow |
| Senior stakeholder communication | Tool output designed for clinical coordinators, not technical users |
| AI governance framework | Governance principles embedded in both the prompt and the UI |

---

## Technical Stack

- **AI Model:** Claude Sonnet 4 (claude-sonnet-4-20250514) via Anthropic API
- **Frontend:** React (JSX) with inline styles
- **API:** Anthropic `/v1/messages` endpoint — direct POST from artifact
- **Output format:** Structured JSON parsed and rendered to UI components
- **Deployment:** Claude.ai artifact (no infrastructure required for demo)

---

## About This Portfolio

This project is one of five built specifically to demonstrate AI transformation capability for a Senior BA role at Spectrum.Life:

| Project | Description |
|---|---|
| **Project B** ← this one | Clinical Intake Triage Assistant — live Claude AI demo |
| **Main Project** | AI Transformation BA full documentation — 6 GitHub markdown files |
| **Project C** | Mental Health AI Ethics & Governance Framework (GDPR, EU AI Act) |
| **Project A** | Salesforce Agentforce Workflow Design — 3 agent designs with BA specs |
| **Project D** | 12-Month AI Transformation Roadmap — executive-level CPO/CEO audience |

---

## Author

**Naveen Rao V**  
Business Analyst — AI & Automation | Claude & LLM Workflows | Agile Delivery  
Dublin, Ireland  
[linkedin.com/in/naveen-rao-v-01593a169](https://linkedin.com/in/naveen-rao-v-01593a169)

---

*Built April 2026 · GitHub: ai-transformation-ba-wellbeing-platform*
