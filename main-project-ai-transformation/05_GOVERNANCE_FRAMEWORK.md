# 05 — AI Governance & Responsible Use Framework
## Spectrum.Life AI Transformation Programme

**Document type:** AI Governance Framework  
**Author:** Naveen Rao V — AI Transformation Partner  
**Version:** 1.0 · April 2026  
**Audience:** Data Protection Officer · Clinical Director · CEO · CPO · All AI users

---

## Why This Document Exists

Spectrum.Life operates in one of the most sensitive data environments possible — mental health, clinical records, crisis intervention. The people who contact Spectrum.Life are often vulnerable. The data they share is among the most protected under law.

AI deployed carelessly in this environment does not just create a compliance risk. It creates a clinical risk. A missed safety flag, an incorrect triage, a data handling failure — these have real consequences for real people.

This framework ensures that every AI deployment at Spectrum.Life is responsible, documented, auditable, and aligned with the organisation's duty of care.

---

## Legal & Regulatory Framework

### GDPR — Article 9: Special Category Data

Mental health data is Article 9 special category data. This is the highest protection tier under GDPR.

**What this means for AI at Spectrum.Life:**

| Requirement | Application |
|---|---|
| Explicit legal basis required | Processing under Article 9(2)(h) — healthcare purposes, managed by professionals under confidentiality obligation |
| Data minimisation | Only the data necessary for triage/documentation passed to AI — no surplus personal data in prompts |
| Purpose limitation | AI outputs used only for the purpose they were generated — triage data not reused for unrelated analytics |
| No PII in API logs | Member names, identifiers, and contact details must not appear in Claude API call payloads |
| Data retention | AI-generated records retained per Spectrum.Life's clinical data retention policy — not indefinitely |
| Subject access rights | Members have the right to know AI was used in their care pathway — disclosed in member privacy notice |
| DPO sign-off | Every new AI use case assessed by DPO before deployment |

### EU AI Act — High-Risk Classification

Under the EU AI Act, AI systems used in healthcare — including clinical decision support — are classified as **high-risk**. This triggers specific obligations:

| Obligation | How Spectrum.Life Meets It |
|---|---|
| Risk management system | This governance framework + clinical review board |
| Data governance | Article 9 controls + audit logging |
| Technical documentation | Solution design documented (Doc 04) + prompt library |
| Transparency to users | Clinical staff informed of AI assistance; human oversight mandatory |
| Human oversight | Human-in-the-loop required on every AI output — no autonomous clinical decisions |
| Accuracy and robustness | UAT against clinical benchmark (85%+ target); ongoing monitoring |
| Post-market monitoring | Monthly AI performance review; incident reporting process |

### Clinical Safety Standards
- All AI workflows reviewed against HSE and NHS digital health safety guidance
- Safeguarding obligations met: AI safety flag triggers human-led escalation protocol
- No AI system makes autonomous safeguarding decisions

---

## Core Governance Principles

### Principle 1 — Human Oversight is Mandatory
Every AI output in a clinical workflow requires human review before action is taken. This is not optional and cannot be overridden by any user or system configuration.

**Enforcement:** Human confirmation step is a hard requirement in all Salesforce flows and Claude workflow designs. It cannot be bypassed.

### Principle 2 — AI Assists, Never Decides
Claude and Agentforce agents make recommendations. Clinicians and Case Managers make decisions. This distinction must be clear to every user and reflected in every piece of AI output.

**Enforcement:** Every AI output displays: *"AI-assisted · not a clinical decision · human review required"*

### Principle 3 — Transparency with Members
Members have the right to know when AI has been used in their care pathway. This is disclosed in Spectrum.Life's member privacy notice and, where relevant, in direct communication.

### Principle 4 — No Surprises for the DPO
Every new AI use case is assessed by the Data Protection Officer before deployment. No exceptions. A new prompt is a new use case.

### Principle 5 — Audit Everything
Every AI interaction is logged. Logged data includes: timestamp, input data summary, output, model version, human reviewer, and any overrides made. Logs are retained per the clinical data retention policy.

### Principle 6 — Fail Safe
If an AI system is unavailable or returns an error, the manual process is presented immediately. No clinical workflow stops because an AI tool is down.

---

## Risk Register

