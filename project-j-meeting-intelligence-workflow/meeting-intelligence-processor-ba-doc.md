# Meeting Intelligence Workflow
## BA Automation Project — Spectrum.Life

**Project Code:** Project J
**Author:** Naveen Rao V — AI Transformation Business Analyst
**Organisation:** Spectrum.Life
**Date:** April 2026
**Status:** 📋 Requirements Defined — Ready for Development
**Version:** 1.0

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

Spectrum.Life operates across five locations — Dublin, Manchester, Belfast, Sydney and Melbourne — serving 4,500+ corporate clients, major insurer partnerships and 60+ universities. Commercial, clinical and operational teams hold meetings every day. The intelligence from those meetings — client decisions, action items, renewal signals, risk flags — needs to flow to three destinations: a retrievable meeting record, Salesforce CRM and relevant stakeholders via email.

Today none of these happen consistently. Meeting notes stay in notebooks. Salesforce records are updated days later, partially, or not at all. Minutes of Meeting are rarely sent. The result is lost commercial intelligence, unreliable pipeline data and action items that are not followed through.

This project defines the requirements for a **Meeting Intelligence Workflow** — a Power Automate automation built entirely on Spectrum.Life's existing Microsoft 365 infrastructure. The workflow detects when a Teams meeting ends, notifies the organiser to review transcript and add any missing context, sends the input to Claude for structured report generation, presents the report for human approval and distributes outputs to three destinations automatically.

**No new platforms. No new licenses. No new vendors. Built on what Spectrum.Life already pays for.**

---

## 2. Problem Statement

### 2.1 The Core Problem

Spectrum.Life's meeting intelligence is not being captured, structured or distributed consistently. Every meeting — whether a client review with Laya Healthcare, a clinical team standup, or a partner call with MindFit at Work in Melbourne — generates valuable information. That information currently has no reliable path from the meeting to the systems and people who need it.

### 2.2 The Three Root Causes

**Root Cause 1 — No structured capture standard**
There is no defined format for what a good meeting record looks like. Different team members capture different things. Key commercial signals — contract renewal dates, upgrade interest, at-risk indicators — are missed because there is no framework prompting their capture.

**Root Cause 2 — CRM update is manual and time-consuming**
Creating a properly structured Salesforce Activity record from rough meeting notes takes 10-15 minutes. This friction means it gets deprioritised. Salesforce has been running at approximately 30% utilisation for three years — not because the team does not care, but because the effort of proper CRM entry is too high relative to immediate priorities.

**Root Cause 3 — No prompting mechanism**
There is nothing in the current workflow that reminds the meeting organiser to update their records after a meeting. Other priorities take over immediately. The update never happens or happens days later with incomplete context.

### 2.3 Business Impact

| Impact Area | Current State |
|------------|--------------|
| Salesforce utilisation | Approximately 30% — pipeline data unreliable |
| Renewal risk visibility | Renewal dates missed — discovered reactively |
| Action item tracking | Actions agreed in meetings not followed through |
| Commercial intelligence | Intelligence from 4,500+ client relationships not systematically captured |
| Leadership reporting | Pipeline reports compiled manually — inaccurate and late |
| Cara Q2 2026 signals | Client interest in Cara not being captured and actioned |

---

## 3. Current State — As-Is Process

### 3.1 Process Flow — Meeting WITH Transcript

```
Teams meeting scheduled in Outlook Calendar
              │
              ▼
Meeting takes place in Microsoft Teams
              │
              ▼
Organiser manually starts transcription
(if they remember — not consistent)
              │
              ▼
Meeting ends
              │
              ▼
Each attendee returns to next task
              │
              ▼
Rough notes sit in notebooks or email
              │
              ▼
[DELAY — hours to days]
              │
              ▼
Team member partially updates Salesforce
(if at all — if client meeting)
              │
              ▼
Generic notes added — missing:
• Renewal date
• Cara interest signal
• Risk flags
• Contact change alerts
              │
              ▼
No MoM sent to attendees
No meeting record stored
Action items not tracked
```

### 3.2 Process Flow — Meeting WITHOUT Transcript

