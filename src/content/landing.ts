/**
 * All landing-page copy.
 *
 * Non-developers can edit this file without touching a single component.
 * Every claim here is traceable to the app repository — see the
 * "claim -> source" table in DISCOVERY.md.
 */

import type { LucideIcon } from 'lucide-react';
import {
  AlarmClock,
  BellRing,
  CalendarDays,
  Fingerprint,
  Flame,
  KeyRound,
  Lock,
  Power,
  Quote,
  ShieldCheck,
} from 'lucide-react';
import { siteConfig } from '../config/site';

export interface Step {
  readonly number: string;
  readonly title: string;
  readonly body: string;
  /** Which faithful interface recreation illustrates the step. */
  readonly visual: 'confirm' | 'power' | 'lock' | 'wake';
}

export const hero = {
  eyebrow: 'A commitment device for Windows',
  headline: ["Your PC won't let you", 'stay up.', "That's the point."],
  lede: 'SleepGuardian shuts your computer down at bedtime and keeps it down until morning.',
  primaryCta: 'Download for Windows',
  secondaryCta: 'See how it works',
  /** The countdown in the hero lock-overlay recreation. */
  countdown: { unlockLabel: 'Unlocks at', time: '05:00', until: 'until morning' },
} as const;

export const problem = {
  eyebrow: 'The problem',
  heading: 'You have set a bedtime before. You have meant it before.',
  paragraphs: [
    'Somewhere around midnight, "just one more thing" wins anyway. The alarm never fires because you set it for tomorrow. The reminder app gets swiped away in four seconds, and you go back to work feeling clever.',
    'The gap is rarely knowledge. It is that the version of you setting the rule and the version of you breaking it at 1 a.m. are not the same person. SleepGuardian is built for that gap. You decide once, while you are thinking clearly, and the machine holds the line later, when you are not.',
  ],
} as const;

export const howItWorks: {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lede: string;
  readonly steps: readonly Step[];
} = {
  eyebrow: 'How it works',
  heading: 'Four steps, then it takes over',
  lede: 'You set the rule once. From then on the enforcement runs as a Windows service, not as an app you can close.',
  steps: [
    {
      number: '01',
      title: 'Set your curfew',
      body: 'Pick a bedtime and a 7 or 8 hour window. Before anything is saved, a confirmation shows the start time, the derived wake time, and the length you chose — in both 12- and 24-hour form, with a moon or sun icon so an AM/PM slip is obvious while you can still fix it.',
      visual: 'confirm',
    },
    {
      number: '02',
      title: 'It shuts down',
      body: 'At curfew, a Windows service powers the machine off. No dialog to dismiss, no "remind me in ten minutes". The shutdown is forced, so unsaved work is your own problem to have sorted earlier.',
      visual: 'power',
    },
    {
      number: '03',
      title: 'It stays down',
      body: 'Switch the PC back on inside the curfew window and it boots straight into a full-screen lock counting down to your wake time. The lock cannot be closed, minimised, or ended from Task Manager.',
      visual: 'lock',
    },
    {
      number: '04',
      title: 'Wake on schedule',
      body: 'At your unlock time the lock lifts itself and the desktop comes back. That night is written to your history and your streak moves on.',
      visual: 'wake',
    },
  ],
};

export interface Feature {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body: string;
}

