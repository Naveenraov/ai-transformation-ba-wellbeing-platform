# Prompt Engineering Library
## Project B — Clinical Intake Triage Assistant
**Author:** Naveen Rao V — AI Transformation Partner Portfolio  
**Platform:** Claude (Anthropic) · claude-sonnet-4  
**Domain:** HealthTech / Mental Health · Spectrum.Life Interview Portfolio  
**GitHub Repo:** ai-transformation-ba-wellbeing-platform

---

## About This File

This document captures every prompt used to design, build, and test the Clinical Intake Triage Assistant. It is structured as a reusable reference library — demonstrating the three core prompt engineering techniques applied in this project:

| Technique | What It Does | Where Used |
|---|---|---|
| Role + Context Prompting | Defines who Claude is and what boundaries it operates within | System-level framing |
| Structured Output Prompting | Forces Claude to respond in a predictable, parseable JSON schema | Triage output generation |
| Conditional Logic in Prompts | Embeds business rules and if/then logic in natural language | Safety flags, escalation rules |

This library directly maps to the Spectrum.Life role requirement: *"Develop a library of high-quality, reusable prompts and structured templates."*

---

## Prompt 1 — Role + Context Definition

**Technique:** Role + Context Prompting  
**Purpose:** Establishes Claude's identity, boundaries, and clinical awareness before any intake data is processed. This is the foundation of every triage assessment.

**Where it appears in the project:** Injected at the start of every API call as the opening block of the user prompt.

```
You are a clinical triage AI assistant at Spectrum.Life,
a digital mental health and wellbeing platform.

You support clinical intake coordinators —
you never replace clinical judgement.
```

**Why this matters:**
- Without role definition, Claude defaults to a general assistant persona — too broad for a clinical context
- "You support... you never replace" sets the human-in-the-loop principle explicitly in the prompt itself
- This mirrors how Spectrum.Life actually operates: AI assists the Case Manager; the Case Manager makes the call
- In a regulated environment (GDPR Article 9, EU AI Act), role boundaries in the prompt are part of the governance framework

**Reusability note:** This block can be adapted for any Spectrum.Life AI use case — swap "clinical triage" for "HR intake," "insurance claims," or "student welfare" as needed.

---

## Prompt 2 — Structured Intake Data Block

**Technique:** Structured Input Formatting  
**Purpose:** Converts raw form data into a clean, labelled context block that Claude can parse reliably. Eliminates ambiguity before the model begins reasoning.

**Where it appears in the project:** Dynamically assembled from the form fields and injected into every prompt call.

```
Intake data:
- Age: [age]
- Referral type: [referral]
- Service requested: [service]
- Presenting concerns: [comma-separated list from chips]
- Duration: [duration or "not specified"]
- Clinical risk level entered: [risk]
- Intake notes: [freetext or "none provided"]
```

**Why this matters:**
- Labelled fields prevent Claude from misinterpreting values — "26" means age, not risk score
- "not specified" and "none provided" are explicit fallback strings — they prevent Claude from hallucinating missing data
- The order mirrors clinical logic: demographics → referral type → concerns → duration → risk → narrative. This ordering helps Claude reason in the same sequence a human Case Manager would
- This pattern is directly reusable for any intake or triage workflow across Spectrum.Life's three client segments: employer EAP, university welfare, insurance

**Reusability note:** Replace field labels to adapt to different intake contexts — GP referral, insurance claim, student welfare check-in.

---

## Prompt 3 — Structured Output Schema

**Technique:** Structured Output Prompting  
**Purpose:** Instructs Claude to respond exclusively in a defined JSON format. This makes the output machine-readable, UI-renderable, and auditable — essential for any system used in a clinical or regulated environment.

**Where it appears in the project:** The output instruction block at the end of the prompt, after the intake data.

```
Respond ONLY in valid JSON with this exact structure
(no markdown, no backticks):
{
  "triage_level": "Urgent" or "Moderate" or "Routine" or "Safety Alert",
  "summary": "2-sentence plain-language summary of the clinical picture",
  "recommended_pathway": "Specific recommended next step",
  "actions": ["action 1", "action 2", "action 3"],
  "clinician_note": "Brief note for the reviewing clinician.
                     Flag GDPR Article 9 data handling if relevant.",
  "safety_flag": true or false,
  "safety_message": "Only populate if safety_flag is true.
                     Specific safety protocol to follow."
}
```