```
Same as above — but no transcript exists at all.
Meeting intelligence exists only in the 
organiser's memory and rough notes.
```

### 3.3 Current State Pain Points — By Role

| Role | Pain Point |
|------|-----------|
| **Commercial Account Manager** | Spending 10-15 minutes formatting Salesforce updates — deprioritised |
| **Account Management Director** | Cannot trust pipeline data — manually compiles reports |
| **Commercial Director** | Renewal risks not visible until too late |
| **CPO (Lynda)** | Managing Salesforce herself — admin consuming strategic leadership time |
| **CEO (Stephen)** | Pipeline intelligence for 40-60% automation vision is unreliable |
| **Clinical Team** | No consistent record of clinical team meetings and decisions |
| **All Teams** | Action items agreed in meetings not tracked or followed through |

---

## 4. Proposed Solution — To-Be Process

### 4.1 Solution Overview

A Power Automate workflow that:

1. **Detects** when any Teams calendar meeting ends
2. **Checks** whether a transcript is available in SharePoint
3. **Notifies** the meeting organiser via Teams Adaptive Card
4. **Presents** the transcript summary (if available) plus input fields for additional context
5. **Sends** all input to Claude via API for structured report generation
6. **Presents** the generated report to the organiser for review and approval
7. **Allows** iterative refinement — adding missing information without regenerating the full report
8. **Distributes** the approved report to three destinations based on organiser's choice

### 4.2 The Key Design Principles

**Principle 1 — Human in the loop always**
Claude generates the report. A human reviews and approves before any distribution occurs. Claude never sends directly to Salesforce or attendees without human approval.

**Principle 2 — Additive refinement not regeneration**
When the organiser adds missing information after reviewing the draft — Claude adds it as supplementary content. The existing report is not discarded and regenerated. Context built up iteratively.

**Principle 3 — Built on existing infrastructure**
No new platforms, vendors or licenses. Microsoft Teams, Calendar, SharePoint, Power Automate, Claude API and Salesforce — all already in use at Spectrum.Life.

**Principle 4 — Organiser controls distribution**
The organiser chooses whether to save privately, share with attendees or push to Salesforce. Nothing is distributed without explicit choice.

**Principle 5 — Works with or without transcript**
The workflow handles both scenarios gracefully — transcript available provides richer structured output, no transcript triggers a manual notes input path.

---

## 5. Detailed Workflow Design

### 5.1 Complete To-Be Process Flow

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIGGER LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Outlook Calendar meeting event ends
              │
              ▼
Power Automate triggers via Microsoft Graph API
              │
         ┌────┴────┐
         │         │
         ▼         ▼
  Transcript    No Transcript
  available     detected
  in SharePoint within 15 mins
         │         │
         ▼         ▼
  Path A        Path B
  (Transcript)  (Manual notes)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTIFICATION LAYER — CARD 1
(Sent as Teams direct message to organiser)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PATH A — Transcript Available:
┌─────────────────────────────────────────────┐
│ 📋 Meeting Report Ready                      │
│ [Meeting Name] — [Date] — [Duration]         │
│                                              │
│ ✅ Transcript available                      │
│ Key points: [Claude pre-summary — 5 bullets] │
│ [View full transcript → SharePoint link]     │
│                                              │
│ Add anything missing:                        │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ │  Type additional context here...         │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ 📎 Upload supporting docs or images:         │
│ [Open upload folder → SharePoint link]       │
│                                              │
│ [Create Meeting Report]    [Skip]            │
└─────────────────────────────────────────────┘

PATH B — No Transcript:
┌─────────────────────────────────────────────┐
│ 📋 Meeting Report Ready                      │
│ [Meeting Name] — [Date] — [Duration]         │
│                                              │
│ 📝 No transcript recorded                   │
│                                              │
│ Add your meeting notes:                      │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ │  Write your notes here...                │ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ 📎 Upload handwritten notes, images or docs: │
│ [Open upload folder → SharePoint link]       │
│                                              │
│ [Create Meeting Report]    [Skip]            │
└─────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCESSING LAYER — CLAUDE API
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organiser clicks [Create Meeting Report]
              │
              ▼