export const features: {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lede: string;
  readonly items: readonly Feature[];
} = {
  eyebrow: 'Features',
  heading: 'Everything that makes the rule stick',
  lede: 'Each one exists because a softer version of it already failed at 1 a.m.',
  items: [
    {
      icon: Power,
      title: 'Real shutdowns, not reminders',
      body: 'At curfew the machine actually powers off. There is no snooze button to hunt for, because there is nothing left running.',
    },
    {
      icon: CalendarDays,
      title: 'Confirm before you commit',
      body: 'Every schedule shows its full picture before saving: 12-hour and 24-hour time, a moon or sun icon, and the resulting wake time. Mistakes are caught while you can still correct them.',
    },
    {
      icon: AlarmClock,
      title: 'Earned weekly grace hour',
      body: 'One extra hour, once a week, earned when your streak target is seven days or more and your first night is on record. Not a shrug at the rules — a reward for having followed them.',
    },
    {
      icon: BellRing,
      title: 'Advance warnings',
      body: 'Tray notices at 30, 10, 5, 2 and 1 minutes out, then a full-screen countdown in the last minute. Its opacity is adjustable in Settings (30\u2013100%), and the final ten seconds are always fully opaque.',
    },
    {
      icon: CalendarDays,
      title: 'Schedules that fit a week',
      body: 'Every night, weekdays, weekends, a custom pick of days, or a single date for the one night you need the discipline.',
    },
    {
      icon: Flame,
      title: 'Streak tracking',
      body: 'Targets of 5, 10, 20 or 30 consecutive nights, or a custom number, with a calendar heatmap and an event log of every shutdown, boot attempt and unlock.',
    },
    {
      icon: KeyRound,
      title: 'Optional password',
      body: 'Set one and schedule changes, the grace hour, and exit actions all ask for it. Skip it if you are the only person at the keyboard.',
    },
    {
      icon: ShieldCheck,
      title: 'Resilient by design',
      body: 'Enforcement runs from a Windows service, backed by a per-minute watchdog. Closing the tray app, killing the process, or switching the service off does not end it — and if the service ever stops reporting, the lock says so rather than pretending nothing happened.',
    },
    {
      icon: Quote,
      title: 'Sleep quotes on the lock',
      body: 'The lock screen picks a different line from a bundled set of 25 on each appearance, so the screen you are stuck looking at has something to say.',
    },
    {
      icon: Lock,
      title: 'Blocks the easy escapes',
      body: 'During the lock, Task Manager and the Windows key shortcuts are disabled for your account, and your previous policy settings are restored the moment it lifts. Those writes usually need an elevated dashboard, and when they have not taken effect the lock names exactly which ones failed instead of implying the machine is sealed.',
    },
    {
      icon: Fingerprint,
      title: 'History you can read',
      body: 'One row per night with the curfew, the actual shutdown and unlock times, plus CSV and JSON export.',
    },
    {
      icon: ShieldCheck,
      title: 'Everything stays local',
      body: 'No account, no sync, no telemetry, no network calls. Your schedule and your history live in a local database on that machine only.',
    },
  ],
};

export const graceHour = {
  eyebrow: 'The weekly grace hour',
  heading: 'One extra hour a week, once you have earned it',
  lede: 'A rule with no escape hatch is a rule you disable. This is the deliberate, small hole in the wall — and it is gated.',
  rules: [
    {
      label: 'One hour, not a standing exemption',
      body: 'Spending the pass extends the relevant curfew by a single hour. It does not disable enforcement, and it does not carry over.',
    },
    {
      label: 'Once per calendar week',
      body: 'The week starts on Monday. One pass per week, and it does not accumulate.',
    },
    {
      label: 'A 7-day target — and a finished first night',
      body: 'Eligibility takes two halves, both checked inside the service: the streak target you configured must be seven days or more, and a first compliant night must actually be on record. So the pass is never available on the day you first set a curfew — it appears from the second day onward — and a five-day target never unlocks it at all.',
    },
    {
      label: 'A night you use it on is neutral',
      body: 'It neither advances nor breaks your streak. It is a pause, not a reward and not a penalty.',
    },
    {
      label: 'Password only if you set one',
      body: 'If an admin password exists, using the pass asks for it. If you never set one, there is nothing to authorise against, so no prompt appears.',
    },
    {
      label: 'Usable from the lock screen',
      body: 'You can spend it in the hour before curfew, or at any point while the lock is up. The unlock panel gives you 60 seconds to type, and the machine shuts down if you do not.',
    },
  ] as const,
  footnote:
    'If no pass is available the lock does not dangle one in front of you — it says exactly why (target too small, first night not yet on record, or the weekly pass already spent), and the machine shuts down on the minute.',
} as const;

export const expectations = {
  eyebrow: 'Honest expectations',
  heading: 'What this is, and what it is not',
  lede: 'It is better to read this before you install than after.',
  items: [
    {
      title: 'It is a commitment device, not a cage',
      body: 'You can always power the machine off by hand. No software can stop that, and pretending otherwise would make everything else on this page less believable.',
    },
    {
      title: 'Once a curfew is set, it does not switch off easily',
      body: 'That is the point of the product. It is built for the person who wanted the habit badly enough to install something, and who knows they will be tempted at midnight. If you are not ready to commit, do not set a schedule yet.',
    },
    {
      title: 'Safe Mode does not skip it',
      body: 'The service is registered to start in Safe Mode too, so booting into Safe Mode to get past the lock does not work.',
    },
    {
      title: 'A determined administrator can still get around it',
      body: 'With physical access and administrative rights, any local software can be defeated. SleepGuardian closes the easy loopholes — the casual click, the borrowed account, the opportunistic malware. It does not attempt to be undefeatable, because nothing honestly can be.',
    },
    {
      title: 'Uninstalling while a commitment is live is refused',
      body: 'The installer checks with the app first, and declines while a curfew is still scheduled or a streak target is still set. If it cannot determine the state, it declines anyway.',
    },
    {
      title: 'There is an emergency pass, and it is the intended way out',
      body: 'The weekly hour is not a loophole to be hunted for. It is the designed escape valve, and it is the first thing to reach for on a night that genuinely went wrong.',
    },
  ],
  ctaLabel: 'Read the full security model',
  ctaHref: '/security',
} as const;