**Why this matters:**
- "ONLY in valid JSON" eliminates prose preambles — Claude will not say "Here is your assessment:" before the JSON
- "(no markdown, no backticks)" prevents Claude from wrapping output in code fences, which would break JSON.parse()
- Enumerated values for `triage_level` constrain Claude to four specific outputs — this maps directly to badge colours and alert logic in the UI
- "2-sentence plain-language summary" sets both length and reading level — clinical summaries must be readable by non-clinical coordinators
- The schema doubles as a data contract: the frontend knows exactly what fields to expect

**Reusability note:** This schema pattern can be adapted for any AI output that feeds into a UI or downstream system. Change the field names; keep the ONLY/no markdown instruction intact.

---

## Prompt 4 — Conditional Logic / Safety Business Rules

**Technique:** Conditional Logic in Prompts  
**Purpose:** Embeds if/then business rules directly in natural language. Replaces what would normally require hard-coded backend logic with prompt-level instructions that Claude interprets reliably.

**Where it appears in the project:** Inside the output schema definition — the `safety_flag` and `safety_message` fields.

```
"safety_flag": true or false,
"safety_message": "Only populate if safety_flag is true.
                   Specific safety protocol to follow."
```

**The implicit rule this encodes:**
```
IF presenting concerns include "Suicidal ideation" or "Self-harm thoughts"
OR risk level is "High" or "Crisis"
OR intake notes contain crisis language
THEN safety_flag = true AND safety_message = [specific protocol]
ELSE safety_flag = false AND safety_message = ""
```

**Why this matters:**
- This is prompt engineering replacing conditional business logic — the rule exists in the prompt, not in separate code
- Claude applies clinical judgement to trigger the flag — not just keyword matching. A note saying "patient mentioned feeling hopeless and not wanting to continue" will trigger the flag even without the words "self-harm"
- The safety_message field being conditional means the UI only renders a red alert box when there is genuinely something to alert — no false positives cluttering routine assessments
- This pattern mirrors how Spectrum.Life's actual escalation logic works: Case Managers follow defined protocols when specific risk signals are present

**Reusability note:** Any AI workflow with escalation, exception handling, or conditional outputs can use this pattern. Replace safety with "compliance flag," "fraud indicator," "clinical escalation," etc.

---

## Prompt 5 — Tone and Clinical Voice Instruction

**Technique:** Output Quality Constraint  
**Purpose:** Defines how Claude should write — not just what to output. Ensures the tone is appropriate for a clinical context where brevity, accuracy, and risk-awareness are non-negotiable.

**Where it appears in the project:** The closing instruction line of the prompt.

```
Be concise, clinically grounded, and risk-aware.
Flag safeguarding concerns clearly.
```

**Why this matters:**
- "Concise" prevents Claude from over-explaining in the summary field — Case Managers need fast, scannable output
- "Clinically grounded" pushes Claude toward evidence-based language rather than conversational tone
- "Risk-aware" primes Claude to weight risk signals more heavily when they appear in the intake data
- "Flag safeguarding concerns clearly" is a direct instruction that maps to UK/Ireland legal obligations — safeguarding is a statutory duty in a clinical context

**Reusability note:** Adjust the three adjectives to fit the domain. For insurance: "concise, commercially accurate, and compliant." For HR: "neutral, factual, and non-judgmental."

---

## Prompt 6 — Full Assembled Prompt (Production Version)

This is the complete prompt that runs in production — all five components assembled in sequence.

```
You are a clinical triage AI assistant at Spectrum.Life,
a digital mental health and wellbeing platform.
You support clinical intake coordinators —
you never replace clinical judgement.

Intake data:
- Age: [age]
- Referral type: [referral]
- Service requested: [service]
- Presenting concerns: [concerns]
- Duration: [duration]
- Clinical risk level entered: [risk]
- Intake notes: [freetext]

Respond ONLY in valid JSON with this exact structure
(no markdown, no backticks):
{
  "triage_level": "Urgent" or "Moderate" or "Routine" or "Safety Alert",
  "summary": "2-sentence plain-language summary of the clinical picture",
  "recommended_pathway": "Specific recommended next step",
  "actions": ["action 1", "action 2", "action 3"],
  "clinician_note": "Brief note for the reviewing clinician.
                     Flag GDPR Article 9 data handling if relevant.",
  "safety_flag": true or false,
  "safety_message": "Only populate if safety_flag is true.
                     Specific safety protocol to follow."
}

Be concise, clinically grounded, and risk-aware.
Flag safeguarding concerns clearly.
```