Power Automate collects:
• Transcript text (from SharePoint — if available)
• Additional text (from Card 1 text box)
• Supporting files (from SharePoint upload folder)
• Meeting metadata: name, date, attendees, type
              │
              ▼
Sent to Claude API with Meeting Intelligence
Processor skill prompt (see Section 7.2)
              │
              ▼
Claude generates structured report:
• Meeting summary
• Key decisions made
• Action items with owners and dates
• Follow-up scheduled (if mentioned)
• Commercial signals (if client meeting)
• Salesforce update fields (if applicable)
• Minutes of Meeting (formatted for email)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REVIEW LAYER — CARD 2
(Sent as new Teams direct message)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────────────────────┐
│ ✅ Meeting Report Generated                  │
│                                              │
│ [Structured report displayed — key sections] │
│ • Summary                                    │
│ • Decisions                                  │
│ • Action items                               │
│ • Commercial signals (if applicable)         │
│                                              │
│ [View full report → SharePoint link]         │
│                                              │
│ Anything to add? Claude will add it          │
│ without changing the rest of the report:     │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│ [Add to Report]                              │
│                                              │
│ Ready? Choose what to do:                    │
│ [✅ Save Privately]                          │
│ [📤 Approve + Send to Attendees]             │
│ [💾 Approve + Push to Salesforce]            │
│ [📤💾 Approve + Send + Push to Salesforce]   │
└─────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REFINEMENT LOOP (if organiser adds more)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organiser adds text → clicks [Add to Report]
              │
              ▼
Power Automate sends to Claude API:
"Existing report: [report]
Additional information to incorporate: [new text]
Add this as Additional Notes section.
Do not change the existing report content."
              │
              ▼
Updated report returned
New Card 3 sent with updated version
Organiser reviews updated report
Chooses output option
Loop repeats until organiser approves

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT LAYER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OUTPUT A — Always (regardless of choice):
• Report saved to SharePoint
• Folder: /Meetings/[YYYY-MM-DD]-[MeetingName]/
• Includes: transcript, notes, final report
• Accessible and downloadable any time

OUTPUT B — If "Send to Attendees" chosen:
• MoM email sent via Outlook to meeting attendees
• Summary posted to Teams meeting chat thread
• Action items highlighted in email

OUTPUT C — If "Push to Salesforce" chosen:
• Salesforce Activity record created automatically
• Linked to Account and Opportunity
• Action item Tasks created with owners
• Renewal flags, risk flags, opportunity signals logged

```

---

## 6. Technology Architecture

### 6.1 Technology Stack — All Existing at Spectrum.Life

| Component | Technology | Role in Workflow |
|-----------|-----------|-----------------|
| **Meeting platform** | Microsoft Teams | Meeting hosting, transcription |
| **Calendar** | Outlook / Microsoft 365 | Meeting scheduling, trigger source |
| **Transcript storage** | SharePoint | Transcript and file storage |
| **Workflow automation** | Power Automate | Trigger detection, orchestration, card delivery |
| **Notification UI** | Teams Adaptive Cards | Interactive input cards in Teams |
| **AI processing** | Claude API (Anthropic) | Structured report generation |
| **CRM** | Salesforce | Activity records, opportunity flags, tasks |
| **Email distribution** | Outlook | MoM delivery to attendees |
| **Document storage** | SharePoint | Final report archiving |

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
┌─────────────────────────────────────────┐
│           POWER AUTOMATE                │
│  (Orchestration Layer)                  │
│  • Detects meeting end via Graph API    │
│  • Checks transcript availability       │
│  • Sends Adaptive Cards in Teams        │
│  • Calls Claude API                     │
│  • Routes outputs to destinations       │
└──────────┬──────────────────┬───────────┘
           │                  │
           ▼                  ▼
┌──────────────┐    ┌─────────────────────┐
│ Claude API   │    │  Teams Adaptive     │
│ (Anthropic)  │    │  Cards              │
│              │    │  (Notification +    │
│ Generates    │    │   Input UI)         │
│ structured   │    │                     │
│ report       │    └─────────────────────┘
└──────────────┘
           │
     Human Approval
           │
    ┌──────┼──────────┐
    ▼      ▼          ▼
SharePoint Salesforce Outlook
(Archive) (CRM       (MoM
          Update)    Email)
```

