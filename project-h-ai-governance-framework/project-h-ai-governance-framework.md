# Project H — AI Governance Framework
### Responsible AI for a Clinical Environment
### Spectrum.Life | AI Transformation Partner Portfolio | Naveen Rao V | April 2026

---

## Foreword

Spectrum.Life already has world-class external AI governance. Cara — the AI mental health companion launching Q2 2026 — is CE Class I certified, progressing to Class II, validated in a randomised controlled trial, and fully aligned with the EU AI Act. The organisation understands what responsible clinical AI looks like.

This framework brings that same standard inside.

As Claude expands from one HR chatbot to organisation-wide adoption, and as Agentforce agents begin handling clinical triage routing, HR onboarding, and sales renewal management — the organisation needs a formal, documented, auditable internal governance structure to match the external standard it already sets.

This is that structure.

> **The governing principle of this framework:** AI at Spectrum.Life exists to serve people — the members, the staff, and the organisation. Every governance rule in this document exists to protect that purpose and the people it serves.

---

## Section 1 — Purpose, Scope, and Context

### Purpose

This framework establishes the governance structure for all AI tools and systems used internally at Spectrum.Life — covering acceptable use, data handling, risk classification, incident response, audit, and staff responsibilities.

It applies from the moment a staff member opens Claude to draft an email, to the moment an Agentforce agent routes a clinical contact to a Case Manager. Every AI interaction at Spectrum.Life — large or small — operates within this framework.

### Scope

**In scope:**
- All use of Claude (Anthropic) by Spectrum.Life staff — via claude.ai, Teams integration, Claude API, or any other access method
- All Agentforce agent deployments within the Salesforce DHOS
- Any third-party AI tool adopted by Spectrum.Life for internal operational use
- AI-generated outputs used in clinical, HR, sales, finance, governance, or marketing contexts
- Prompt libraries, Claude Projects, Skills, and Artifacts used operationally

**Out of scope:**
- Cara — Spectrum.Life's CE-certified member-facing AI companion (governed separately under its clinical governance framework)
- Healthily AI partnership (governed under the commercial partnership agreement)
- AI tools used by clients or members of Spectrum.Life's platform

### Connection to Cara's External Governance Standard

Cara sets the benchmark. It is CE Class I certified, EU AI Act aligned, built on clinically validated technology, and subject to rigorous safety monitoring. The internal AI governance standard at Spectrum.Life should be no lower than the standard applied to the product we deliver to clients.

Where this framework references EU AI Act or clinical safety obligations, it deliberately aligns with the governance approach already applied to Cara — leveraging existing expertise rather than building from scratch.

### Framework Owner

