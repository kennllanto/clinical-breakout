// The Vasoactive Gauntlet — default game content.
// Source: "Inotropes and Vasopressor Game" design doc.
//
// Data model:
//   Game  -> { title, subtitle, briefing, lives, levels[] }
//   Level -> { id, title, narrative, locks[] }
//   Lock  -> { id, label, vignette, codes[], rationale, bonus? }
//
// codes[] holds every accepted answer for a lock. Matching is
// case/space/punctuation-insensitive (see lib/match.js).

export const DEFAULT_GAME = {
  title: 'The Vasoactive Gauntlet',
  subtitle: 'Critical Care Breakout · Inotropes & Vasopressors',
  lives: 3,
  briefing: `Welcome to the Vasoactive Gauntlet. You and your colleagues are a cohesive ICU team managing a single, highly dynamic patient: Mr. Liam Walker, 68, post-emergency laparotomy for a perforated diverticulum.

Guide him safely through profound post-operative hypotension, worsening septic shock, and secondary myocardial failure by matching his changing physiology to the most appropriate inotropes and vasopressors used in Australian clinical practice.

Decode all 10 clinical locks across 4 escalating levels to "break out" of the gauntlet. Guesswork is a patient-safety risk — sound clinical rationale is your only key.

You share 3 Team Lives. A wrong code OR a failed clinical rationale costs 1 life, the active sub-cohort tags out, and a fresh sub-cohort takes over the same lock. Lose all 3 lives and the team takes a mandatory study break before lives are reset.`,
  // Timer phases, in seconds (visible countdowns; non-blocking).
  timers: { crack: 120, sbar: 180, timeout: 180 },
  levels: [
    {
      id: 'L1',
      title: 'Level 1 — Post-Op Stabilization & Peripheral Access',
      narrative: `Mr. Liam Walker, 68, arrives from theatre after a complex emergency laparotomy for a perforated diverticulum. He is intubated and sedated, with a left radial arterial line and two large-bore peripheral IV lines (PIVCs). A central line (CVAD) is being prepped.`,
      locks: [
        {
          id: '1.1',
          label: 'Lock 1.1 — The First-Line Choice',
          vignette: `Mr. Walker's blood pressure begins to slide: BP 88/44 mmHg, MAP 58 mmHg, HR 98 bpm (sinus rhythm). Fluid balance shows he is already +3 L from theatre. While the medical team prepares to insert the CVAD, what is the most appropriate first-line vasoactive medication to rapidly stabilize his MAP via a peripheral line?`,
          codes: ['METARAMINOL', 'MINOL'],
          rationale: `In Australian intensive care practice, metaraminol is widely accepted and protocolised for peripheral administration to correct short-term or transitional hypotension (Hunter et al., 2022). As a synthetic amine acting primarily as a direct and indirect α1-adrenergic receptor agonist, it rapidly increases systemic vascular resistance (SVR) without the high localized tissue-injury risk of peripheral high-dose noradrenaline.`,
        },
        {
          id: '1.2',
          label: 'Lock 1.2 — Receptor Mapping',
          vignette: `The team prepares a Noradrenaline infusion (6 mg in 50 mL) to start once the CVAD is in. Which specific receptor type does Noradrenaline primarily target to squeeze the blood vessels and correct a low MAP?`,
          codes: ['ALPHA-1', 'A1', 'ALPHA1'],
          rationale: `Noradrenaline is a potent endogenous catecholamine with powerful agonist activity on α1-adrenergic receptors, alongside moderate β1 effects (Bangash et al., 2012). Stimulating α1 receptors on vascular smooth muscle releases intracellular calcium, producing robust vasoconstriction that directly raises SVR and blood pressure.`,
        },
        {
          id: '1.3',
          label: 'Lock 1.3 — Extravasation Emergency',
          vignette: `While waiting for the CVAD, the peripheral line running the emergency metaraminol begins to swell, blanch, and feel cold to the touch. The nurse suspects extravasation. What is the immediate, non-pharmacological first action?`,
          codes: ['STOP-INFUSION', 'STOP INFUSION', 'STOP THE INFUSION'],
          rationale: `Vasoactive extravasation causes profound localized vasoconstriction and ischaemic tissue necrosis. The immediate nursing priority is to stop the infusion instantly to prevent further exposure, leave the cannula in place to aspirate residual drug, then follow local guidelines for alpha-antagonist infiltration (e.g., phentolamine) if indicated (Hunter et al., 2022).`,
        },
        {
          id: '1.4',
          label: 'Lock 1.4 — Titration Parameters',
          vignette: `The CVAD is placed and Noradrenaline runs at 4 mL/hr (0.08 mcg/kg/min). Per surviving-sepsis guidelines widely applied in Australia, what is the standard minimum target MAP (mmHg) the nurse should titrate to?`,
          codes: ['65', '65MMHG', '65 MMHG'],
          rationale: `Large trials and consensus guidelines confirm that targeting a minimum MAP of 65 mmHg provides adequate organ-perfusion pressure in most distributive shock states while minimizing catecholamine toxicity, tachycardia, and excess myocardial oxygen consumption (Westphal, n.d.).`,
        },
      ],
    },
    {
      id: 'L2',
      title: 'Level 2 — Evolving Septic Shock & Multimodal Support',
      narrative: `It is now 06:00. Mr. Walker worsens. Temp 38.9 °C, urine output down to 15 mL/hr, arterial lactate risen from 1.2 to 4.1 mmol/L. Noradrenaline has been rapidly titrated up and now runs at a high dose of 22 mL/hr (0.44 mcg/kg/min). MAP is still dangerously low at 59 mmHg.`,
      locks: [
        {
          id: '2.1',
          label: 'Lock 2.1 — The Second-Line Vasopressor',
          vignette: `To achieve a synergistic effect and optimize SVR without escalating noradrenaline into an arrhythmogenic range, what second-line vasopressor agent is standard in Australia to add next?`,
          codes: ['VASOPRESSIN', 'ADOX'],
          rationale: `With refractory hypotension despite high-dose noradrenaline, adding vasopressin is the gold standard. It restores vascular tone via V1 receptors on vascular smooth muscle, bypassing the catecholamine pathway entirely (Bangash et al., 2012). Crucially, acidosis downregulates adrenergic receptors, whereas vasopressin retains its vasoconstrictive potency in acidotic environments.`,
        },
        {
          id: '2.2',
          label: 'Lock 2.2 — The Metabolic Side Effect',
          vignette: `Due to a vasopressin stock issue the team instead adds a low-dose Adrenaline infusion. As you titrate it, you note a steep, progressive rise in arterial lactate despite a stable blood pressure. What phenomenon explains this specific metabolic change?`,
          codes: ['BETA-2-GLYCOLYSIS', 'BETA 2 GLYCOLYSIS', 'HYPERLACTATEMIA', 'HYPERLACTATAEMIA'],
          rationale: `Adrenaline has strong β2-adrenergic activity. Stimulating β2 receptors accelerates skeletal-muscle aerobic glycolysis, producing pyruvate faster than mitochondria can clear it (Bangash et al., 2012). The resulting rise in systemic lactate is unrelated to tissue hypoxia or anaerobic metabolism — a distinction advanced beginners must recognise so they don't misread it as worsening hypoperfusion.`,
        },
        {
          id: '2.3',
          label: 'Lock 2.3 — The Safe Syringe Swap',
          vignette: `The high-dose Noradrenaline syringe driver alarms "Low Volume." Because noradrenaline has a plasma half-life of only 1–2 minutes, a stop-and-start swap introduces a dangerous drug holiday and rapid vascular collapse. What specific, evidence-based nursing technique transitions to the new syringe without interrupting delivery?`,
          codes: ['CHANGEOVER', 'DOUBLE-PUMP', 'DOUBLE PUMP', 'SMOOTH CHANGEOVER'],
          rationale: `Given the 1–2 minute half-life, a standard swap causes immediate receptor vacancy. The team must use the simultaneous (double-pump) changeover technique: prime the new syringe to the manifold, start the new pump at a baseline/crossover rate while the old pump still runs, and cross-taper over a 5–10 minute window for a seamless, steady-state plasma concentration (Manias et al., 2021).`,
        },
      ],
    },
    {
      id: 'L3',
      title: 'Level 3 — Sepsis-Induced Myocardial Dysfunction',
      narrative: `SVR has stabilized with vasopressors, but an updated echo reveals a new problem: LVEF has dropped to 30% (sepsis-induced myocardial dysfunction). ScvO₂ is low at 52%, cardiac index is poor at 1.8 L/min/m², and he remains cool peripherally despite a MAP of 66 mmHg on Noradrenaline.`,
      locks: [
        {
          id: '3.1',
          label: 'Lock 3.1 — The Inotropic Addition',
          vignette: `The intensivist wants an inotrope that targets β1 receptors to improve myocardial contractility and stroke volume, without causing systemic vasoconstriction. What is the standard first-choice inotrope for this scenario?`,
          codes: ['DOBUTAMINE'],
          rationale: `Dobutamine is a synthetic catecholamine with predominant β1-adrenergic activity — the premier choice for acute heart failure and sepsis-induced myocardial depression (Bistola et al., 2019). It enhances contractility (inotropy) and heart rate (chronotropy), improving cardiac output and oxygen delivery, reflected by a rising ScvO₂.`,
        },
        {
          id: '3.2',
          label: 'Lock 3.2 — Compounding Adverse Effects',
          vignette: `Shortly after Dobutamine starts at 5 mcg/kg/min, the monitor alarms. HR shoots from 92 to 134 bpm and the rhythm changes to atrial fibrillation with rapid ventricular response. What intrinsic pharmacological property of β1 agonists causes this adverse event?`,
          codes: ['TACHYARRHYTHMIA', 'CHRONOTROPY', 'POSITIVE CHRONOTROPY'],
          rationale: `A major limiting factor of catecholamine inotropes like dobutamine is their potent positive chronotropic effect and tendency to cause arrhythmias (Bistola et al., 2019). β1 activation speeds sinoatrial firing and accelerates AV-nodal conduction, frequently provoking tachyarrhythmias such as AF, which compromise diastolic filling time and worsen myocardial ischaemia.`,
        },
      ],
    },
    {
      id: 'L4',
      title: 'Level 4 — Refractory Shock & Advanced Pharmacology',
      narrative: `Dobutamine was ceased due to severe tachyarrhythmia. It is now Day 2. On maximum Noradrenaline and Vasopressin, MAP remains stuck at 54 mmHg. The heart pumps well, but the blood vessels are paralyzed — wide open and unresponsive to massive catecholamines. As a last resort the consultant orders Methylene Blue (2 mg/kg IV bolus over 20 min).`,
      locks: [
        {
          id: '4.1',
          label: 'Lock 4.1 — Reversing the Vasoplegia',
          vignette: `Looking at the big picture of what this rescue drug is doing for Mr. Walker's circulation — when standard vasopressors have completely lost effect because the vessels are paralyzed — what is Methylene Blue's primary 'rescue job' for his systemic circulation?`,
          codes: ['REVERSES-VASOPLEGIA', 'REVERSE VASOPLEGIA', 'REVERSES VASOPLEGIA', 'RESTORES-TONE', 'RESTORE TONE', 'RESTORES VASCULAR TONE'],
          rationale: `Methylene Blue is a circuit-breaker for vasoplegia (paralyzed vascular tone). Sepsis overproduces Nitric Oxide, signalling vessels to dilate completely and ignore vasopressors. Methylene Blue shuts down that downstream dilation signal inside the cell, reversing the vasoplegia and restoring vascular tone (Ibarra-Estrada et al., 2024). This restores sensitivity to the noradrenaline already running, allowing the MAP to rise.`,
          bonus: `Bonus artifact check: because it is a dark dye, Methylene Blue temporarily alters light absorption at the pulse oximeter, causing a false, harmless drop in SpO₂ (down to ~85%) that peaks within minutes and self-resolves.`,
        },
      ],
    },
  ],
}