### 6.3 Claude API — The Intelligence Layer

Claude receives all input and generates the structured report using the **Meeting Intelligence Processor skill** — a governed prompt that:

- Identifies the meeting type (client / internal / partner / clinical)
- Extracts key decisions, action items and follow-up dates
- Flags commercial signals (renewal, upgrade, risk, Cara interest)
- Generates Salesforce-ready Activity fields
- Produces a formatted MoM suitable for email distribution

**Refinement prompt (additive only):**
When the organiser adds missing information after draft review — Claude appends it as Additional Notes without modifying the existing report content. This preserves the original structured output while enriching it with additional context.

---

## 7. Functional Requirements

### 7.1 Trigger Requirements

| ID | Requirement | Priority |
|----|-------------|---------|
| TR-01 | System must detect when a Microsoft Teams calendar meeting has ended via Microsoft Graph API | Must Have |
| TR-02 | System must check SharePoint for a transcript file within 15 minutes of meeting end | Must Have |
| TR-03 | System must send notification card to meeting organiser regardless of transcript availability | Must Have |
| TR-04 | System must identify meeting type from calendar event title or metadata | Should Have |
| TR-05 | System must not trigger for meetings marked as private in calendar | Must Have |

### 7.2 Notification Card Requirements (Card 1)

| ID | Requirement | Priority |
|----|-------------|---------|
| NC-01 | Card must display meeting name, date and duration | Must Have |
| NC-02 | Card must show a Claude-generated summary of key points if transcript available | Must Have |
| NC-03 | Card must provide a link to the full transcript in SharePoint | Must Have |
| NC-04 | Card must show text input field for additional notes in both paths | Must Have |
| NC-05 | Card must provide a SharePoint upload link for supporting documents and images | Must Have |
| NC-06 | Card must include [Create Meeting Report] and [Skip] buttons | Must Have |
| NC-07 | Card must be delivered as a direct Teams message to the organiser only | Must Have |
| NC-08 | Card must display appropriately on both Teams desktop and mobile | Should Have |

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
| CP-09 | System must handle transcripts longer than 10,000 words via chunking | Must Have |

### 7.4 Review and Approval Requirements (Card 2+)

| ID | Requirement | Priority |
|----|-------------|---------|
| RA-01 | Card must display a summary of the generated report | Must Have |
| RA-02 | Card must provide a link to the full report in SharePoint | Must Have |
| RA-03 | Card must include a text input for additional information | Must Have |
| RA-04 | Card must include [Add to Report] button for refinement | Must Have |
| RA-05 | Card must include four output choice buttons | Must Have |
| RA-06 | System must send a new card when report is updated with additions | Must Have |
| RA-07 | Refinement loop must support minimum three iterations | Should Have |
| RA-08 | System must not distribute any output without explicit organiser approval | Must Have |

### 7.5 Output Requirements

| ID | Requirement | Priority |
|----|-------------|---------|
| OP-01 | Final report must always be saved to SharePoint regardless of distribution choice | Must Have |
| OP-02 | SharePoint folder must be named: /Meetings/[YYYY-MM-DD]-[MeetingName]/ | Must Have |
| OP-03 | SharePoint folder must contain: transcript, notes, supporting files and final report | Must Have |
| OP-04 | If Send to Attendees chosen — MoM email must be sent to all meeting attendees | Must Have |
| OP-05 | If Send to Attendees chosen — summary must be posted to Teams meeting chat | Should Have |
| OP-06 | If Push to Salesforce chosen — Activity record must be created in Salesforce | Must Have |
| OP-07 | Salesforce Activity must be linked to the relevant Account and Opportunity | Must Have |
| OP-08 | Action items must create Salesforce Tasks with owner and due date fields | Should Have |

---

