# Meeting Intelligence Workflow
## BA Automation Project — Spectrum.Life

**Project Code:** Project J
**Author:** Naveen Rao V — AI Transformation Business Analyst
**Organisation:** Spectrum.Life
**Date:** April 2026
**Status:** 📋 Requirements Defined — Ready for Development
**Version:** 1.1

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Current State — As-Is Process](#3-current-state--as-is-process)
4. [Proposed Solution — To-Be Process](#4-proposed-solution--to-be-process)
5. [Detailed Workflow Design](#5-detailed-workflow-design)
6. [Technology Architecture](#6-technology-architecture)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [User Scenarios](#9-user-scenarios)
10. [Phased Delivery Roadmap](#10-phased-delivery-roadmap)
11. [Risks and Mitigations](#11-risks-and-mitigations)
12. [Success Metrics](#12-success-metrics)
13. [Assumptions and Dependencies](#13-assumptions-and-dependencies)
14. [Glossary](#14-glossary)

---

## 1. Executive Summary

Spectrum.Life operates across six locations — Dublin, Manchester, Belfast, Sydney, Melbourne and Dubai — serving 4,500+ corporate clients, major insurer partnerships and 60+ universities. Commercial, clinical and operational teams hold meetings every day. The intelligence from those meetings — client decisions, action items, renewal signals, risk flags — needs to flow to three destinations: a retrievable meeting record, Salesforce CRM and relevant stakeholders via a structured Minutes of Meeting.

In organisations operating at this scale and pace of growth, and where CRM platforms have been implemented ahead of structured process design, it is reasonable to consider that meeting intelligence capture may not yet be happening with full consistency across all teams and regions. This project defines the requirements for a workflow designed to address that risk — whether it exists partially or entirely.

The **Meeting Intelligence Workflow** uses Spectrum.Life's existing Microsoft 365 infrastructure — no new platforms, no new licenses, no new vendors. The workflow detects when a Teams meeting ends, notifies the organiser to review any available transcript and add missing context, sends the input to Claude for structured report generation, presents the report for human approval and distributes outputs to three destinations.

> **Discovery note:** The specific current-state challenges identified in Section 2 are hypothesis-based. Formal validation through stakeholder discovery with the commercial and operations functions is the recommended first step upon joining. The workflow is designed to add value regardless of which hypotheses are confirmed.

---

## 2. Problem Statement

### 2.1 The Context

Spectrum.Life implemented Salesforce approximately three years ago. Based on confirmed information — that the platform is currently running at approximately 30% of its potential utilisation — it is reasonable to form a hypothesis that meeting intelligence is not flowing consistently to the CRM or to stakeholders. This is a common pattern in organisations where CRM implementation has preceded structured process and BA involvement.

This project does not assume specific team behaviours or individual practices. It identifies structural gaps in the current operating model and proposes a workflow to address them.

### 2.2 The Structural Gaps — Hypothesis to Validate

The following hypotheses will be validated through discovery with the commercial and operations teams:

**Hypothesis 1 — Absence of a capture standard**
Where no structured format exists for meeting records, it is likely that different team members capture different information at different levels of detail across a portfolio of 4,500+ clients. Key commercial signals — renewal dates, product upgrade interest, at-risk indicators, Cara Q2 2026 interest — may not be systematically recorded.

**Hypothesis 2 — CRM update friction**
Where CRM updates require significant manual formatting effort — estimated at 10-15 minutes per record — they may be deprioritised against immediate client-facing work. This is a well-documented pattern in commercial organisations and is consistent with the confirmed 30% utilisation position.

**Hypothesis 3 — Absence of a prompting mechanism**
Where no automated trigger exists to prompt post-meeting record updates, update behaviour relies entirely on individual discipline and memory. In a fast-growing organisation managing multiple geographies and an active acquisition programme, this represents a structural risk.

**Hypothesis 4 — Inconsistent MoM distribution**
Where no structured Minutes of Meeting process exists, action items agreed in meetings may not be tracked, distributed or followed through consistently.

### 2.3 Business Risk — If Hypotheses Are Confirmed

| Risk Area | Potential Impact |
|-----------|----------------|
| Pipeline visibility | Leadership cannot rely on Salesforce data for commercial decisions |
| Renewal risk | Renewal dates and at-risk signals not surfaced proactively |
| Cara Q2 2026 | Client interest signals not captured — launch opportunity missed |
| Australia integration | Acquisition client intelligence not systematically recorded |
| Action item follow-through | Commitments made in meetings not tracked or completed |
| Leadership reporting | Pipeline reports compiled manually — resource-intensive and potentially inaccurate |

### 2.4 What This Workflow Addresses

| Structural Gap | How This Workflow Addresses It |
|---------------|-------------------------------|
| No capture standard | Skill produces consistent structured output every time — regardless of who writes the notes |
| CRM update friction | 15-minute formatting task reduced to under 2 minutes |
| No prompting mechanism | Phase 2 automates the trigger — no individual memory required |
| Inconsistent MoM | MoM is produced automatically as part of every meeting processing step |

---

## 3. Current State — As-Is Process

> **Note on this section:** The As-Is processes below represent the assumed current state based on the structural gaps identified above. They should be validated and refined through stakeholder discovery before any development begins.

### 3.1 Assumed Current Process — Meeting With Transcript Available

```
Teams meeting scheduled in Outlook Calendar
              │
              ▼
Meeting takes place in Microsoft Teams
              │
              ▼
Organiser manually starts transcription
if they choose to — not standardised
              │
              ▼
Meeting ends — attendees return
to next priority task
              │
              ▼
Meeting notes exist in notebooks
or personal emails
              │
              ▼
[Variable delay — timing not confirmed]
              │
              ▼
CRM record may be updated
with variable levels of completeness
              │
              ▼
Commercial signals may or may not
be captured in the update
              │
              ▼
MoM may or may not be distributed
to attendees
```

### 3.2 Assumed Current Process — Meeting Without Transcript

```
Same as above — no transcript available.
Meeting intelligence exists only in
attendees' memory and personal notes.
```

### 3.3 Structural Risk Areas — By Function

> Role titles used — not personal names

| Function | Potential Risk Area |
|----------|-------------------|
| Commercial Account Management | CRM update effort may compete with client-facing priorities |
| Account Management Director function | Pipeline data reliability for reporting may be variable |
| Commercial Director function | Renewal risk visibility may be reactive rather than proactive |
| Chief People Officer | CRM administration may consume strategic leadership time |
| Chief Executive Officer | Commercial intelligence for the 40-60% automation vision may be unreliable |
| Clinical function | Meeting records and action items may not be consistently captured |
| All functions | Action items agreed in meetings may not be systematically tracked |

---

## 4. Proposed Solution — To-Be Process

### 4.1 Solution Overview

A Power Automate workflow that:

1. **Detects** when any Teams calendar meeting ends
2. **Checks** whether a transcript is available in SharePoint
3. **Notifies** the meeting organiser via Teams Adaptive Card
4. **Presents** transcript summary (if available) plus input fields for additional context
5. **Sends** all input to Claude API for structured report generation
6. **Presents** the generated report to the organiser for review and approval
7. **Supports** iterative refinement — adding context without regenerating the full report
8. **Distributes** the approved report to three destinations based on organiser's choice

### 4.2 Core Design Principles

**Principle 1 — Human in the loop always**
Claude generates. A human reviews and approves before any distribution occurs. Claude never sends directly to Salesforce or to attendees without explicit human approval.

**Principle 2 — Additive refinement not regeneration**
When the organiser adds missing information after reviewing the draft — Claude appends it without discarding existing content. Context built iteratively.

**Principle 3 — Built on existing infrastructure**
Microsoft Teams, Calendar, SharePoint, Power Automate, Claude API and Salesforce — all confirmed as part of the Spectrum.Life technology estate. No new platforms or vendors.

**Principle 4 — Organiser controls all distribution**
Save privately, share with attendees or push to Salesforce — nothing distributed without explicit organiser choice.

**Principle 5 — Works with or without transcript**
Both scenarios handled gracefully. Transcript path produces richer output. No-transcript path uses manual notes and supports image or document attachment via SharePoint.

---

## 5. Detailed Workflow Design

### 5.1 Complete To-Be Process Flow

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIGGER LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Outlook Calendar meeting event ends
              │
              ▼
Power Automate triggers via
Microsoft Graph API
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
Transcript       No Transcript
detected in      within 15
SharePoint       minutes
       │             │
       ▼             ▼
    Path A        Path B

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTIFICATION — ADAPTIVE CARD 1
(Teams direct message to meeting organiser)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PATH A — Transcript Available:
┌───────────────────────────────────────────┐
│ 📋 Meeting Report Ready                    │
│ [Meeting Name] — [Date] — [Duration]       │
│                                            │
│ ✅ Transcript available                    │
│ Key points: [Claude pre-summary — bullets] │
│ [View full transcript → SharePoint link]   │
│                                            │
│ Add anything missing:                      │
│ ┌──────────────────────────────────────┐   │
│ │  Type additional context here...     │   │
│ └──────────────────────────────────────┘   │
│                                            │
│ 📎 Upload supporting docs or images:       │
│ [Open upload folder → SharePoint link]     │
│                                            │
│ [Create Meeting Report]    [Skip]          │
└───────────────────────────────────────────┘

PATH B — No Transcript:
┌───────────────────────────────────────────┐
│ 📋 Meeting Report Ready                    │
│ [Meeting Name] — [Date] — [Duration]       │
│                                            │
│ 📝 No transcript recorded                 │
│                                            │
│ Add your meeting notes:                    │
│ ┌──────────────────────────────────────┐   │
│ │  Write your notes here...            │   │
│ └──────────────────────────────────────┘   │
│                                            │
│ 📎 Upload handwritten notes or docs:       │
│ [Open upload folder → SharePoint link]     │
│                                            │
│ [Create Meeting Report]    [Skip]          │
└───────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCESSING LAYER — CLAUDE API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organiser clicks [Create Meeting Report]
              │
              ▼
Power Automate collects:
• Transcript text (from SharePoint if available)
• Additional text (from Card 1 text input)
• Supporting files (from SharePoint folder)
• Meeting metadata: name, date, attendees, type
              │
              ▼
Sent to Claude API with Meeting Intelligence
Processor skill prompt
              │
              ▼
Claude generates structured report:
• Meeting summary
• Key decisions made
• Action items with roles and dates
• Follow-up scheduled (if mentioned)
• Commercial signals (if client meeting)
• Salesforce update fields (if applicable)
• Minutes of Meeting (formatted for email)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVIEW LAYER — ADAPTIVE CARD 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌───────────────────────────────────────────┐
│ ✅ Meeting Report Generated                │
│                                            │
│ [Structured report — key sections]         │
│ • Summary                                  │
│ • Decisions                                │
│ • Action items                             │
│ • Commercial signals (if applicable)       │
│                                            │
│ [View full report → SharePoint link]       │
│                                            │
│ Anything to add? Claude will add it        │
│ without changing the existing report:      │
│ ┌──────────────────────────────────────┐   │
│ │                                      │   │
│ └──────────────────────────────────────┘   │
│ [Add to Report]                            │
│                                            │
│ Ready? Choose output:                      │
│ [✅ Save Privately]                        │
│ [📤 Approve + Send to Attendees]           │
│ [💾 Approve + Push to Salesforce]          │
│ [📤💾 Approve + Send + Push to Salesforce] │
└───────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REFINEMENT LOOP (if organiser adds more)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organiser adds text → clicks [Add to Report]
              │
              ▼
Power Automate sends to Claude API:
"Existing report: [report]
Additional information: [new text]
Append as Additional Notes section only.
Do not change the existing report."
              │
              ▼
Updated report returned
New card sent showing updated version
Organiser reviews — approves when ready
Loop repeats until organiser is satisfied

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OUTPUT A — Always saved regardless of choice:
Report saved to SharePoint
Folder: /Meetings/[YYYY-MM-DD]-[MeetingName]/
Includes: transcript, notes, final report
Accessible and downloadable any time

OUTPUT B — If Send to Attendees chosen:
MoM email sent via Outlook to attendees
Summary posted to Teams meeting chat
Action items highlighted in email body

OUTPUT C — If Push to Salesforce chosen:
Salesforce Activity record created
Linked to Account and Opportunity
Action item Tasks created with owners
Commercial flags logged to record
```

---

## 6. Technology Architecture

### 6.1 Technology Stack — All Confirmed Existing at Spectrum.Life

| Component | Technology | Role |
|-----------|-----------|------|
| Meeting platform | Microsoft Teams | Hosting, transcription |
| Calendar | Outlook / Microsoft 365 | Scheduling, trigger source |
| Transcript storage | SharePoint | Transcript and file storage |
| Workflow automation | Power Automate | Trigger, orchestration, cards |
| Notification UI | Teams Adaptive Cards | Interactive input interface |
| AI processing | Claude API (Anthropic) | Structured report generation |
| CRM | Salesforce | Activity records, flags, tasks |
| Email distribution | Outlook | MoM delivery to attendees |
| Document archive | SharePoint | Final report storage |

### 6.2 System Integration Diagram

```
┌─────────────────┐     ┌─────────────────┐
│  Outlook        │     │  Microsoft Teams │
│  Calendar       │────▶│  Meeting +       │
│  (Trigger)      │     │  Transcript      │
└────────┬────────┘     └────────┬────────┘
         │                       │
         │                       ▼
         │              ┌─────────────────┐
         │              │  SharePoint     │
         │              │  (Transcript +  │
         │              │   File Storage) │
         │              └────────┬────────┘
         │                       │
         ▼                       ▼
┌────────────────────────────────────────┐
│          POWER AUTOMATE                │
│  • Detects meeting end via Graph API   │
│  • Checks transcript availability      │
│  • Sends Adaptive Cards in Teams       │
│  • Calls Claude API                    │
│  • Routes outputs to destinations      │
└──────────┬─────────────────┬───────────┘
           │                 │
           ▼                 ▼
┌──────────────┐   ┌────────────────────┐
│ Claude API   │   │  Teams Adaptive    │
│ (Anthropic)  │   │  Cards             │
│              │   │  (Notification +   │
│ Generates    │   │   Input UI)        │
│ structured   │   │                   │
│ report       │   └────────────────────┘
└──────────────┘
           │
    Human Approval
           │
    ┌──────┼──────────┐
    ▼      ▼          ▼
SharePoint Salesforce  Outlook
(Archive) (CRM update) (MoM email)
```

### 6.3 Claude API — The Intelligence Layer

Claude receives all input and generates the structured report using the **Meeting Intelligence Processor skill** — a governed prompt that identifies meeting type, extracts decisions and action items, flags commercial signals and produces all three structured outputs.

**Additive refinement prompt:**
When the organiser adds missing information — Claude appends it as an Additional Notes section without modifying the existing report. Original content is preserved across all refinement rounds.

---

## 7. Functional Requirements

### 7.1 Trigger Requirements

| ID | Requirement | Priority |
|----|-------------|---------|
| TR-01 | System must detect when a Microsoft Teams calendar meeting has ended via Microsoft Graph API | Must Have |
| TR-02 | System must check SharePoint for a transcript file within 15 minutes of meeting end | Must Have |
| TR-03 | System must send notification card to meeting organiser regardless of transcript availability | Must Have |
| TR-04 | System must identify meeting type from calendar event title or metadata where possible | Should Have |
| TR-05 | System must not trigger for meetings marked as private in calendar | Must Have |

### 7.2 Notification Card Requirements (Card 1)

| ID | Requirement | Priority |
|----|-------------|---------|
| NC-01 | Card must display meeting name, date and duration | Must Have |
| NC-02 | Card must show a Claude-generated summary if transcript is available | Must Have |
| NC-03 | Card must provide a link to the full transcript in SharePoint | Must Have |
| NC-04 | Card must include a text input field in both transcript and non-transcript paths | Must Have |
| NC-05 | Card must provide a SharePoint upload link for supporting documents and images | Must Have |
| NC-06 | Card must include [Create Meeting Report] and [Skip] buttons | Must Have |
| NC-07 | Card must be delivered as a direct Teams message to the organiser only | Must Have |
| NC-08 | Card must display correctly on Teams desktop and mobile | Should Have |

### 7.3 Claude Processing Requirements

| ID | Requirement | Priority |
|----|-------------|---------|
| CP-01 | System must send transcript text, additional notes and meeting metadata to Claude API | Must Have |
| CP-02 | Claude must identify meeting type and adapt output structure accordingly | Must Have |
| CP-03 | Claude must always produce: meeting summary, decisions, action items, follow-up date | Must Have |
| CP-04 | Claude must detect and flag commercial signals for client meetings | Must Have |
| CP-05 | Claude must produce Salesforce-ready Activity fields for client meetings | Must Have |
| CP-06 | Claude must produce MoM formatted for email distribution | Must Have |
| CP-07 | Refinement prompt must ADD to existing report — not regenerate it | Must Have |
| CP-08 | Claude must flag if critical information appears missing from the notes | Should Have |
| CP-09 | System must handle long transcripts via chunking to avoid token limit errors | Must Have |

### 7.4 Review and Approval Requirements (Card 2+)

| ID | Requirement | Priority |
|----|-------------|---------|
| RA-01 | Card must display a summary of the generated report | Must Have |
| RA-02 | Card must provide a link to the full report in SharePoint | Must Have |
| RA-03 | Card must include a text input field for additional information | Must Have |
| RA-04 | Card must include [Add to Report] button for iterative refinement | Must Have |
| RA-05 | Card must include four output choice buttons | Must Have |
| RA-06 | System must send a new card when report is updated with additions | Must Have |
| RA-07 | Refinement loop must support a minimum of three iterations | Should Have |
| RA-08 | No output must be distributed without explicit organiser approval | Must Have |

### 7.5 Output Requirements

| ID | Requirement | Priority |
|----|-------------|---------|
| OP-01 | Final report must always be saved to SharePoint regardless of distribution choice | Must Have |
| OP-02 | SharePoint folder must follow naming convention: /Meetings/[YYYY-MM-DD]-[MeetingName]/ | Must Have |
| OP-03 | SharePoint folder must contain transcript, notes, supporting files and final report | Must Have |
| OP-04 | If Send to Attendees chosen — MoM email must be sent to all meeting attendees | Must Have |
| OP-05 | If Send to Attendees chosen — summary must be posted to Teams meeting chat | Should Have |
| OP-06 | If Push to Salesforce chosen — Activity record must be created automatically | Must Have |
| OP-07 | Salesforce Activity must be linked to relevant Account and Opportunity | Must Have |
| OP-08 | Action items must create Salesforce Tasks with owner role and due date | Should Have |

---

## 8. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Notification card delivered within 5 minutes of meeting end | < 5 minutes |
| NFR-02 | Claude processing time from submission to report display | < 30 seconds |
| NFR-03 | System must operate 24/7 across all time zones | 99.5% uptime |
| NFR-04 | All meeting content must remain within Microsoft 365 tenant boundary | Mandatory |
| NFR-05 | Claude API must not store or train on meeting content | Mandatory |
| NFR-06 | SharePoint storage must comply with data retention policy | Mandatory |
| NFR-07 | Clinical meeting content must be handled as GDPR special category data | Mandatory |
| NFR-08 | Salesforce connector must use existing authenticated credentials only | Mandatory |
| NFR-09 | System must handle concurrent meetings from multiple organisers | Must Handle |
| NFR-10 | Power Automate run limits must be monitored monthly | Monitor |

---

## 9. User Scenarios

### Scenario 1 — Commercial Function: Client Meeting With Transcript

**Context:** A commercial team member has just finished a review call with an insurer client. Teams automatically transcribed the call. Five minutes after the call ends, a Teams Adaptive Card arrives.

**Workflow:** Card shows transcript summary — ADHD expansion interest, September renewal, contact transition noted. Team member adds: *"Contact confirmed moving roles in June — successor introduction needed urgently."* Clicks Create Report. Claude generates structured output with urgent contact flag and renewal opportunity. Team member clicks Approve + Send + Push to Salesforce. MoM sent to client contact. Salesforce Activity created with all commercial signals.

**Time:** 4 minutes. Estimated previous effort: 15+ minutes if done at all.

---

### Scenario 2 — Commercial Function: External Meeting Without Transcript

**Context:** A commercial team member attended an in-person meeting with a prospective partner in London. No Teams meeting — no transcript.

**Workflow:** Team member triggers notification manually. Card shows text input only. They type rough notes, upload a photo of handwritten notes via SharePoint link. Click Create Report. Claude generates structured report from notes and image context. Team member reviews, saves privately. Report archived to SharePoint.

---

### Scenario 3 — Clinical Function: Internal Meeting With Transcript

**Context:** The clinical leadership function held a 30-minute internal quality review. Transcript generated.

**Workflow:** Card arrives with transcript summary. Meeting type identified as internal clinical. Team member adds agenda points not in transcript. Clicks Create Report. Claude generates internal meeting record — decisions, action items, clinical governance notes. Team member clicks Save Privately — not pushed to Salesforce. GDPR note confirmed. Report saved to SharePoint.

---

### Scenario 4 — Australia Integration: Post-Acquisition Partner Call

**Context:** A team member in Sydney finished an onboarding call with an Australian acquisition partner. Teams meeting, transcript available.

**Workflow:** Same workflow activates — operates across all time zones. Claude detects Australia context from meeting metadata. Report includes platform migration discussion and Cara future interest flag. Team member pushes to Salesforce. Australian partner record updated. MoM sent to partner attendees.

---

## 10. Phased Delivery Roadmap

### Phase 1 — Claude Skill (Available Now)

**What:** The Meeting Intelligence Processor skill — the Claude prompt that converts any meeting input into three structured outputs.

**How:** Used manually. Team member pastes notes or transcript and triggers the skill.

**Value:** Formatting friction removed. Consistent structured output. Commercial signals captured systematically.

**Limitation:** Does not address the prompting or forgetting challenge. Depends on individual initiation.

**Effort:** Complete — skill built, tested and documented.

---

### Phase 2 — Power Automate + Teams Adaptive Cards (Month 1-2)

**What:** Automated workflow — calendar trigger, transcript detection, notification cards, Claude API integration, SharePoint storage.

**How:** Power Automate flow built by IT developer. Claude API called via HTTP connector. Salesforce connector requires Power Automate premium licence.

**Value:** Prompting challenge addressed — organiser notified automatically after every meeting. Manual initiation no longer required.

**Limitation:** File attachments via SharePoint link not inline card upload. Full transcript shown via link — summary in card. New card sent per refinement iteration — not in-place update (Teams Adaptive Card limitation).

**Effort:** 2-3 weeks development.

---

### Phase 3 — Salesforce Agentforce Integration (Month 3-4)

**What:** Agentforce agent automatically creates Salesforce records from approved output. Action item Tasks auto-assigned. Pipeline reports generated from accumulated data.

**How:** Agentforce use case defined in Project G. Salesforce flows triggered by Power Automate output.

**Value:** Full CRM automation. Manual CRM entry eliminated. Pipeline intelligence reliable for leadership reporting.

**Effort:** Depends on Agentforce licencing and configuration timeline.

---

### Phase 4 — Custom Teams App (Future)

**What:** Custom Teams tab application with inline file upload, full transcript display and real-time card updates.

**How:** Custom Teams app built using Microsoft Teams App Framework.

**Value:** Full experience as designed — inline attachment, real-time refresh, polished UI.

**Effort:** 4-6 weeks development. Recommended only after Phases 2 and 3 are validated.

---

## 11. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Discovery reveals current state is better than hypothesised | Possible | Low | Workflow still adds value — faster, more consistent output regardless of baseline |
| Transcript not available for external or in-person meetings | High | Medium | Manual notes path handles this gracefully in both phases |
| Teams auto-transcription policy not enabled | Medium | Medium | One-time IT admin configuration — resolve before Phase 2 build begins |
| Claude API token limits for long transcripts | Medium | Medium | Chunking logic built into Power Automate flow |
| Salesforce connector requires premium licence | Low | Low | Confirm with IT before Phase 2 build |
| Clinical meeting content handled incorrectly | Low | High | Skill explicitly excludes clinical content from Salesforce — GDPR note enforced |
| Adaptive Card not updating in place after refinement | Certain | Low | New card sent per iteration — minor UX difference, not a blocker |
| Teams admin policy blocking Graph API automation | Low | High | Early IT admin engagement required before Phase 2 |
| Adoption — teams not using the workflow | Medium | High | Change management with leadership reinforcement. Phase 2 addresses this via automation |

---

## 12. Success Metrics

### Phase 1 — Skill (Manual)

| Metric | Baseline | Target | How to Measure |
|--------|---------|--------|----------------|
| Time to complete structured meeting update | To be confirmed through discovery | Under 5 minutes | Self-reported — team survey |
| Consistency of CRM record format | To be confirmed | High — consistent fields | Salesforce field completion rate |
| Commercial signals captured per record | To be confirmed | All relevant signals logged | Salesforce activity review |

### Phase 2 — Automated Workflow

| Metric | Baseline | Target | How to Measure |
|--------|---------|--------|----------------|
| Salesforce Activity records per week | To be confirmed | Consistent with meeting volume | Salesforce reporting |
| Meeting report completion rate | To be confirmed | Greater than 80% of meetings | Cards completed vs meetings held |
| MoM distribution rate | To be confirmed | Every client meeting | Outlook send tracking |
| Time from meeting end to record update | To be confirmed | Same day | Salesforce activity timestamp |

### Phase 3 — Agentforce

| Metric | Baseline | Target | How to Measure |
|--------|---------|--------|----------------|
| Manual CRM entry required | Current level TBC | Near zero | Salesforce auto-created records |
| Pipeline report accuracy | To be confirmed | Reliable for leadership decisions | Leadership satisfaction |
| Renewal risk visibility | Reactive | 90+ days proactive | Renewal pipeline dashboard |

---

## 13. Assumptions and Dependencies

### Assumptions

| # | Assumption | Validation Required |
|---|-----------|-------------------|
| A1 | Spectrum.Life has active Microsoft 365 licence covering Teams, SharePoint, Outlook and Power Automate | Confirm with IT |
| A2 | Auto-transcription policy can be enabled for Teams meetings by IT admin | Confirm with IT |
| A3 | Power Automate premium connectors can be licenced for Salesforce integration | Confirm with IT and Finance |
| A4 | Anthropic Claude API is available with sufficient rate limits for meeting volume | Confirm with technical leadership |
| A5 | Salesforce Account naming is consistent enough to enable automated record matching | Confirm with commercial function through discovery |
| A6 | Meeting organiser is always a Spectrum.Life Microsoft 365 user | Confirm with IT |
| A7 | Teams and Outlook are used for the majority of commercial meetings | Confirm through discovery |

### Dependencies

| # | Dependency | Function Owner | Risk if Missing |
|---|-----------|---------------|----------------|
| D1 | Microsoft Graph API access for calendar and transcript triggers | IT Admin | Trigger layer cannot function |
| D2 | SharePoint folder structure defined and permissions set | BA + IT | Storage layer cannot function |
| D3 | Claude API access confirmed | Technical leadership | Processing layer cannot function |
| D4 | Salesforce Account naming convention documented | Commercial function | CRM record matching may fail |
| D5 | Power Automate premium licence for Salesforce connector | IT / Finance | Phase 2 Salesforce output blocked |
| D6 | Meeting organiser identity available in Graph API event | IT | Notification cannot be directed |

---

## 14. Glossary

| Term | Definition |
|------|-----------|
| **Adaptive Card** | Interactive UI component in Microsoft Teams — displays information and accepts user input |
| **Additive Refinement** | The process of adding information to an existing Claude-generated report without regenerating it — preserving all previously confirmed content |
| **Agentforce** | Salesforce's AI agent platform — automates CRM actions and workflows |
| **Claude API** | Anthropic's API for programmatic access to Claude AI models |
| **Graph API** | Microsoft's API for accessing Microsoft 365 data including Teams, Calendar and SharePoint |
| **Human in the Loop** | Design principle requiring human review and approval before automated outputs are distributed |
| **Meeting Intelligence Processor** | The Claude skill (governed prompt) that converts meeting inputs into three structured outputs |
| **MoM** | Minutes of Meeting — structured summary distributed to meeting attendees after the meeting |
| **Power Automate** | Microsoft's workflow automation platform — connects apps and services within Microsoft 365 |
| **Salesforce Activity** | A CRM record in Salesforce that logs a completed interaction with an account or contact |
| **SharePoint** | Microsoft's document storage and collaboration platform |
| **Transcript** | Automatic text conversion of spoken meeting dialogue generated by Microsoft Teams |

---

## Appendix A — Meeting Intelligence Processor Skill

The Claude prompt used in Phase 1 (manual) and Phase 2 (Power Automate) is governed by the Meeting Intelligence Processor skill.

**Repository:** github.com/Naveenraov/ba-digitalhealth-skills-library
**Location:** `/sales-ops/meeting-intelligence-processor-v1.1.md`
**Trigger:** `Meeting: [paste transcript or notes]`

---

## Appendix B — Related Projects

| Project | Relationship |
|---------|-------------|
| Project D — Operations Automation Opportunity Map | This workflow addresses CRM and meeting intelligence gaps identified in Project D |
| Project G — Agentforce Use Case Discovery | Phase 3 connects to Agentforce use cases defined in Project G |
| ba-digitalhealth-skills-library / sales-ops | Meeting Intelligence Processor skill powers this workflow |

---

## Version History

| Version | Change | Reason |
|---------|--------|--------|
| v1.0 | Initial build | Full BA requirements document created |
| v1.1 | Problem statement reframed from stated facts to hypothesis-based language. Personal names replaced with role designations throughout. Discovery note added to Executive Summary and all assumption-based sections. | Professional BA standard — assumptions must be validated through stakeholder discovery, not presented as confirmed facts in a portfolio document |

---

*Meeting Intelligence Workflow — BA Automation Project*
*Naveen Rao V | AI Transformation Business Analyst | Dublin, Ireland*
*April 2026 | Spectrum.Life AI Transformation Portfolio*
*GitHub: github.com/Naveenraov/ai-transformation-ba-wellbeing-platform*