---

## Prompt 7 — Test Scenarios Used During Development

These are the specific test inputs used to validate the triage assistant during build and QA. Each scenario was designed to test a specific output path.

---

### Scenario A — Safety Alert Trigger (High Risk)
**Purpose:** Validate that self-harm signals + crisis language trigger `safety_flag: true`

```
Age: 26
Referral: Employer EAP
Service: Counselling
Concerns: Anxiety, Stress / burnout, Self-harm thoughts
Duration: Ongoing (2–6 months)
Risk: Moderate — review needed
Notes: Patient reports 3 months of sleep disruption, increased
       alcohol use, and intrusive thoughts about self-harm.
       Disclosed under pressure from manager.
```

**Expected output:** `triage_level: "Safety Alert"` · `safety_flag: true` · GDPR Article 9 note in `clinician_note`

---

### Scenario B — Routine Low-Risk (Baseline)
**Purpose:** Confirm the system correctly identifies non-urgent cases and does not over-triage

```
Age: 34
Referral: Self-referral
Service: Coaching
Concerns: Work / career, Stress / burnout
Duration: Short-term (2–8 weeks)
Risk: No immediate risk
Notes: Feeling overwhelmed with workload since promotion.
       Struggling with time management and prioritisation.
```

**Expected output:** `triage_level: "Routine"` · `safety_flag: false` · pathway to coaching/CBT resources

---

### Scenario C — Urgent Clinical Escalation
**Purpose:** Test psychiatry routing and urgent pathway recommendation

```
Age: 19
Referral: University welfare
Service: Psychiatry
Concerns: Depression, Suicidal ideation, Sleep problems, Grief / loss
Duration: Long-standing (6+ months)
Risk: High — urgent response
Notes: Student lost a parent 8 months ago. Academic performance
       declining. Reports passive suicidal ideation —
       "I don't want to be here anymore." No active plan stated.
```

**Expected output:** `triage_level: "Urgent"` · `safety_flag: true` · psychiatry referral within 24 hours · safeguarding note

---

### Scenario D — Moderate with GDPR Flag
**Purpose:** Confirm GDPR Article 9 is flagged when sensitive health data is present

```
Age: 41
Referral: Insurance
Service: Counselling
Concerns: Trauma / PTSD, Anxiety, Substance use
Duration: Long-standing (6+ months)
Risk: Moderate — review needed
Notes: Member disclosed history of childhood trauma.
       Currently using alcohol to manage symptoms.
       Referred by GP.
```

**Expected output:** `triage_level: "Moderate"` · `clinician_note` explicitly references GDPR Article 9 · trauma-informed pathway recommended

---

## Key Prompt Engineering Principles Applied

| Principle | Application in This Project |
|---|---|
| Be explicit, not implicit | Every instruction is stated directly — "ONLY," "no markdown," "2-sentence" |
| Constrain the output space | Enumerated triage levels prevent unexpected values |
| Embed governance in the prompt | GDPR Article 9 reminder is baked into the schema definition |
| Design for the downstream system | JSON schema maps 1:1 to UI components |
| Use fallback strings | "not specified" and "none provided" prevent hallucination on empty fields |
| Set tone as a constraint | "clinically grounded" shapes language quality, not just content |
| Human-in-the-loop by design | Role definition explicitly states AI supports, never replaces |

---

## How This Scales

This prompt library is designed to be extended. Future prompts in a production Spectrum.Life deployment could include:

- **Session summary prompt** — post-counselling structured summary for case records
- **Risk trend prompt** — weekly aggregate analysis across a caseload
- **Referral letter prompt** — structured output for GP or psychiatry referral letters
- **Manager alert prompt** — plain-language summary for HR/manager when critical incident protocol is triggered (with appropriate consent)
- **Outcome measurement prompt** — structured pre/post assessment comparison using validated tools (PHQ-9, GAD-7)

---

*Prompt Library v1.0 · Naveen Rao V · April 2026*  
*Part of: AI Transformation BA Portfolio — Spectrum.Life Interview Preparation*  
*GitHub: ai-transformation-ba-wellbeing-platform/project-b-clinical-triage*