export interface AudienceCard {
  readonly title: string;
  readonly body: string;
}

export const audience: {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lede: string;
  readonly cards: readonly AudienceCard[];
} = {
  eyebrow: 'Who it is for',
  heading: 'For anyone whose machine is the problem',
  lede: 'SleepGuardian is not a wellness tracker and not a journal. It is a mechanism.',
  cards: [
    {
      title: 'Students and night owls',
      body: 'You already know you should sleep. What is missing is something that outranks your judgement at midnight.',
    },
    {
      title: 'Remote workers and developers',
      body: 'The laptop is both the reason you are still up and the only thing on the desk that can make you stop.',
    },
    {
      title: 'Anyone keeping a sleep goal',
      body: 'You are tracking this for your health, and you would rather the computer held you to it than your intentions did.',
    },
  ],
};

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const faq: {
  readonly eyebrow: string;
  readonly heading: string;
  readonly items: readonly FaqItem[];
} = {
  eyebrow: 'Questions',
  heading: 'The things people ask first',
  items: [
    {
      question: 'Can I turn it off if I change my mind?',
      answer:
        'Not casually, and that is deliberate. A schedule cannot be quietly disabled or rewritten later, and uninstalling is refused while a curfew is still scheduled or a streak target is still set. To get out legitimately you disable the curfew from the dashboard — which is itself locked until the streak target is met, with the weekly grace hour as the intended escape. The full details are on the security page.',
    },
    {
      question: 'What if I genuinely need my PC during curfew?',
      answer:
        'That is what the weekly grace hour is for: one extra hour, once a week, available once your streak target is seven days or more and your first night is on record. It extends the curfew by an hour; it does not lift enforcement.',
    },
    {
      question: 'Does it need a password?',
      answer:
        'No, it is optional. Set one and schedule changes, the grace hour and exit actions all require it. Leave it unset and none of those actions ask, which is the sensible choice if you are the only person using the machine.',
    },
    {
      question: 'What happens if I restart the PC or lose power?',
      answer:
        'Your schedule and your history are saved as they happen, and enforcement resumes on the next boot. If the machine comes back up inside the curfew window, it boots into the lock. If it goes down before curfew on your own, that is recorded as a compliant night rather than a broken one.',
    },
    {
      question: 'Which Windows versions are supported?',
      answer:
        'Windows 10 or later, 64-bit. The installer refuses anything older or 32-bit. Installing needs administrator rights, because it registers a Windows service and a scheduled task.',
    },
    {
      question: 'Does it collect my data, or need the internet?',
      answer:
        'Neither. SleepGuardian makes no network calls at all, has no telemetry, no account and no sync. Your schedule, history and settings live in a local database on that machine only, and uninstalling keeps that data.',
    },
    {
      question: 'How do I uninstall it?',
      answer:
        'Uninstalling asks the app first, and is refused while any curfew is still on the calendar or a streak target is still set — the same rule as disabling. To proceed, disable the curfew from the dashboard. If the check cannot reach the app, uninstall is refused rather than assumed safe. If the product is genuinely wedged, the project ships a documented administrator override in its uninstall script.',
    },
  ],
};

export const download = {
  eyebrow: 'Get SleepGuardian',
  heading: 'Ready to actually keep your bedtime?',
  lede: 'One installer. It sets up the service, the boot guard and the tray app, then gets out of the way.',
  steps: [
    {
      title: 'Run the installer',
      body: `${siteConfig.fileName}, installed as Administrator. Windows will ask you to confirm, because the app registers a service and a scheduled task.`,
    },
    {
      title: 'Set your first curfew',
      body: 'The dashboard opens with a 10 PM bedtime and a 7 hour window already filled in. Adjust, confirm, and the service picks it up within seconds.',
    },
    {
      title: 'Close the dashboard',
      body: 'SleepGuardian keeps running in the tray and as a Windows service. You do not need it open to work.',
    },
  ],
  /**
   * Shown in the final CTA. Honest note about unsigned builds; the wording
   * assumes there is no code-signing certificate, so revisit it if the
   * installer is ever signed.
   */
  unsignedNotice:
    'SleepGuardian is not code-signed, so Windows SmartScreen may show a warning the first time you run the installer. Select "More info", then "Run anyway", to continue.',
} as const;

export const contact = {
  eyebrow: 'Contact',
  heading: 'Questions or feedback?',
  lede: 'Approxy reads every message. Bug reports with the log from C:\\ProgramData\\SleepGuardian are the most useful thing you can send.',
  emailLabel: 'Email Approxy',
  ctaLabel: 'approxydev@gmail.com',
  promise: [
    'No support ticket queue, no account, no chatbot.',
    'If something does not match what this page says, that is a bug and we want to hear about it.',
  ],
} as const;