| # | Risk | Likelihood | Impact | Control |
|---|---|---|---|---|
| R01 | AI under-triages a high-risk member | Medium | Critical | Safety flag logic · Human review · Clinical audit |
| R02 | PII included in Claude API payload | Low | High | Prompt design review · DPO sign-off · API log monitoring |
| R03 | Case Manager over-relies on AI and stops thinking critically | Medium | High | Training · Mandatory override logging · Monthly audit |
| R04 | AI model produces clinically inappropriate output | Low | High | UAT benchmark · Ongoing output monitoring · Incident process |
| R05 | Claude API unavailable during peak hours | Low | High | Graceful degradation · Manual fallback · SLA monitoring |
| R06 | Prompt injection attack via member free-text field | Low | Medium | Input sanitisation · Output validation · Security review |
| R07 | AI governance framework not kept current as AI evolves | Medium | High | Quarterly framework review · Owner: AI Transformation Partner |
| R08 | Staff bypass human review step | Low | Critical | Technical enforcement in Salesforce flows · Audit logging |

---

## Acceptable Use Policy

### Permitted Uses
- Clinical intake triage assistance (with human review)
- Session documentation drafting (with counsellor review and approval)
- Referral letter drafting (with clinician review and approval)
- Case routing recommendations (with Case Manager confirmation)
- Internal reporting and analytics
- Manager guidance tools (non-clinical)
- Prompt development and testing in sandbox environment

### Prohibited Uses
- Autonomous clinical decisions without human review
- Direct AI-to-member communication without human oversight
- Processing member data outside agreed purpose
- Using AI outputs as the sole basis for safeguarding decisions
- Sharing AI outputs containing PII outside the case management system
- Deploying new AI use cases without DPO and clinical sign-off

---

## AI Governance Roles & Responsibilities

| Role | Responsibility |
|---|---|
| AI Transformation Partner (Naveen) | Framework maintenance · Prompt library governance · Use case assessment · AI performance monitoring |
| Data Protection Officer | Article 9 compliance sign-off · Privacy impact assessments · Data handling review |
| Clinical Director | Clinical safety sign-off · UAT oversight · Incident review |
| Chief People Officer | Programme sponsor · Policy owner · Executive accountability |
| Case Managers & Counsellors | Responsible use · Override when appropriate · Incident reporting |
| IT / Platform Team | Technical controls · API security · Audit log maintenance |

---

## AI Incident Response Process

If an AI system produces an output that causes harm, is clinically inappropriate, or creates a compliance risk:

```
Step 1 — Immediate: Stop using the affected AI feature
         Revert to manual process · Do not attempt to "work around" the issue

Step 2 — Report: Notify AI Transformation Partner and Clinical Director within 1 hour
         Document: What happened · What the AI output was · What action was taken

Step 3 — Assess: AI Transformation Partner and Clinical Director review within 24 hours
         Determine: Clinical impact · Data risk · Root cause

Step 4 — Contain: DPO notified if personal data involved
         If Article 9 data breach → 72-hour GDPR notification clock starts

Step 5 — Fix: Prompt updated or AI feature suspended pending fix
         Redeployment requires DPO and Clinical Director sign-off

Step 6 — Learn: Incident logged · Governance framework updated if needed
         Monthly incident review included in programme reporting
```

---

## Governance Review Schedule

| Review | Frequency | Owner | Attendees |
|---|---|---|---|
| AI performance review | Monthly | AI Transformation Partner | Clinical Director, DPO |
| Governance framework review | Quarterly | AI Transformation Partner | DPO, CPO |
| Prompt library audit | Quarterly | AI Transformation Partner | Clinical Director |
| EU AI Act compliance review | Bi-annually | DPO | AI Transformation Partner, Legal |
| Full programme governance review | Annually | CPO | Full steering group |

---

## Prompt Governance

Every prompt deployed in production must meet these standards before go-live:

| Standard | Requirement |
|---|---|
| Role definition | Prompt includes explicit role boundary: "you never replace clinical judgement" |
| Output constraints | Structured JSON output enforced — no free-form clinical prose |
| Fallback strings | Empty fields handled explicitly — no hallucination on missing data |
| Safety logic | Safety flag logic tested against minimum 4 scenarios including crisis presentation |
| GDPR check | DPO reviewed prompt for PII risk and Article 9 implications |
| Clinical review | Clinical Director reviewed output quality against benchmark |
| Documentation | Prompt documented in prompt library with rationale and test scenarios |

Full prompt library: see `project-b-clinical-triage/PROMPT_LIBRARY.md`

---

*Document 05 of 06 · Spectrum.Life AI Transformation Programme · Naveen Rao V · April 2026*
