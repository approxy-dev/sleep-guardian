/**
 * Legal and security page copy.
 *
 * Everything here is derived from the app repository, not from a generic
 * template. The privacy page in particular describes only data the app really
 * stores and only behaviour verified in the source. See DISCOVERY.md for the
 * claim -> source mapping.
 */

export interface LegalBlock {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
  readonly note?: string;
}

export interface LegalPage {
  readonly title: string;
  readonly description: string;
  readonly intro: string;
  readonly updated: string;
  readonly blocks: readonly LegalBlock[];
}

/**
 * "Last reviewed" date for the legal pages. A reviewed date is a claim about
 * the document rather than about the product, so it is set by hand and has no
 * source file — bump it whenever the copy below changes.
 */
const UPDATED = '2026-10-03';

export const privacy: LegalPage = {
  title: 'Privacy',
  description:
    'What SleepGuardian stores, where it stores it, and the short answer to whether it talks to the internet. It does not.',
  intro:
    'SleepGuardian has no servers, no accounts and no network code. This page describes the files it writes on your own machine, in plain language.',
  updated: UPDATED,
  blocks: [
    {
      heading: 'The short version',
      paragraphs: [
        'SleepGuardian does not send anything anywhere. It contains no network requests, no telemetry, no analytics and no update check. The only machine it ever talks to is the one it is installed on.',
        'Your schedule and your history are written to a local database on that machine. Nothing is uploaded, backed up to a cloud service, or shared with anyone, including Approxy.',
      ],
    },
    {
      heading: 'What is stored on your machine',
      paragraphs: [
        'Everything lives under C:\\ProgramData\\SleepGuardian, in a folder that the signed service owns:',
      ],
      bullets: [
        'sleepguardian.db — a SQLite database holding your curfew schedule, your settings, one row per night with the curfew time and the actual shutdown and unlock times, the events the app recorded (shutdowns, boot attempts during a curfew, unlocks), and any use of the weekly grace hour.',
        'guardian-state.json — the live enforcement state, rewritten every few seconds so the interface can read it.',
        'service.log, watchdog.log, ui-crash.log — diagnostic logs written to disk when something needs recording.',
        'quotes.json — the set of 25 lines the lock screen picks from, shipped with the app.',
      ],
    },
    {
      heading: 'Your admin password',
      paragraphs: [
        'If you set an admin password, only a hash of it is stored, in the same local settings table. The password itself is not written to disk and is not recoverable. Every password check happens inside the service, not in the interface.',
      ],
    },
    {
      heading: 'Windows itself',
      paragraphs: [
        'The app writes a few entries to standard Windows locations, all of which are removed when you uninstall: a per-user policy key while the lock is up, an HMAC-signed mirror of the lock decision under HKEY_LOCAL_MACHINE, and scheduled-task registrations for the boot guard and the watchdog.',
      ],
    },
    {
      heading: 'This website',
      paragraphs: [
        'This site is a static set of pages. It sets no cookies, runs no analytics, embeds no third-party scripts, and has no user accounts. If you email Approxy, the only place that message exists is the inbox of the person you sent it to.',
      ],
    },
    {
      heading: 'Deleting your data',
      paragraphs: [
        'Uninstalling SleepGuardian deliberately keeps your history and settings, so reinstalling does not lose your streak. To remove them as well, delete the C:\\ProgramData\\SleepGuardian folder after uninstalling.',
        'The Windows entries listed above are removed automatically by the uninstaller.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        'If anything on this page does not match what the software does when you run it, please say so at approxydev@gmail.com. That is a bug report and we would rather have it.',
      ],
    },
  ],
};

export const terms: LegalPage = {
  title: 'Terms',
  description: 'Basic terms for using the SleepGuardian software and this website.',
  intro:
    'Short terms for a small piece of Windows software. They are written to be read, not to be survived.',
  updated: UPDATED,
  blocks: [
    {
      heading: 'Licence',
      paragraphs: [
        'SleepGuardian is provided for personal, non-commercial use. You may use, copy, modify and distribute it for that purpose, on that condition.',
        'The software is provided as-is, with no warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement.',
      ],
    },
    {
      heading: 'Acceptable use',
      paragraphs: [
        'SleepGuardian is a self-imposed curfew. It shuts a computer down and locks a screen. Installing it on a machine you do not own, or on a machine other people depend on without knowing, is not something you are permitted to do.',
        'Use it responsibly. The licence that ships with the software says the same thing in one line, and that line is the whole of it.',
      ],
    },
    {
      heading: 'What the software does not promise',
      paragraphs: [
        'SleepGuardian is designed to stop casual and opportunistic tampering. It is not designed to withstand a determined local administrator with physical access, and the security page says so at length rather than implying otherwise.',
        'A commitment device raises the cost of breaking your own rules. It does not make breaking them impossible, and no piece of software running on a machine you control can.',
      ],
    },
    {
      heading: 'This website',
      bullets: [
        'Content is provided as-is. We correct inaccuracies when we learn of them; we do not warrant that the site is complete or current at any moment.',
        'Links to your own email address are the only interactive elements on this site beyond navigation.',
        'The downloadable build, when one is published, is provided as-is and unsigned until Approxy obtains a code-signing certificate.',
      ],
    },
    {
      heading: 'Liability',
      paragraphs: [
        'To the fullest extent permitted by law, Approxy is not liable for any damage arising from the use of, or inability to use, SleepGuardian or this site. Unforeseen work losses caused by a forced shutdown at 1 a.m. are your own.',
      ],
    },
    {
      heading: 'Changes and contact',
      paragraphs: [
        'These terms may change as the software changes; the date at the top of the page shows when they were last revised.',
        'Questions go to approxydev@gmail.com.',
      ],
    },
  ],
};

