// Unlock Me If You Can: The Vasoactive Breakout — default game content.
// Source: "Unlock Me if You Can: The Vasoactive Breakout" design doc.
//
// Data model:
//   Game  -> { title, subtitle, briefing, objectives[], lives, timers, levels[] }
//   Level -> { id, title, narrative, locks[] }
//   Lock  -> { id, label, vignette, codes[], rationale, bonus? }
//
// codes[] holds every accepted answer for a lock. Matching is
// case/space/punctuation-insensitive (see lib/match.js).

export const DEFAULT_GAME = {
  title: 'Unlock Me If You Can: The Vasoactive Breakout',
  subtitle: 'Inotropes & Vasopressors in Critical Care',
  lives: 3,
  objectives: [
    'Determine the appropriate vasoactive agent (inotrope or vasopressor) in relation to the clinical vignette provided.',
    'Discuss the pathophysiological effects of vasoactive agents in relation to the clinical vignette.',
    'Demonstrate safe management and care of patients requiring vasoactive agents.',
    'Recognise complications related to vasoactive agents.',
  ],
  briefing: `Welcome to Unlock Me If You Can: The Vasoactive Breakout. Today you will all work as a team to manage a single, highly dynamic patient case: Mrs. Ina Pressor, who presented to ICU post-emergency laparotomy secondary to a perforated diverticulum.

Your mission is to guide her safely throughout her ICU journey as each problem occurs, by matching her changing physiology to the most appropriate inotropes and/or vasopressors.

Stabilize Ina by decoding all 10 clinical locks across 4 escalating levels of difficulty to "break out." You must also defend your answer — why your team chose that clinical pathway. A sound clinical rationale is your only key to the lock.

You have 3 team lives. Crack each lock's code within 2 minutes, then give a short explanation (max 3 minutes). A wrong answer costs a life, and another sub-group chosen by the team attempts the lock. Lose all 3 lives and the team takes a 3-minute "Clinical Consultation Delay" to regroup before the facilitator resets your lives.`,
  // Timer phases, in seconds (visible countdowns; non-blocking).
  timers: { crack: 120, sbar: 180, timeout: 180 },
  levels: [
    {
      id: 'L1',
      title: 'Level 1 — Post-Op Stabilization',
      narrative: `You are looking after Mrs. Ina Pressor, a 68-year-old admitted post-op after a complex emergency laparotomy for a perforated diverticulum. She arrives from theatre intubated and sedated with a left radial arterial line and two large-bore peripheral IV lines (PIVCs). A decision to place a central line (CVAD) was made by the ICU team and is currently being prepped.`,
      locks: [
        {
          id: '1.1',
          label: 'Lock 1.1 — The First-Line Choice',
          vignette: `Ina's blood pressure begins to slide: BP 88/44 mmHg, MAP 58, HR 98 (sinus). Fluid balance shows she is already +3 L from theatre. While the ICU team prepares to insert the CVAD, what is the most appropriate first-line vasoactive medication to stabilize her MAP?`,
          codes: ['METARAMINOL', 'MINOL'],
          rationale: `Metaraminol is widely accepted and protocolised for peripheral administration to correct short-term or transitional hypotension (Hunter et al., 2022). As a synthetic amine acting primarily as a direct and indirect α1-adrenergic receptor agonist, it rapidly increases systemic vascular resistance (SVR) without the high localized tissue-injury risk associated with peripheral high-dose noradrenaline infusions.`,
        },
        {
          id: '1.2',
          label: 'Lock 1.2 — Receptor Mapping',
          vignette: `The ICU team decides to commence a Noradrenaline infusion to start immediately once the CVAD is in. Which specific receptor type does Noradrenaline primarily target to address the low MAP? And in your rationale explain what is its primary cellular mechanism.`,
          codes: ['ALPHA-1', 'A1', 'ALPHA1'],
          rationale: `Noradrenaline is a potent endogenous catecholamine with powerful agonist activity on α1-adrenergic receptors, alongside moderate β1 effects (Bangash et al., 2012). Stimulating α1 receptors on vascular smooth muscle activates an intracellular pathway that releases calcium, resulting in robust vasoconstriction, which directly raises SVR and blood pressure.`,
        },
        {
          id: '1.3',
          label: 'Lock 1.3 — Extravasation Emergency',
          vignette: `While waiting for the CVAD, you notice the peripheral line running the Metaraminol begins to swell, blanch, and feel cold to the touch. You suspect an extravasation. What is the immediate first action you must take?`,
          codes: ['STOP INFUSION', 'STOP THE INFUSION', 'STOP-INFUSION'],
          rationale: `Vasoactive extravasation causes profound localized vasoconstriction, leading to ischaemic tissue necrosis. The immediate nursing priority is to stop the infusion instantly to prevent further tissue exposure, leave the cannula in place to attempt aspiration of any residual drug, and then follow local guidelines for alpha-receptor antagonist infiltration (e.g., phentolamine) if indicated (Hunter et al., 2022).`,
        },
        {
          id: '1.4',
          label: 'Lock 1.4 — Titration Parameters',
          vignette: `The CVAD is successfully placed, and Noradrenaline is running at 5 mcg. According to the Surviving Sepsis guidelines, what is the target MAP you should titrate this infusion to maintain?`,
          codes: ['65', '65MMHG', '65 MMHG'],
          rationale: `Consensus guidelines confirm that targeting a minimum MAP of 65 mmHg provides adequate organ-perfusion pressure in the majority of distributive shock states while minimizing unnecessary catecholamine toxicity, tachycardia, and excessive myocardial oxygen consumption (Westphal, n.d.).`,
        },
      ],
    },
    {
      id: 'L2',
      title: 'Level 2 — Evolving Septic Shock & Multimodal Support',
      narrative: `It is now 06:00. Ina's condition worsens. Her temperature is 38.9 °C, urine output has dropped to 15 mL/hr, and her lactate has risen from 1.2 to 4.0 mmol/L. The Noradrenaline has been rapidly titrated upwards and is now running at 22 mcg. Her MAP is hovering at 59.`,
      locks: [
        {
          id: '2.1',
          label: 'Lock 2.1 — The Second-Line',
          vignette: `What second-line agent would you anticipate commencing for Ina given her situation?`,
          codes: ['VASOPRESSIN', 'AVP', 'ARGIPRESSIN'],
          rationale: `When a patient develops refractory hypotension despite high-dose noradrenaline, adding vasopressin is the gold standard. Vasopressin restores vascular tone by stimulating V1 receptors on vascular smooth muscle, bypassing the catecholamine pathway entirely (Bangash et al., 2012). This is especially useful because acidosis downregulates adrenergic receptors, whereas vasopressin retains its vasoconstrictive potency in acidotic environments. It also optimises SVR without escalating the noradrenaline dose into an arrhythmogenic range.`,
        },
        {
          id: '2.2',
          label: 'Lock 2.2 — The Metabolic Side Effect',
          vignette: `The MO decides to add a low-dose Adrenaline infusion instead. As you titrate the adrenaline, you note a progressive rise in Ina's lactate despite a stable blood pressure. What phenomenon explains this change?`,
          codes: ['BETA-2-GLYCOLYSIS', 'BETA 2 GLYCOLYSIS', 'HYPERLACTATEMIA', 'HYPERLACTATAEMIA'],
          rationale: `Adrenaline has strong β2-adrenergic agonist activity. Stimulating β2 receptors accelerates skeletal-muscle aerobic glycolysis, which produces pyruvate faster than the mitochondria can clear it (Bangash et al., 2012). This causes an increase in systemic lactate production that is unrelated to tissue hypoxia or anaerobic metabolism — a crucial distinction so it is not misinterpreted as worsening tissue hypoperfusion.`,
        },
        {
          id: '2.3',
          label: 'Lock 2.3 — The Safe Swap',
          vignette: `The pump delivering the high-dose Noradrenaline is alarming "Near End of Infusion". You also notice the line requires changing as it is nearing the 24-hour period. What technique will you perform to transition to the new infusion and line?`,
          codes: ['DOUBLE-PUMP', 'DOUBLE PUMP', 'CHANGEOVER', 'SMOOTH CHANGEOVER'],
          rationale: `Because of noradrenaline's 1–2 minute half-life, a standard stop-and-start swap causes immediate receptor vacancy. The team must utilise the simultaneous (double-pump) changeover technique: prime the new syringe up to the manifold, start the new pump at a baseline or calculated crossover rate while the old pump is still running, and carefully cross-taper over a 5–10 minute window to ensure a seamless, steady-state plasma concentration (Manias et al., 2021).`,
        },
      ],
    },
    {
      id: 'L3',
      title: 'Level 3 — Sepsis-Induced Myocardial Dysfunction',
      narrative: `Ina's blood pressure has stabilized with Noradrenaline and Vasopressin, but an updated echocardiogram reveals a new problem: her left ventricular ejection fraction (LVEF) has dropped to 30%. Her cardiac index is poor at 1.8 L/min/m², and she remains cool peripherally despite a MAP of 66.`,
      locks: [
        {
          id: '3.1',
          label: 'Lock 3.1 — The Inotropic Addition',
          vignette: `The ICU team wants to introduce another agent to address these issues. What agent would you anticipate being added in this scenario?`,
          codes: ['DOBUTAMINE'],
          rationale: `Dobutamine is a synthetic catecholamine with predominant β1-adrenergic receptor activity, making it the premier choice for acute heart failure and sepsis-induced myocardial depression (Bistola et al., 2019). It enhances myocardial contractility (inotropy) and increases heart rate (chronotropy), which improves overall cardiac output and tissue oxygen delivery.`,
        },
        {
          id: '3.2',
          label: 'Lock 3.2 — Compounding Adverse Effects',
          vignette: `Shortly after commencing the Dobutamine infusion at 5 mcg, Ina's heart rate shoots up from 92 to 134 bpm and the rhythm changes to atrial fibrillation. What intrinsic pharmacological property of β1 agonists causes this adverse event?`,
          codes: ['TACHYARRHYTHMIA', 'CHRONOTROPY', 'POSITIVE CHRONOTROPY'],
          rationale: `A major limiting factor of standard catecholamine-based inotropes like dobutamine is their potent positive chronotropic effect and tendency to cause arrhythmias (Bistola et al., 2019). β1 activation speeds up the sinoatrial node firing rate and accelerates atrioventricular nodal conduction, frequently provoking tachyarrhythmias like atrial fibrillation, which can compromise diastolic filling time and worsen myocardial ischaemia.`,
        },
      ],
    },
    {
      id: 'L4',
      title: 'Level 4 — Refractory Shock',
      narrative: `The Dobutamine had to be ceased due to the severe tachyarrhythmia. Ina remains in a state of low-cardiac-output septic shock. It is now Day 2. She is on maximum doses of Noradrenaline and Vasopressin, yet her MAP remains at 54. Her heart is pumping perfectly well, but her blood vessels are completely paralyzed — wide open and entirely unresponsive to Noradrenaline and Vasopressin. As a last resort, the ICU consultant orders an infusion of Methylene Blue.`,
      locks: [
        {
          id: '4.1',
          label: 'Lock 4.1 — Reversing the Vasoplegia',
          vignette: `Looking at the big clinical picture of what this rescue drug is actually doing for Ina's circulation — when standard vasopressors have completely lost their effect because the blood vessels are totally paralyzed — what is Methylene Blue's primary 'rescue job' or therapeutic action for her systemic circulation?`,
          codes: ['REVERSES-VASOPLEGIA', 'REVERSE VASOPLEGIA', 'REVERSES VASOPLEGIA', 'RESTORES-TONE', 'RESTORE TONE', 'RESTORES VASCULAR TONE'],
          rationale: `Methylene Blue acts as a circuit-breaker for vasoplegia (paralyzed vascular tone). Sepsis causes an overproduction of Nitric Oxide, which signals the blood vessels to dilate completely and ignore vasopressors. Methylene Blue shuts down that downstream dilation signal inside the cell, which reverses the vasoplegia and restores vascular tone (Ibarra-Estrada et al., 2024). This restores the patient's sensitivity to the Noradrenaline already running, allowing the MAP to rise.`,
          bonus: `Bonus artifact check: because it is a dark dye, Methylene Blue temporarily alters light absorption on the pulse oximeter, causing a false, harmless drop in SpO₂ (down to ~85%) that peaks within 10–15 minutes of delivery (Starship ICU Guidelines, 2025).`,
        },
      ],
    },
  ],
}
