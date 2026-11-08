import { siteConfig } from '@/config/site';

/** Setup instructions describe the published product and Microsoft's command. */
export const pcCurfewGuide = {
  path: '/guides/windows-pc-curfew',
  title: 'How to set a bedtime PC curfew on Windows',
  metaTitle: 'Set a Bedtime PC Curfew on Windows | SleepGuardian',
  description:
    'Set a bedtime PC curfew on Windows 10 or 11. Compare a scheduled shutdown with SleepGuardian, then configure your shutdown time and morning unlock.',
  published: '2026-11-08',
  eyebrow: 'SleepGuardian setup guide',
  introduction:
    'To set a bedtime PC curfew on Windows, choose when the computer should shut down and whether it should stay locked after a restart. A scheduled shutdown handles the first part. SleepGuardian also enforces the curfew until your wake time.',
  beforeHeading: 'Choose your bedtime and unlock time first',
  before: [
    'Pick a time when you can finish work and save open files. SleepGuardian forces a shutdown at curfew, so unsaved work can be lost.',
    'Check the resulting wake time before confirming a schedule. SleepGuardian supports a 7 or 8 hour window and shows both 12-hour and 24-hour times in its confirmation.',
    `Use ${siteConfig.supportedOS}. Administrator rights are needed to install the service and scheduled task.`,
  ],
  windows: {
    heading: 'Option 1: schedule a Windows shutdown',
    introduction:
      'For a shutdown without an overnight lock, Windows Task Scheduler can start the built-in shutdown command at your chosen time.',
    steps: [
      'Open Task Scheduler, choose Create Basic Task, and give the task a name such as Bedtime shutdown.',
      'Choose a Daily trigger and set your bedtime. Select Start a program as the action.',
      'Enter shutdown.exe as the program and /s /t 0 as its arguments. Review the trigger and finish creating the task.',
    ],
    note: 'Save your work before testing. This command requests an immediate shutdown without adding the /f force-close flag; open applications can interrupt it. A scheduled task does not prevent you from turning the PC back on, and its execution depends on the machine being available and the task settings.',
    sourceLabel: "Microsoft's shutdown command documentation",
    sourceUrl:
      'https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/shutdown',
  },
  app: {
    heading: 'Option 2: enforce a curfew with SleepGuardian',
    introduction:
      'Choose SleepGuardian when you want a bedtime shutdown followed by a lock until morning. The enforcement runs as a Windows service, while the dashboard manages your schedule and history.',
    steps: [
      {
        title: 'Install the published Windows build',
        body: `Download ${siteConfig.fileName} and run it as Administrator. The installer sets up the service, boot guard and tray app. The current release is ${siteConfig.appVersion}.`,
      },
      {
        title: 'Create and confirm your curfew',
        body: 'Select the bedtime, days and sleep window in the dashboard. Read the confirmation carefully: it shows the start time, derived wake time and duration before the schedule is saved.',
      },
      {
        title: 'Save your work before shutdown',
        body: 'Tray warnings arrive before curfew, followed by a full-screen countdown in the last minute. Close documents and finish downloads that cannot be interrupted. The shutdown is forced when curfew starts.',
      },
      {
        title: 'Let the overnight lock finish',
        body: 'Restarting during the curfew window opens the full-screen lock. It lifts automatically at your configured unlock time, and the night is written to your local history.',
      },
    ],
  },
  comparisonHeading: 'Which approach fits your bedtime?',
  comparison: [
    {
      feature: 'Shutdown at a chosen time',
      windows: 'A scheduled task runs the command.',
      app: 'The Windows service enforces the curfew.',
    },
    {
      feature: 'Turning the PC back on',
      windows: 'A shutdown task does not add an overnight lock.',
      app: 'The curfew lock stays until the configured wake time.',
    },
    {
      feature: 'Sleep streak history',
      windows: 'Not provided by a shutdown task.',
      app: 'Nightly history and streak tracking stay on the PC.',
    },
  ],
  questionsHeading: 'Before you commit to a PC curfew',
  questions: [
    {
      question: 'Can I change or remove an active curfew?',
      answer:
        'SleepGuardian is a commitment device. Disabling a curfew is restricted until the streak target is met, and uninstalling is refused while a curfew or streak commitment remains active. Read the security model before setting your first schedule.',
    },
    {
      question: 'What if I need the computer during the night?',
      answer:
        'There is an earned weekly grace hour once your streak target is at least seven days and the first night is recorded. It extends the curfew by one hour. It is not an unlimited override, so plan work that genuinely needs overnight access before committing.',
    },
    {
      question: 'Does SleepGuardian need an internet connection?',
      answer:
        'The installed app makes no network calls and needs no account. Your schedules, settings and history are stored locally. You need a connection to download the installer, not to run a curfew.',
    },
  ],
  nextHeading: 'Set up your first bedtime curfew',
  nextBody:
    'Review the security model, choose a schedule you can keep, and save your work before the first shutdown.',
} as const;