export const security: LegalPage = {
  title: 'Security',
  description:
    'How SleepGuardian holds a bedtime, what it stops, and — just as importantly — what it does not stop.',
  intro:
    'SleepGuardian is an enforcement tool, and enforcement tools are easy to oversell. This page is deliberately specific about both halves: what it resists, and the things it plainly cannot resist.',
  updated: UPDATED,
  blocks: [
    {
      heading: 'The one-paragraph version',
      paragraphs: [
        'SleepGuardian stops casual and opportunistic tampering, including by other people using the same computer and by malware that happens to run with ordinary user rights. It does not stop a determined local administrator. No piece of software running on a machine you control can make that promise, so we do not make it.',
      ],
    },
    {
      heading: 'Where enforcement actually lives',
      bullets: [
        'The curfew is enforced by a Windows service running as the LocalSystem account. The decisions are made there, not in the window you can close.',
        'The service executable runs from a sealed copy under C:\\ProgramData\\SleepGuardian\\runtime, where your account can read and execute it but cannot write, delete or truncate it. The copy in Program Files is not what the service runs, so replacing it changes nothing.',
        'A per-minute watchdog task runs the same service code as the system account and repairs a service that was stopped or disabled.',
        'The service is registered to start in Safe Mode as well, so booting into Safe Mode to slip past the lock does not work.',
      ],
    },
    {
      heading: 'What it resists',
      paragraphs: ['Concretely, these are the attacks the design is aimed at:'],
      bullets: [
        'Closing the tray app or killing the interface process. Enforcement does not live in the interface.',
        'Stopping or reconfiguring the service with the ordinary tools. The service descriptor removes the rights to stop it, change its configuration, or delete it from administrator accounts, and the watchdog re-enables it within a minute if something running as the system account does manage to.',
        'Other local users on the same machine. Every state-changing request is re-authorised inside the service against the stored password hash, so a password typed into a window proves nothing on its own, and a hand-crafted request with no password is rejected and logged as an authentication failure.',
        'Tampering with the local database. The directory is ACL-locked against the interactive user, and the authoritative lock decision is mirrored outside the database under an HMAC-signed mirror, so editing the database does not on its own unlock you.',
        'A crafted request to clear the lock state. That request is only honoured during a genuine, unspent grace hour, checked inside the service.',
        'Opportunistic malware running with normal user rights, which cannot reach the service, the sealed runtime, or the signed mirror.',
      ],
    },
    {
      heading: 'What it does not resist',
      paragraphs: [
        'These are not bugs or unfinished features. They are consequences of running on a machine whose owner controls the operating system, and we would rather list them than let you find them yourself.',
      ],
      bullets: [
        'Physical access to a powered-off machine. An administrator can boot another operating system, mount the disk, edit the database and the registry offline, or replace the binaries. Nothing runs at that point, so nothing resists.',
        'Taking ownership of files or registry keys. The rights needed to do that are retained on purpose, because the uninstaller needs them to remove the software cleanly.',
        'Anything already running as the system account. Code execution at that level defeats every restriction described above, and no local software product can defend against it.',
        'Kernel drivers, hypervisors, and other tampering that happens before the operating system loads.',
        'Ctrl+Alt+Del for an administrator account. Windows reserves the secure attention sequence; SleepGuardian suppresses it for standard-user accounts during the lock, because that is what the operating system allows, and an administrator always keeps it.',
        'You, simply accepting the shutdown. Nothing here can stop a person powering off their own machine by hand or unplugging it.',
      ],
      note: 'SleepGuardian is a commitment device. It removes the easy loopholes on purpose, and it is candid about the rest.',
    },
    {
      heading: 'The weekly grace hour',
      paragraphs: [
        'The one deliberate escape valve. One hour, once per calendar week, earned in two parts: the streak target you configured must be seven days or more, and a first compliant night must actually be on record — so it is never available on the day you first set a curfew, appears from the second day onward, and a five-day target never unlocks it. Spending it extends the relevant curfew by an hour; the night is recorded as neutral for your streak rather than advancing or breaking it. It requires your admin password if you have set one, and asks for nothing if you have not.',
      ],
    },
    {
      heading: 'Disabling and uninstalling',
      paragraphs: [
        'Uninstalling asks the application first, and is refused while any curfew is still on the calendar — tonight, later today, or any future date — or while a streak target is still set. If the check cannot reach the application at all, the refusal stands rather than assuming it is safe.',
        'To proceed, disable the curfew from the dashboard. Disabling is itself blocked while a streak target is in progress, and the weekly grace hour is the intended way out of that. The project also ships a documented administrator override in its uninstall script, for the case where the normal path cannot complete, which is a deliberate escape hatch rather than something reachable by accident.',
      ],
    },
    {
      heading: 'Where the enforcement logs are',
      paragraphs: [
        'Shutdowns, boot attempts during a curfew, unlocks, grace-hour use, authentication failures and tamper-recovery runs are all written to the local database and to the logs under C:\\ProgramData\\SleepGuardian. Nothing leaves the machine. If you are reporting a problem, that folder is the most useful thing you can attach.',
      ],
    },
    {
      heading: 'Reporting a problem',
      paragraphs: [
        'If the software does something this page says it should not, email approxydev@gmail.com with what you did and what happened instead.',
      ],
    },
  ],
};

export const notFound = {
  title: 'This page went to bed',
  lede: 'The address you followed does not exist on this site. Nothing is broken on your end.',
  cta: 'Back to the top',
} as const;