**Primary owner:** AI Transformation Partner
**Executive sponsor:** Chief People Officer (Lynda)
**Clinical sign-off authority:** Chief Clinical Officer (Dr. Sarah O'Neill)
**Strategic oversight:** CEO (Stephen Costello)

### Review Cycle

This framework is reviewed quarterly in the first year of operation, then annually thereafter — or immediately following any significant AI incident, regulatory change, or major new AI deployment.

---

## Section 2 — AI Governance Principles

Six principles govern every AI decision at Spectrum.Life. They are not aspirational statements — they are operational commitments with specific implications for how AI is used day to day.

---

### Principle 1 — Human Oversight

**Statement:** A human is always responsible for every AI output that affects a person, a clinical decision, or a financial commitment.

**What this means in practice:**
- No AI output is filed, sent, or acted upon without a human reviewing and approving it — for any output that affects clinical care, HR decisions, or financial commitments
- Agentforce agents operate within defined boundaries — any decision outside those boundaries routes to a human automatically
- Case Managers retain full clinical responsibility — Claude and Agentforce are tools, not decision-makers
- Override capability is always available — and using it is encouraged when a human's judgement differs from the AI output

**What this does not mean:**
- It does not mean every single Claude output needs formal sign-off. A staff member using Claude to draft an internal email does not need a reviewer. Human oversight is proportionate to the impact of the output.

---

### Principle 2 — Clinical Safety First

**Statement:** In any conflict between operational efficiency and clinical safety, clinical safety wins. Always.

**What this means in practice:**
- No automation reduces the quality or accessibility of clinical support to members
- Clinical triage, risk assessment, and therapeutic judgement remain with qualified clinicians — regardless of how capable AI tools become
- Any AI tool that touches the member care pathway — even indirectly — is subject to clinical governance sign-off before deployment
- The standard question before any clinical AI deployment: *"If this tool fails, what happens to a member who needed help?"* The answer must be acceptable before the tool goes live

---

### Principle 3 — Data Minimisation and Protection

**Statement:** AI tools access only the data they need to perform their specific function. No more.

**What this means in practice:**
- GDPR Article 9 (special category health data) governs all AI interactions involving member health information
- Prompts sent to Claude contain the minimum data required — never identifiable member information without confirmed DPA and consent mapping
- Agentforce agents are configured with the minimum Salesforce object permissions required for their specific function
- Data passed to external AI APIs (Anthropic, Salesforce) is subject to confirmed Data Processing Agreements before any deployment
- Staff are trained on what data can and cannot go into Claude — and why

---

### Principle 4 — Transparency

**Statement:** Staff know when AI is involved in a process. Members know when AI is involved in their care pathway.

**What this means in practice:**
- Staff are informed when a process they interact with involves AI-generated outputs
- Members are informed when AI plays a role in their EAP journey — consistent with Cara's transparency standards
- AI-generated documents, reports, and communications are identifiable as such in Salesforce — flagged, not hidden
- The organisation can answer at any time: *"Which AI tools are in use, doing what, with whose data?"*

---

### Principle 5 — Accountability

**Statement:** Every AI deployment at Spectrum.Life has a named owner. When something goes wrong, there is no ambiguity about who is responsible.

**What this means in practice:**
- Every Claude Project, Agentforce agent, and AI tool deployment has a named Business Owner and a named Technical Owner
- The AI Transformation Partner is accountable for the framework and its implementation
- The Clinical Governance Lead (Dr. Sarah O'Neill) is accountable for any AI use in the clinical care pathway
- Accountability does not transfer to the AI — it remains with the person who deployed and approved the tool

---

### Principle 6 — Continuous Improvement

**Statement:** AI governance at Spectrum.Life improves as the AI landscape evolves. The framework is a living document, not a filed policy.

**What this means in practice:**
- Quarterly governance reviews assess what is working and what needs updating
- Every AI incident generates a lessons learned — and the framework is updated accordingly
- Prompt libraries are version-controlled and improved based on output quality monitoring
- The maturity roadmap (Section 10) tracks the organisation's governance development over time

---

## Section 3 — AI Risk Classification

Every AI use case at Spectrum.Life is classified into one of four risk tiers. The tier determines the governance requirements, approval process, and oversight level.

### Risk Tier Definitions

| Tier | Label | Description | Examples |
|---|---|---|---|
| **Tier 1** | Low Risk | AI assists with internal administrative tasks. Output does not directly affect members, clinical decisions, or financial commitments. Human reviews output casually. | Drafting an internal email, summarising a meeting, generating a first-draft blog post |
| **Tier 2** | Medium Risk | AI assists with operational tasks that affect staff, clients, or business processes. Output reviewed before action. Error causes operational disruption but not clinical harm. | Generating a job description, drafting a client proposal, producing a monthly report |
| **Tier 3** | High Risk | AI assists with tasks that affect member experience, HR decisions, or significant financial commitments. Output requires formal human review and approval before action. | HR onboarding communications, EAP participation reports, renewal proposals, case notes |
| **Tier 4** | Critical Risk | AI is involved in any step of the clinical care pathway, or makes decisions that affect member safety. Subject to clinical governance sign-off. Full audit trail mandatory. | Clinical triage routing, risk flag monitoring, any Agentforce agent touching clinical data |

### Governance Requirements by Tier

| Requirement | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---|---|---|---|
| Human review before action | Recommended | Required | Required | Mandatory — qualified professional |
| Audit trail in Salesforce | Not required | Recommended | Required | Mandatory |
| GDPR Article 9 assessment | Not required | Not required | Required if health data involved | Mandatory |
| DPA with AI provider confirmed | Not required | Not required | Required | Mandatory |
| Clinical governance sign-off | Not required | Not required | Not required | Mandatory — CCO sign-off |
| EU AI Act assessment | Not required | Not required | Required | Mandatory |
| Incident reporting if failure | Best efforts | Required | Required | Mandatory — immediate escalation |
| Quarterly AI audit review | Optional | Included | Included | Included |

### Current Spectrum.Life AI Deployment Classification

| Deployment | Tool | Tier | Status |
|---|---|---|---|
| HR FAQ chatbot (MS Teams) | Claude | Tier 2 | Live — governed under this framework |
| Case note generation | Claude | Tier 3 | Deployed per Project F governance rules |
| Inbox triage and classification | Claude | Tier 3 | Deployed per Project F governance rules |
| Onboarding document generation | Claude | Tier 2 | Deployed per Project F governance rules |
| Clinical Triage Routing Agent | Agentforce + Claude | Tier 4 | Requires CCO sign-off before deployment |
| HR Onboarding Agent | Agentforce | Tier 2 | Standard governance applies |
| Sales Renewal Agent | Agentforce + Claude | Tier 2 | Standard governance applies |
| Finance reporting Artifacts | Claude | Tier 2 | Standard governance applies |
| Cara (member-facing) | External AI product | Governed separately | CE Class I — separate framework |

---

## Section 4 — Acceptable Use Policy

### What Staff Can Do With Claude and AI Tools

Staff at Spectrum.Life are encouraged to use Claude and approved AI tools to make their work faster, simpler, and less repetitive. The following uses are approved:

**Drafting and writing:**
- First-draft communications, emails, reports, and documents
- Case notes (from brief summaries — using approved CRAFT prompts from the Prompt Library)
- Job descriptions, proposals, and client communications
- Meeting summaries and action logs

**Research and summarisation:**
- Summarising long documents or policy updates
- Answering factual questions using Claude's knowledge
- Generating options or alternatives for consideration

**Process support:**
- Using approved Skills from the governed Prompt Library
- Working within department Claude Projects (persistent memory, governed prompts)
- Generating Artifacts for review — reports, summaries, structured documents

**Learning and exploration:**
- Asking Claude questions to develop knowledge and skills
- Testing prompts and approaches in personal Claude sessions

---

### What Staff Cannot Do With Claude and AI Tools

The following uses are **prohibited:**

| Prohibited Use | Reason |
|---|---|
| Entering identifiable member names, contact details, or health information into Claude without confirmed DPA and consent mapping | GDPR Article 9 — special category health data protection |
| Using AI output as a final clinical decision without human review | Clinical safety — Principle 2 |
| Sending AI-generated communications to members or clients without human review and approval | Quality, accountability, and transparency — Principles 1 and 4 |
| Using personal Claude accounts (claude.ai personal subscription) for Spectrum.Life clinical work | Data governance — work data must stay in governed work systems |
| Sharing Claude API keys or credentials with colleagues | Security — individual accountability |
| Entering staff personal data (salary, performance, disciplinary details) into Claude without HR lead approval | GDPR standard personal data protection |
| Using AI tools not approved by the AI Transformation Partner for operational clinical or HR use | Governance — unapproved tools are not covered by the framework |
| Attempting to use Claude to override clinical protocols or governance rules | Clinical safety and accountability |
| Representing AI-generated content as entirely human-created in formal governance or regulatory submissions | Transparency — Principle 4 |

---

### The Golden Rule

> **If you are unsure whether something is allowed — ask the AI Transformation Partner before you do it, not after.**

---

### Data Handling Quick Reference

| Data Type | Can it go into Claude? | Conditions |
|---|---|---|
| General work content (meeting notes, draft documents) | Yes | Standard use — no special conditions |
| Staff names and job titles | Yes | Standard use |
| Client company names | Yes | Standard use |
| Individual member names | No | Never without confirmed DPA and consent mapping |
| Member health information | No | Never without confirmed DPA, consent mapping, and Tier 4 governance sign-off |
| Staff personal data (salary, health, performance) | Only with HR lead approval | Specific approved use cases only |
| Financial data (revenue, client contract values) | Yes | Standard use — treat as commercially confidential |
| Identifiable clinical case details | No | Never in Claude without full Tier 4 governance process completed |

---

## Section 5 — GDPR Article 9 Compliance Framework

### Why Article 9 Matters at Spectrum.Life

GDPR Article 9 governs the processing of special category personal data — including health data, mental health information, and data revealing a person's physical or mental health condition. Spectrum.Life's core business involves exactly this type of data for 9.8 million members.

When AI tools process, generate, or handle information about member health — even indirectly — Article 9 obligations apply. This section defines how those obligations are met in practice.

### The Six Article 9 Obligations for AI Use at Spectrum.Life

**Obligation 1 — Explicit Consent or Legal Basis**
Before any member health data is processed by an AI system, one of the following must be confirmed:
- Explicit consent from the member for AI-assisted processing of their health data
- Or a documented alternative legal basis under Article 9(2) (e.g. employment context, vital interests, or public health)

*Practical implication:* The Clinical Triage Routing Agent (Project G, Agent 1) requires consent mapping to be completed and documented before it goes live. No exceptions.

**Obligation 2 — Data Processing Agreement (DPA)**
A confirmed DPA must be in place with Anthropic (Claude) and Salesforce (Agentforce) before any special category health data is processed by those systems.

*Practical implication:* The AI Transformation Partner confirms DPA status before any Tier 3 or Tier 4 deployment. Deployment is blocked until DPA is confirmed.

**Obligation 3 — Data Minimisation**
Only the minimum health data necessary for the specific AI function is processed. Claude prompts containing health context are designed to use the least identifying information possible.

*Practical implication:* The Prompt Library (Project F) is designed with data minimisation built in — case references, not names; presenting issues, not full clinical histories.

**Obligation 4 — Purpose Limitation**
Member health data processed by AI is used only for the specific purpose for which consent or legal basis was established. It is not reused for other AI purposes without a new legal basis.

*Practical implication:* The Clinical Triage Agent routes contacts — that data cannot be fed into marketing or sales AI systems without a separate legal basis.

**Obligation 5 — Member Rights**
Members have the right to know when AI is involved in processing their health data, the right to request human review of AI-assisted decisions, and the right to object to automated processing.

*Practical implication:* Spectrum.Life's member communications must disclose AI involvement where it exists. Clinical triage routing by Agent 1 must be disclosed as AI-assisted in member-facing documentation.

**Obligation 6 — Data Breach Response**
If member health data is mishandled in an AI interaction — wrong data in a prompt, unintended disclosure, or data sent to an unsecured AI tool — this constitutes a potential data breach and must be reported under GDPR Article 33 (72-hour supervisory authority notification).

*Practical implication:* Any suspected Article 9 breach involving AI is an immediate Tier 4 incident — escalated to the CCO and Data Protection Officer within 1 hour of discovery.

### GDPR AI Compliance Checklist (Pre-Deployment)

Before any AI deployment involving health data:

- [ ] Legal basis under Article 9(2) identified and documented
- [ ] DPA with AI provider confirmed and on file
- [ ] Data minimisation review completed — only minimum necessary data in scope
- [ ] Consent mapping documented — which members, what data, which AI system
- [ ] Member disclosure drafted — how will members be informed
- [ ] Human review checkpoint confirmed in the workflow
- [ ] Audit trail mechanism confirmed in Salesforce
- [ ] Data breach escalation path confirmed with DPO
- [ ] CCO sign-off obtained (Tier 4 deployments)

---

## Section 6 — EU AI Act Compliance

### Spectrum.Life's Position Under the EU AI Act

The EU AI Act creates obligations based on the risk level of an AI system. Spectrum.Life operates two types of AI systems:

**External AI products (Cara):** Already assessed, CE-certified, and progressing to Class II under the Medical Device Regulation. EU AI Act compliance embedded in Cara's existing governance framework.

**Internal operational AI (Claude + Agentforce):** Subject to this framework. Assessment required for each deployment.

### High-Risk Classification Assessment

Under EU AI Act Annex III, AI systems used in the following contexts may be classified as high-risk:
- Employment and worker management decisions
- Access to essential services
- Systems that profile or categorise individuals in healthcare contexts

| Internal AI Deployment | High-Risk Assessment | Action Required |
|---|---|---|
| Clinical Triage Routing Agent | **Likely high-risk** — routes access to clinical support services | Legal review required before deployment. Conformity assessment if confirmed high-risk. |
| HR Onboarding Agent | Possible — employment management context | Legal review recommended. Likely low-risk if routing only, not employment decisions. |
| Sales Renewal Agent | Not high-risk | Standard governance applies. |
| Claude for case notes | Not high-risk — human reviews all outputs | Standard governance applies. |
| Claude for HR communications | Not high-risk — human reviews all outputs | Standard governance applies. |

### High-Risk Obligations (Where Applicable)

If a deployment is confirmed high-risk under the EU AI Act, these obligations apply:

| Obligation | What It Requires |
|---|---|
| Risk management system | Documented risk identification, assessment, and mitigation process |
| Data governance | Training data quality standards and documentation (for AI models built internally) |
| Technical documentation | System design, capabilities, limitations, and intended use documented |
| Transparency | Users informed they are interacting with an AI system |
| Human oversight | Meaningful human oversight capability built into the system |
| Accuracy and robustness | Performance monitoring and accuracy tracking |
| Conformity assessment | Formal assessment before deployment (internal or third-party) |
| Registration | Potential requirement to register in EU AI Act database |

### Leveraging Cara's Governance Infrastructure

Spectrum.Life does not need to build EU AI Act compliance from scratch for internal tools. Cara's existing governance framework — including its conformity assessment process, clinical safety monitoring, and documentation standards — provides a ready-made blueprint.

The AI Transformation Partner works with the clinical governance team to adapt Cara's external compliance approach for internal AI deployments — starting with the Clinical Triage Routing Agent as the first high-risk candidate.

---

## Section 7 — AI Incident Response

### Incident Classification

| Severity | Definition | Examples |
|---|---|---|
| **P1 — Critical** | AI system involved in potential harm to a member, data breach of Article 9 health data, or clinical safety failure | Member health data sent to unsecured AI tool; Agent 1 routing failure causing delayed critical care response |
| **P2 — High** | Significant governance breach, AI output causes material harm to staff or client, regulatory compliance risk | Identifiable member data in Claude prompt without DPA; AI-generated report sent to client without review |
| **P3 — Medium** | Governance policy violation without immediate harm, AI output quality failure, prompt library error | Staff using personal Claude account for work clinical tasks; incorrect case note format generated |
| **P4 — Low** | Minor policy deviation, near-miss, or quality issue with no material impact | Staff entering client company name into unapproved AI tool; AI-generated email sent without full review |

### Incident Response Timeline

| Severity | Initial Response | Escalation | Investigation Complete | Remediation |
|---|---|---|---|---|
| P1 — Critical | Within 1 hour | CCO + DPO + CEO within 2 hours | Within 24 hours | Immediate containment; remediation within 72 hours |
| P2 — High | Within 4 hours | AI Transformation Partner + relevant dept head | Within 72 hours | Within 1 week |
| P3 — Medium | Within 24 hours | AI Transformation Partner | Within 1 week | Within 2 weeks |
| P4 — Low | Within 48 hours | AI Transformation Partner (for tracking) | Within 2 weeks | Within 1 month |

### P1 Critical Incident Escalation Path

```
Incident discovered by any staff member
         ↓
Immediate: Stop the AI process causing the incident
         ↓
Within 15 minutes: Report to AI Transformation Partner
         ↓
Within 1 hour: AT Partner assesses severity — confirms P1
         ↓
Within 2 hours: CCO (Dr. Sarah O'Neill) + DPO notified
                CEO (Stephen Costello) notified
         ↓
If Article 9 data breach confirmed:
Within 72 hours: GDPR supervisory authority notified (Article 33)
         ↓
Within 24 hours: Full incident investigation begins
         ↓
Remediation plan agreed and implemented
         ↓
Post-incident review — framework updated if required
```

### Incident Report Requirements

Every P1, P2, and P3 incident requires a completed incident report containing:
- Date, time, and description of incident
- AI tool involved and specific function being performed
- Data types involved — including any Article 9 data
- Who was affected — staff, members, or both
- Immediate actions taken
- Root cause (preliminary and confirmed)
- Corrective actions implemented
- Framework update required — yes/no, and what

P1 incidents require CCO and CEO sign-off on the incident report before it is filed.

---

## Section 8 — Audit and Oversight Structure

### Governance Committee

| Role | Person | Responsibility |
|---|---|---|
| Framework Owner | AI Transformation Partner | Day-to-day governance, framework maintenance, incident response |
| Executive Sponsor | CPO (Lynda) | Strategic oversight, policy decisions, HR and people AI governance |
| Clinical Authority | CCO (Dr. Sarah O'Neill) | Sign-off on all Tier 4 deployments, clinical incident response |
| Strategic Oversight | CEO (Stephen Costello) | AI vision alignment, board-level reporting, major risk decisions |
| Data Protection | DPO (to be confirmed) | GDPR compliance, Article 9 oversight, breach response |

### Quarterly AI Governance Audit

Four times per year, the AI Transformation Partner conducts a structured governance audit covering:

**Usage review:**
- Which AI tools are active across which departments
- Approximate usage volumes and user counts
- New deployments since last audit — were they governed correctly

**Quality review:**
- Prompt library quality — are prompts producing consistent, appropriate outputs
- Override rates for Agentforce agents — are humans overriding frequently (indicates poor agent performance)
- AI-assisted document quality — sample review of Claude-generated outputs filed in Salesforce

**Compliance review:**
- DPA status for all active AI providers
- Consent mapping status for any Tier 3/4 deployments
- GDPR Article 9 compliance — any new deployments touching health data
- EU AI Act status — any changes to risk classification landscape

**Incident review:**
- All incidents from the quarter — P1 through P4
- Trends — are the same types of incidents recurring
- Framework effectiveness — are the governance rules preventing incidents or not

**Output:** Quarterly Governance Report delivered to CPO and CEO. Includes RAG status for each governance dimension, incidents summary, and recommended framework updates.

### Governance Health Metrics

| Metric | Target | Review Frequency |
|---|---|---|
| GDPR Article 9 incidents | Zero | Monthly |
| DPA confirmation rate for active AI tools | 100% | Quarterly |
| Staff training completion (Claude Foundations + Data Safety) | 80%+ | Quarterly |
| Agentforce agent override rates | Below 15% per agent | Monthly |
| AI audit completion | 4 per year | Quarterly |
| P1/P2 incident resolution within SLA | 100% | Per incident |
| Prompt library version control compliance | 100% | Quarterly |
| Tier 4 deployment CCO sign-off rate | 100% | Per deployment |

---

## Section 9 — Staff Responsibilities

Every role at Spectrum.Life has specific AI governance responsibilities. These are not generic — they are matched to the actual AI tools and risks each role encounters.

| Role | AI Governance Responsibilities |
|---|---|
| **All Staff** | Complete Claude Foundations and Data Safety training. Follow the Acceptable Use Policy. Report any suspected governance incidents. Use only approved AI tools for work. Never enter identifiable member health data into Claude without explicit confirmation from AT Partner. |
| **Case Managers** | Follow the Prompt Library clinical prompts exactly as documented. Review every Claude-generated output before filing or acting. Never treat AI classification as a final clinical judgement. Override agent decisions when your professional judgement differs — and log the override. Report any AI output that seems clinically unsafe immediately. |
| **HR Team** | Follow the Prompt Library HR prompts. Review all Claude-generated communications before sending. Ensure new hires are informed of Claude Project assignment and data use. Escalate any staff data handling concerns to AT Partner. |
| **Account Managers** | Review all Claude-generated proposals and reports before sending to clients. Do not share client-sensitive data with AI tools without AT Partner approval. Log renewal agent overrides when applied. |
| **Clinical Lead / CCO** | Sign off on all Tier 4 AI deployments before go-live. Lead clinical incident response for P1 incidents. Conduct quarterly review of clinical AI output quality. Confirm clinical boundary definitions remain appropriate as AI expands. |
| **AI Transformation Partner** | Own and maintain this framework. Govern all AI deployments against risk tiers. Lead quarterly audits. Respond to incidents within SLA. Keep DPA and consent mapping current. Report governance health to CPO and CEO quarterly. Train and support all staff in AI use. |
| **CPO (Lynda)** | Executive sign-off on framework updates. Escalation point for P2+ incidents. Ensure HR and people AI governance is integrated with people strategy. Board reporting on AI governance posture. |
| **CEO (Stephen)** | Set AI vision and pace. Ensure governance investment matches AI ambition. Escalation point for P1 incidents. Represent Spectrum.Life's AI governance posture to investors, board, and regulators. |

---

## Section 10 — AI Governance Maturity Roadmap

Spectrum.Life's governance maturity develops in five levels — aligned with the Claude expansion roadmap (Project E) and Agentforce deployment sequence (Project G).

### The Five Maturity Levels

**Level 1 — Ad Hoc (Current State)**
- One live Claude deployment (HR chatbot)
- No formal governance framework
- Stephen is the sole internal Claude SME
- No Prompt Library, no risk classification, no audit process
- *Where Spectrum.Life is today*

**Level 2 — Foundation (Months 1–3)**
- This framework published and signed off
- Acceptable Use Policy communicated to all staff
- Prompt Library V1 live (Project F)
- DPA with Anthropic confirmed
- Baseline governance metrics established
- Staff training programme launched
- *Target: end of Phase 1 (Project E)*

**Level 3 — Structured (Months 3–6)**
- Tier classification applied to all active AI deployments
- Quarterly audit process running
- GDPR Article 9 compliance confirmed for all clinical deployments
- Incident response process tested and operational
- Governance committee meeting monthly
- *Target: end of Phase 2 (Project E)*

**Level 4 — Managed (Months 6–9)**
- All departments operating within governed Claude Projects
- Agentforce agents live with full audit trails
- Prompt Library version control operational
- EU AI Act assessment completed for Clinical Triage Agent
- Governance health dashboard live in Salesforce
- AT Partner is organisation's Claude SME — Stephen's transfer complete
- *Target: end of Phase 4 (Project E)*

**Level 5 — Optimised (Months 9–12+)**
- Governance framework embedded in organisational culture — not a compliance burden
- Continuous improvement cycle running — framework updated from audit findings and incidents
- Spectrum.Life governance posture matches external standard (Cara)
- Organisation can demonstrate AI governance maturity to clients, partners, and regulators
- Internal AI governance is a competitive advantage — not just a compliance requirement
- *Target: end of Month 12*

### Maturity Assessment

| Dimension | Level 1 | Level 3 Target | Level 5 Target |
|---|---|---|---|
| Governance framework | None | Published and signed off | Embedded in culture |
| Risk classification | None | Applied to all deployments | Continuously updated |
| Staff training | None | 80% completion | 100% — ongoing |
| GDPR Article 9 | Ad hoc | Formally compliant | Proactively managed |
| EU AI Act | None | Assessment complete | Conformity maintained |
| Audit process | None | Quarterly running | Self-improving |
| Incident response | None | Tested and operational | Zero repeat incidents |
| Governance reporting | None | Quarterly to CPO/CEO | Board-level visibility |

---

## Appendix A — Glossary

| Term | Definition |
|---|---|
| **Article 9** | GDPR provision governing special category personal data — includes health and mental health data |
| **Acceptable Use Policy** | The rules defining what staff can and cannot do with AI tools at Spectrum.Life |
| **Agentforce** | Salesforce's autonomous AI agent platform — used for multi-step automated workflows |
| **Audit trail** | Immutable log of every AI action — who, what, when, with which data |
| **CRAFT Framework** | Naveen Rao V's prompt engineering framework: Context, Role, Action, Format, Tone |
| **DPA** | Data Processing Agreement — legal agreement governing how an AI provider processes data |
| **DHOS** | Digital Health Operating System — Spectrum.Life's Salesforce-based operating platform |
| **EU AI Act** | European Union regulation classifying and governing AI systems by risk level |
| **High-risk AI** | EU AI Act classification for AI systems that pose significant risk to health, safety, or fundamental rights |
| **Human-in-the-loop** | A governance design where a human reviews and approves AI output before action |
| **Prompt Library** | Spectrum.Life's governed collection of CRAFT-built prompts (Project F) |
| **Special category data** | GDPR term for sensitive personal data categories including health information |
| **Tier classification** | Spectrum.Life's four-level AI risk classification system (Tiers 1–4) |

## Appendix B — Document Control

| Version | Date | Author | Changes | Approved By |
|---|---|---|---|---|
| 1.0 | April 2026 | Naveen Rao V | Initial framework | Pending CPO + CCO sign-off |

---

*Document prepared by Naveen Rao V | AI Transformation Partner Candidate | April 2026*
*Portfolio: github.com/Naveenraov/ai-transformation-ba-wellbeing-platform*
*Classification: Internal — Confidential*