## 8. Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Notification card must be delivered within 5 minutes of meeting end | < 5 minutes |
| NFR-02 | Claude processing time from submission to report display | < 30 seconds |
| NFR-03 | System must operate 24/7 across all time zones | 99.5% uptime |
| NFR-04 | All meeting content must remain within Microsoft 365 tenant boundary | Mandatory |
| NFR-05 | Claude API must not store or train on meeting content | Mandatory |
| NFR-06 | SharePoint storage must comply with Spectrum.Life data retention policy | Mandatory |
| NFR-07 | GDPR — clinical meeting content must be handled as special category data | Mandatory |
| NFR-08 | Salesforce connector must use existing authenticated credentials only | Mandatory |
| NFR-09 | System must handle concurrent meetings from multiple organisers | Must Handle |
| NFR-10 | Power Automate flow must not exceed Microsoft 365 run limits | Monitor monthly |

---

## 9. User Scenarios

### Scenario 1 — Commercial Account Manager: Client Meeting With Transcript

**Context:** An account manager has just finished a 45-minute review call with Laya Healthcare. Teams automatically transcribed the call. The organiser is based in Dublin.

**Workflow:**
- 5 minutes after call ends, Teams DM arrives with transcript summary
- Key points show: ADHD expansion interest, September renewal, contact change
- Organiser adds: *"Sarah confirmed she is moving roles in June — needs immediate stakeholder introduction"*
- Clicks Create Meeting Report
- Claude generates structured report including Cara opportunity flag and urgent contact change flag
- Organiser reviews — adds: *"Also discussed potential expansion to Northern Ireland employees"*
- Clicks Add to Report — Claude appends as Additional Notes
- Organiser clicks Approve + Send + Push to Salesforce
- MoM sent to Sarah Murphy and internal team
- Salesforce Activity created with renewal flag and URGENT contact change task
- Report saved to SharePoint tagged to meeting

**Time taken:** 4 minutes total. Previous approach: 15 minutes of formatting — if it happened at all.

---

### Scenario 2 — Commercial Team: External Meeting Without Transcript

**Context:** A commercial team member attended an in-person meeting with a prospective broker in London. No Teams meeting — no transcript.

**Workflow:**
- Meeting organiser manually triggers the workflow from Power Automate (or via a saved Teams workflow button)
- Card shows text input only — no transcript path
- Organiser types rough notes: *"Met with large London broker — 12 corporate clients interested in EAP. Strong interest in reporting and analytics. Follow up in 10 days."*
- Uploads photo of handwritten notes from notebook to SharePoint link
- Clicks Create Meeting Report
- Claude generates structured report from notes and image context
- Organiser reviews, approves, saves privately
- Report saved to SharePoint for personal reference

---

### Scenario 3 — Clinical Team: Internal Meeting With Transcript

**Context:** The clinical leadership team had a 30-minute internal quality review meeting in Teams. Transcript was generated.

**Workflow:**
- Notification card arrives with transcript summary
- No commercial signals — meeting type identified as internal clinical
- Organiser adds agenda items discussed not captured in transcript
- Clicks Create Meeting Report
- Claude generates internal meeting record: decisions, action items, clinical governance notes
- Organiser clicks Save Privately — not sent to Salesforce
- Report saved to SharePoint for team reference

---

### Scenario 4 — Australia Team: Post-Acquisition Integration Call

**Context:** A team member in Sydney just finished an onboarding call with MindFit at Work clients. Teams meeting, transcript available.

**Workflow:**
- Same workflow activates — works across all locations and time zones
- Claude detects Australia context from meeting metadata
- Report includes platform migration timeline discussion and Cara future interest flag
- Organiser pushes to Salesforce — Australian client record updated
- MoM sent to MindFit attendees

---

## 10. Phased Delivery Roadmap

### Phase 1 — Claude Skill (Now — Available Today)

**What:** The Meeting Intelligence Processor skill — the Claude prompt that structures meeting notes into the three-output report.

**How:** Used manually — organiser pastes notes or transcript into Claude and types the trigger phrase.

**Value:** Removes formatting friction. CRM updates take 2 minutes not 15. Consistently structured output. Commercial signals captured.

**Limitation:** Does not solve the forgetting problem. Depends on human to initiate.

**Effort:** Complete — skill built and documented.

---

### Phase 2 — Power Automate + Teams Adaptive Cards (Month 1-2)

**What:** Full automated workflow — calendar trigger, transcript detection, notification cards, Claude API integration, SharePoint storage.

**How:** Power Automate flow built by IT developer using existing Microsoft 365 connectors. Claude API called via HTTP action.

**Value:** Removes the forgetting problem — organiser is notified automatically after every meeting. Transcript used where available. Manual notes path for non-Teams meetings.

**Limitation:** File attachments via SharePoint link — not inline card upload. Full transcript shown via link — summary only in card.

**Effort:** 2-3 weeks development. Requires Power Automate premium connector for Salesforce.

---

### Phase 3 — Salesforce Agentforce Integration (Month 3-4)

**What:** Agentforce agent automatically creates Salesforce records — no manual paste required. Action item Tasks auto-assigned. Pipeline reports generated from accumulated data.

**How:** Agentforce use case defined. Salesforce flows triggered by Power Automate output.

**Value:** Full CRM automation. Salesforce utilisation moves from 30% toward 100%. Pipeline intelligence reliable for leadership decisions.

**Effort:** Depends on Agentforce implementation timeline. Requires Agentforce licencing and configuration.

---

### Phase 4 — Custom Teams App (Future)

**What:** A proper custom Teams tab application with inline file upload, full transcript display, real-time card updates and richer UI.

**How:** Custom Teams app built by development team using Microsoft Teams App Framework.

**Value:** Full experience as originally designed — inline attachment, real-time card refresh, polished UI.

**Effort:** 4-6 weeks development. Recommended only after Phase 2 and 3 are validated.

---

## 11. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Transcript not available for external meetings | High | Medium | Manual notes path handles this gracefully |
| Team members skip the notification card | Medium | High | Process norm established by leadership — Phase 2 includes usage tracking |
| Claude API token limits for long transcripts | Medium | Medium | Chunking logic built into Power Automate flow — transcripts split before sending |
| Salesforce connector requires premium license | Low | Low | Power Automate premium connector cost — confirm with IT before Phase 2 |
| GDPR — clinical meeting content | Medium | High | Clinical meetings treated as special category — separate SharePoint folder with restricted access |
| Card not auto-updating after refinement | Certain | Low | New card sent for each refinement iteration — minor UX difference, not a blocker |
| Teams admin policy blocking automation | Low | High | Early engagement with IT admin required — confirm Graph API permissions before build |
| Adoption — team members not using the workflow | Medium | High | Change management programme — managers reinforce usage norm |

---

## 12. Success Metrics

### 12.1 Phase 1 Metrics (Skill — Manual)

| Metric | Baseline | Target | Measure |
|--------|---------|--------|---------|
| Time to complete CRM update | 15 minutes | 2 minutes | Self-reported |
| Consistency of CRM record format | Low | High | Salesforce field completion rate |
| Commercial signals captured | Ad-hoc | Systematic | Renewal flags logged in Salesforce |

### 12.2 Phase 2 Metrics (Automated Workflow)

| Metric | Baseline | Target | Measure |
|--------|---------|--------|---------|
| Salesforce utilisation | ~30% | >70% | Salesforce activity records created per week |
| Meeting report completion rate | <20% | >80% | Cards completed vs meetings held |
| MoM distribution | Rare | Every client meeting | Outlook tracking |
| Time from meeting end to record update | Days | Same day | Salesforce activity timestamp vs meeting end |

### 12.3 Phase 3 Metrics (Agentforce)

| Metric | Baseline | Target | Measure |
|--------|---------|--------|---------|
| Salesforce utilisation | >70% | >95% | Salesforce activity records |
| Pipeline report accuracy | Low | High | Leadership satisfaction score |
| Renewal risk visibility | Reactive | Proactive | Renewals identified 90+ days before date |

---

## 13. Assumptions and Dependencies

### Assumptions

| # | Assumption |
|---|-----------|
| A1 | Spectrum.Life has an active Microsoft 365 licence covering Teams, SharePoint, Outlook and Power Automate |
| A2 | IT admin can enable auto-transcription policy for all Teams meetings or specific meeting types |
| A3 | Power Automate premium connectors can be licenced for Salesforce integration |
| A4 | Anthropic Claude API access is available with sufficient rate limits for the expected meeting volume |
| A5 | Salesforce records have consistent Account naming to allow automated record matching |
| A6 | Meeting organiser is always a Spectrum.Life Microsoft 365 user |
| A7 | Teams and Outlook are used for all internal and most external meetings |

### Dependencies

| # | Dependency | Owner | Risk if Missing |
|---|-----------|-------|----------------|
| D1 | Microsoft Graph API access for calendar and transcript triggers | IT Admin | Trigger layer cannot function |
| D2 | SharePoint folder structure defined and access permissions set | BA + IT | Storage layer cannot function |
| D3 | Claude API key and rate limit confirmed | Stephen/Tech Team | Processing layer cannot function |
| D4 | Salesforce Account naming convention documented | Commercial Team | CRM matching will fail |
| D5 | Power Automate premium licence for Salesforce connector | IT/Finance | Phase 2 Salesforce output blocked |
| D6 | Meeting organiser identity available in Graph API event | IT | Notification cannot be directed correctly |

---

## 14. Glossary

| Term | Definition |
|------|-----------|
| **Adaptive Card** | Interactive UI component in Microsoft Teams — displays information and accepts user input |
| **Agentforce** | Salesforce's AI agent platform — automates CRM actions and workflows |
| **Claude API** | Anthropic's API for programmatic access to Claude AI models |
| **Graph API** | Microsoft's API for accessing Microsoft 365 data including Teams, Calendar and SharePoint |
| **Meeting Intelligence Processor** | The Claude skill (prompt) that converts meeting inputs into structured three-output reports |
| **MoM** | Minutes of Meeting — structured summary sent to meeting attendees after the meeting |
| **Power Automate** | Microsoft's workflow automation platform — connects apps and services in Microsoft 365 |
| **Refinement Loop** | The iterative process where the organiser adds missing information and Claude appends it to the existing report without regenerating |
| **SharePoint** | Microsoft's document storage and collaboration platform — used for transcript and report storage |
| **Transcript** | Automatic text conversion of spoken meeting dialogue generated by Microsoft Teams |
| **VTT format** | WebVTT — the file format Teams uses to export transcripts (includes timestamps and speaker labels) |

---

## Appendix A — Meeting Intelligence Processor Skill

The Claude prompt used in the Power Automate workflow is governed by the Meeting Intelligence Processor skill — defined separately in the Spectrum.Life AI Skills Library.

**Repository:** github.com/Naveenraov/ba-digitalhealth-skills-library
**Location:** `/sales-ops/meeting-intelligence-processor-v1.0.md`
**Trigger:** `Meeting: [paste transcript or notes]`

The skill produces three structured outputs:
1. **Meeting Record** — structured reference document tagged to the meeting
2. **Salesforce Activity Update** — paste-ready CRM fields with commercial signals flagged
3. **Minutes of Meeting** — formatted for email distribution to attendees

---

## Appendix B — Related Projects

| Project | Relationship |
|---------|-------------|
| Project D — Operations Automation Opportunity Map | This workflow addresses the CRM and meeting intelligence automation opportunities identified in Project D |
| Project G — Agentforce Use Case Discovery | Phase 3 of this workflow connects to the Agentforce use cases defined in Project G |
| ba-digitalhealth-skills-library / sales-ops | The Meeting Intelligence Processor skill that powers this workflow |

---

*Meeting Intelligence Workflow — BA Automation Project*
*Naveen Rao V | AI Transformation Business Analyst | Dublin, Ireland*
*April 2026 | Spectrum.Life AI Transformation Portfolio*
*GitHub: github.com/Naveenraov/ai-transformation-ba-wellbeing-platform*
