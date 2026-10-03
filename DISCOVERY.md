# DISCOVERY

Every factual claim on this site traces back to a file in the SleepGuardian app
repository. This document is the audit trail: if a sentence in
`src/content/` cannot be found here, it is marketing, not fact, and should be
treated with suspicion.

- **App repository:** `E:\SleepGuardian - Copy (2)` (read-only; never modified)
- **Site repository:** `E:\sleepgurwe`
- **Method:** read the source, the XAML, the Inno Setup script and the shipped
  icon. No behaviour was inferred from a screenshot, and nothing was assumed
  from a similar product.

---

## 1. Product identity and version

| Fact               | Value                           | Source                                                                    |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------- |
| Product name       | `SleepGuardian`                 | `build/setup.iss` `#define MyAppName "SleepGuardian"`                     |
| Version            | `1.10.2`                        | `Directory.Build.props` `<Version>1.10.2</Version>`                       |
| Installer filename | `SleepGuardianSetup_1.10.2.exe` | `build/setup.iss` `OutputBaseFilename=SleepGuardianSetup_{#MyAppVersion}` |
| Installer size     | 131,316,204 bytes (125.23 MiB)  | `Get-ChildItem` on the built `dist\SleepGuardianSetup_1.10.2.exe`         |
| Install location   | `%ProgramFiles%\SleepGuardian`  | `build/setup.iss` `DefaultDirName={autopf}\SleepGuardian`                 |
| Developer          | Approxy                         | `LICENSE.txt`; `README.md`                                                |

The site shows the size as `125 MB`. That is the 125.21 MiB figure rounded to
whole megabytes, matching the precision of every other number on the page.

## 2. Platform requirements

| Claim on site                                                                                        | Source                                                                    |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| "Windows 10 or later"                                                                                | `build/setup.iss` `MinVersion=10.0.10240` (Windows 10 1507)               |
| "64-bit"                                                                                             | `build/setup.iss` `ArchitecturesAllowed=x64compatible`                    |
| Windows 10 compatibility GUID                                                                        | `src/SleepGuardian.UI/app.manifest` `supportedOS Id="{8e0f7a12-...}"`     |
| "Installing needs administrator rights, because it registers a Windows service and a scheduled task" | `build/setup.iss` service + task installation; `PrivilegesRequired=admin` |
| "The installer refuses anything older or 32-bit"                                                     | `MinVersion` + `ArchitecturesAllowed` above                               |

**Not claimed:** any behaviour on Windows Server, ARM64, or 32-bit. The source
does not support those claims.

## 3. Grace hour (called "emergency pass" in the app)

The site calls this the "weekly grace hour". The app calls it the _emergency
pass_ / _emergency grace_. The rule set is identical, and the site now reflects
**v1.10.2**, where the eligibility rule changed from "eight compliant nights" to
a two-part commitment + proof rule.

| Claim on site                                                                                                                      | Source                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "A 7-day target — and a finished first night": target must be seven days or more **and** a first compliant night must be on record | `CurfewEngine.cs:95` `MinStreakTargetForPass = 7`; `:105` `MinCompletedNightsForPass = 1`; `IsEmergencyEligibleAsync` (`:401-409`) requires `schedule.ResolveStreakDays() >= 7` and `GetCurrentStreakAsync(...) >= 1`                                              |
| "never available on the day you first set a curfew ... appears from the second day onward"                                         | same rule — a compliant night cannot exist before the first curfew night is over, which is exactly the point of the second condition                                                                                                                               |
| "a five-day target never unlocks it"                                                                                               | `IsEmergencyEligibleAsync` rejects any target below `MinStreakTargetForPass`; the CLI/UI reason strings at `CurfewEngine.cs:432-437` name this case explicitly                                                                                                     |
| "If no pass is available the lock does not dangle one in front of you — it says exactly why"                                       | the overlay never shows the button unless the service confirms availability (`LockOverlay.xaml.cs:294-327`); `GetEmergencyBlockReasonAsync` (`CurfewEngine.cs:422-459`) returns the actual cause (target too small / first night pending / already used this week) |
| "The week starts on Monday"                                                                                                        | `CurfewEngine.cs:765-768` `GetWeekStart` — `now.Date.AddDays(-((int)now.DayOfWeek + 6) % 7)`                                                                                                                                                                       |
| "One pass per week, and it does not accumulate"                                                                                    | `IsEmergencyUnusedThisWeekAsync`, `GetForWeekAsync` (weekly-keyed emergency log)                                                                                                                                                                                   |
| "Spending the pass extends the relevant curfew by a single hour. It does not disable enforcement"                                  | `UseEmergencyAsync`, `IsNightWindow(now, TimeSpan.FromHours(1))` — the pass sets a one-hour active window, it does not clear the schedule                                                                                                                          |
| "A night you use it on is neutral"                                                                                                 | `SleepLogEntry.EmergencyUsed` is recorded separately from `StreakDay`; `CreditNightAsync` skips streak mutation when the pass was used                                                                                                                             |
| "If an admin password exists, using the pass asks for it"                                                                          | `PipeRequest.Auth` / `GuardianPipeServer.RequireAdminAsync` — `UseEmergency` is an auth-required operation                                                                                                                                                         |
| "Usable in the hour before curfew, or at any point while the lock is up"                                                           | `UseEmergencyFromLockAsync` — during an active window the 1h-before rule is waived (`CurfewEngine.cs:452-454`)                                                                                                                                                     |
| "60 seconds to type"                                                                                                               | `ShutdownOrchestrator.EmergencyDecisionWindow = TimeSpan.FromSeconds(60)`; `EmergencyPanelController` (60s decision state machine under `LockOverlay.xaml.cs:495-498`)                                                                                             |

**Deliberate omission:** the source also carries an administrator override for a
genuinely wedged install. That is documented in the app's own uninstall script
and is mentioned in the FAQ's uninstall answer, but it is not presented as a
user feature.

## 4. Enforcement behaviour

| Claim on site                                                                                        | Source                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "At curfew the machine actually powers off"                                                          | `WindowsShutdownExecutor` — `InitiateSystemShutdownEx` / `ExitWindowsEx` with `SE_SHUTDOWN_PRIVILEGE`                                                                                                       |
| "No dialog to dismiss"                                                                               | shutdown is issued by the service, not by a window                                                                                                                                                          |
| "it boots straight into a full-screen lock counting down to your wake time"                          | `src/SleepGuardian.UI/Windows/LockOverlay.xaml`; boot preflight in `BootCurfewPreflight`                                                                                                                    |
| "The lock cannot be closed, minimised, or ended from Task Manager"                                   | `TaskManagerPolicy` applies `DisableTaskMgr`, `DisableCMD`, `NoWinKeys` while locked                                                                                                                        |
| "your previous policy settings are restored the moment it lifts"                                     | `TaskManagerPolicy` snapshots prior values and restores them on clear                                                                                                                                       |
| "Tray notices at 30, 10, 5, 2 and 1 minutes out, then a full-screen countdown in the last minute"    | `GuardianStatePoller.cs:207-228` — one balloon per level (T-30/T-10/T-5/T-2/T-1); `WarningLevel` enum includes `TenSeconds`; `ShutdownOrchestrator` drives the countdown                                    |
| "Its opacity is adjustable in Settings (30–100%), and the final ten seconds are always fully opaque" | `OverlayOpacityPolicy.cs` (clamps to `AppSettings.OverlayOpacityMin 0.30` .. `Max 1.00`; forces opacity to max in the last 10s); defaults `OverlayOpacityDefault = 0.95` (`DomainModels.cs:142-144`)        |
| "if the service ever stops reporting, the lock says so rather than pretending nothing happened"      | liveness banner after `StateFreshnessWindow` (20s) + 2 consecutive stale polls spanning >45s (`LockOverlay.xaml.cs:329-…`); advisory only — it never releases the lock                                      |
| "when they have not taken effect the lock names exactly which ones failed"                           | `LockPolicyRegistry` verifies the live registry and the overlay discloses which of Task Manager / Command Prompt / Windows-key restrictions are not in force (typically when the dashboard is not elevated) |
| "Enforcement runs from a Windows service, backed by a per-minute watchdog"                           | `SECURITY.md`; watchdog log in `%ProgramData%\SleepGuardian\watchdog.log`                                                                                                                                   |
| "Closing the tray app, killing the process, or switching the service off does not end it"            | `SECURITY.md` — service DACL denies stop; UI kill leaves the service running                                                                                                                                |

## 5. Schedules, streaks, history

| Claim on site                                                                                 | Source                                                                                                                               |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| "Pick a bedtime and a 7 or 8 hour window"                                                     | `src/SleepGuardian.Core/Services/CurfewDuration.cs:19-20` `MinHours = 7`, `MaxHours = 8`                                             |
| "Every night, weekdays, weekends, a custom pick of days, or a single date"                    | `RecurrenceMode` enum: `Daily`, `Weekdays`, `Weekends`, `CustomDays`, `OneOff` (`DomainModels.cs:5-13`)                              |
| "Targets of 5, 10, 20 or 30 consecutive nights, or a custom number"                           | `StreakTarget` enum: `Days5`, `Days10`, `Days20`, `Days30`, `Custom` (`DomainModels.cs:31-39`)                                       |
| "a calendar heatmap and an event log of every shutdown, boot attempt and unlock"              | `CurfewEventType` enum; `ISleepLogRepository`                                                                                        |
| "One row per night with the curfew, the actual shutdown and unlock times"                     | `SleepLogEntry` record (`DomainModels.cs:68-79`)                                                                                     |
| Default editor values: shutdown 22:00 for 7 hours → unlock 05:00 (used in every mockup)       | `MainWindow.xaml.cs:43` "Defaults: shutdown 22:00 for 7 hours (unlock 05:00)"; an existing enabled schedule wins over these (`:156`) |
| "plus CSV and JSON export"                                                                    | `SleepLogExporter.ExportCsv` / `ExportJson`                                                                                          |
| "a confirmation shows the start time, the derived wake time ... in both 12- and 24-hour form" | `src/SleepGuardian.UI/Windows/ScheduleConfirmDialog.xaml(.cs)`                                                                       |
| "The lock screen picks a different line from a bundled set of 25"                             | `assets/quotes.json` — 25 entries; `Quote` selection in the lock overlay                                                             |

## 6. Password

| Claim on site                                                                   | Source                                                                                              |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| "Set one and schedule changes, the grace hour, and exit actions all ask for it" | `GuardianPipeServer` marks `SetSchedule`, `UseEmergency`, `ExitWindows` as auth-required operations |
| "only a hash of it is stored"                                                   | `PasswordHasher` (PBKDF2) writing `AdminPasswordHash`; the plaintext is never persisted             |
| "Every password check happens inside the service"                               | pipe server is the only verification point; the UI never sees the hash                              |
| "Leave it unset and none of those actions ask"                                  | `RequiresAdminAuth` is false when no hash exists                                                    |

## 7. Privacy and data

| Claim on site                                                                                       | Source                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "no network requests, no telemetry, no analytics and no update check"                               | full source scan found no `HttpClient`, `WebRequest`, `WebClient` or `Socket` usage; no telemetry package referenced                                                                       |
| "no servers, no accounts"                                                                           | no auth or sync code exists in the repository                                                                                                                                              |
| "C:\ProgramData\SleepGuardian"                                                                      | `SleepGuardianPaths.DataDirectory`; `DefaultDirName` in the installer                                                                                                                      |
| `sleepguardian.db` — SQLite, schedule + settings + nightly rows + events + emergency log            | `ISleepLogRepository`, `ISettingsRepository`, `ICurfewEventRepository`, `IEmergencyLogRepository`                                                                                          |
| `guardian-state.json` — "rewritten every few seconds"                                               | `GuardianRuntimeState` written by the service run loop                                                                                                                                     |
| `service.log`, `watchdog.log`, `ui-crash.log`                                                       | log file names in `SleepGuardianPaths`                                                                                                                                                     |
| `quotes.json` shipped with the app                                                                  | `assets/quotes.json` — 25 entries                                                                                                                                                          |
| "uninstalling keeps that data"                                                                      | `build/setup.iss`: `// Keep user data (settings, history) on uninstall - it lives in %PROGRAMDATA% / %LOCALAPPDATA%.`                                                                      |
| "an HMAC-signed mirror of the lock decision under HKEY_LOCAL_MACHINE"                               | `RegistryStateMirrorStore.SubKey = SOFTWARE\SleepGuardian\StateMirror` (`HKLM\...`, SYSTEM-only write, DENY delete); `StateMirror` HMAC-SHA256 + DPAPI-wrapped key (`StateMirror.cs:7-11`) |
| "Bug reports with the log from C:\ProgramData\SleepGuardian are the most useful thing you can send" | the logs named above are the diagnostic record                                                                                                                                             |

The "no network calls" claim is a statement about the source that was shipped
and inspected. It is stated as what the code does, not as a promise about
compiled binaries from an unknown origin.

## 8. Security model

| Claim on site                                                                                                                                                                   | Source                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| "The service is registered to start in Safe Mode too"                                                                                                                           | `SECURITY.md`; Safe Mode service registration in the installer                    |
| "With physical access and administrative rights, any local software can be defeated"                                                                                            | `SECURITY.md` states this explicitly as a limit, not a bug                        |
| "The installer checks with the app first, and declines while a curfew is still scheduled or a streak target is still set. If it cannot determine the state, it declines anyway" | `GetUninstallGateAsync`; `UninstallCheckResult`; the uninstall script's gate step |
| "run as LocalSystem"                                                                                                                                                            | `SECURITY.md` — service account                                                   |
| "sealed runtime image"                                                                                                                                                          | `SealRuntimeImage` / `SealStampFileName`; `IsRunningSealed`                       |

**Deliberately toned down:** the app's source uses forceful language about
ordinary-user malware. The site states the technical facts and stops at the
limit the developers themselves state.

## 9. Licensing and contact

| Fact                                   | Source                                                 |
| -------------------------------------- | ------------------------------------------------------ |
| Personal, non-commercial use           | `LICENSE.txt` — "SleepGuardian — Personal Use License" |
| Copyright year 2026                    | `LICENSE.txt`                                          |
| Contact address `approxydev@gmail.com` | owner-supplied                                         |

The Terms page adapts `LICENSE.txt` rather than replacing it, and says so.

## 10. Design tokens

All colours were read from `src/SleepGuardian.UI/Themes/Brand.xaml` and
`tools/GenerateIcons/Program.cs`. The full table lives in
`src/app/globals.css` with a per-token source comment.

| Token                     | Value                 | Source                                                 |
| ------------------------- | --------------------- | ------------------------------------------------------ |
| `--color-sg-night`        | `#141A30`             | `GenerateIcons/Program.cs` — icon backing              |
| `--color-sg-moon`         | `#FFD878`             | `GenerateIcons/Program.cs` — crescent fill             |
| `--color-sg-silver`       | `#C0C0C0`             | `Brand.xaml` `SilverPrimary`                           |
| `--color-sg-platinum`     | `#E5E4E2`             | `Brand.xaml` `SilverHighlight`                         |
| `--color-sg-silver-soft`  | `#A7A9AC`             | `Brand.xaml` `SilverSoft`                              |
| `--color-sg-graphite`     | `#53565A`             | `Brand.xaml` `SilverDark`                              |
| `--color-sg-ink-text`     | `#2E3135`             | `Brand.xaml` `TextPrimary`                             |
| `--color-sg-ink-muted`    | `#5A5E64`             | `Brand.xaml` `TextSecondary`                           |
| `--color-sg-ink-panel`    | `#F7F7F7`             | `Brand.xaml` `PanelBg`                                 |
| `--color-sg-amber`        | `#FFB74D`             | `Brand.xaml` `AmberAccent`                             |
| `--color-sg-amber-lift`   | `#FFC76D`             | derived: amber, lifted for hover                       |
| `--color-sg-amber-border` | `#E89B3C`             | `Brand.xaml` `AmberBorder`                             |
| `--color-sg-amber-ink`    | `#9A5A00`             | derived: AmberBorder darkened for light panels (4.5:1) |
| `--color-sg-amber-text`   | `#4A2E0A`             | `Brand.xaml` `AmberText`                               |
| `--color-sg-success`      | `#4CAF50`             | `Brand.xaml` `Success`                                 |
| `--color-sg-success-deep` | `#1B5E20`             | `Brand.xaml` `Heatmap4` (dark green)                   |
| `--color-sg-alarm`        | `#E53935`             | `CountdownOverlay.xaml` timeout bar                    |
| heatmap ramp              | `#E8E8E8` → `#1B5E20` | `Brand.xaml` `Heatmap0..4`                             |

### Three decisions that are not in the app

1. **The site is dark-first; the app is not.** `README.md` states the app ships one
   silver theme with no dark mode. The site's default uses `#141A30` — the app's
   own icon backing — as the page background and the silver ramp as the type and
   surface scale. A light theme is offered as a second option; it is a web
   affordance, not a claim about the app. Inside the interface recreations the
   app's light theme is reproduced faithfully in both, with one accessibility
   exception (next item). The marketing surface and the product surface are
   deliberately different.
2. **Two derived colours and a couple of mockup text colours depart from the
   app to meet WCAG AA.** The brief requires "WCAG AA contrast (verify
   accent-on-background)". The app's own `CountdownOverlay.xaml` paints
   `#E89B3C` on the near-white card (`2.0:1`) and `#A7A9AC` labels on `#F7F7F7`
   (`2.3:1`) — both below AA. The recreations therefore use `--color-sg-ink-muted`
   (`#5A5E64`, the app's own light-theme `TextSecondary`) where the app used
   `SilverSoft`, `--color-sg-success-deep` (`#1B5E20`, the app's own `Heatmap4`)
   where a green number sits on a light card, and the derived
   `--color-sg-amber-ink` for the "SAVE YOUR WORK NOW" line. Every replacement is
   either an existing app token or the same hue darkened; the shape, layout,
   wording and remaining colours are unchanged. Without this the Lighthouse
   accessibility score logs 17 contrast failures.
3. **Inter and JetBrains Mono replace Segoe UI and Consolas.** Both web fonts
   are close in weight and proportion, and `next/font` self-hosts them so there
   is no third-party font request. The system stack still lists `Segoe UI` and
   `Consolas` as fallbacks.

### The light theme is derived, not read

The app has no light-to-dark story to copy, so every light value here is a
derived step. None of these are in `Brand.xaml`:

| Token                    | Light value           | Derived from                                           |
| ------------------------ | --------------------- | ------------------------------------------------------ |
| `--color-sg-bg`          | `#EEF1F5`             | `night-deep` `#0B0F1E`, desaturated up                 |
| `--color-sg-platinum`    | `#1B1E24`             | `platinum` `#E5E4E2`, inverted to ink                  |
| `--color-sg-silver-soft` | `#4B4F56`             | `silver-soft` `#A7A9AC`, darkened                      |
| `--color-sg-silver`      | `#3A3E45`             | `silver` `#C0C0C0`, darkened                           |
| `--color-sg-moon`        | `#8A5A00`             | `moon` `#FFD878`, darkened                             |
| `--color-sg-accent`      | `#8A5200`             | `AmberBorder` `#E89B3C`, darkened (7.0:1)              |
| `--color-sg-scrim`       | `rgb(27 30 36 / 14%)` | black `#CC000000` replaced with a light-theme ink wash |

| `--color-sg-surface-1..3` | `rgb(20 26 48 / 4,7,11%)` | `night` instead of `platinum` |
| `--color-sg-hairline(-strong)` | `rgb(20 26 48 / 13,24%)` | `night` instead of `platinum` |

Two of these are accessibility decisions, not taste:

- **`sg-accent` is a separate token from `sg-amber`.** The app's `#FFB74D` is an
  amber _button fill_ on a dark page. The first light draft reused it for
  eyebrows, icons, links and the focus ring, which put `#FFB74D` on `#EEF1F5` at
  **4.45:1** — just under AA. Splitting the roles fixed it: `#FFB74D` stays a
  fill in both themes (the recreations depend on it), and `#8A5200` is the
  theme-aware accent, at 7.0:1.
- **The audience numbers dropped from `sg-moon` to `text-sg-silver/60`.** At
  `2.81:1` in the light theme those figures were the other half of the six
  failures Lighthouse reported for light mode. Both themes now audit clean.

The recreations are excluded on purpose. They are pinned to `sg-ink-*`, which
has no light overrides, because a dark screenshot showing a light app UI is
accurate — that is what the app looks like. Mockup chrome lines use
`sg-ink-card-border` / `sg-ink-line` for the same reason: the first cut used
`sg-silver` / `sg-silver-soft`, which moved with the theme and left the ring
track and card borders the wrong shade in light mode.

There is exactly one deliberate exception, `sg-scrim`. `MockFrame.tsx` put the
overlay recreations on a literal `bg-black/80`, which is the app's real
`LockOverlay.xaml` `#CC000000` — and on the light page that is a black rounded
rectangle punched through the layout around "CURFEW ACTIVE". The backdrop is now
a token: black at 80% in dark, `rgb(27 30 36 / 14%)` in light, so the fixed-white
card still reads as a window floating on the current page. The card itself and
everything inside it are unchanged, which `verify` checks by comparing every
painted property inside `.sg-mock` across both themes.

### Icon geometry

`tools/extract-brand-assets.ps1` reads the shipped `assets/app.ico` and writes
every raster size from the 256px frame rather than from a different generator,
so the site mark is the app mark. `MoonMark.tsx` reproduces the crescent as an
SVG mask built from the measured circle geometry (r ≈ 73, centres ≈ (143,121)
and (182,81) in 256px space), which is why it matches the PNG at 20px.

---

## 11. What is NOT claimed, and why

These were deliberately left out because the source does not support them:

| Not claimed                                  | Why                                                                              |
| -------------------------------------------- | -------------------------------------------------------------------------------- |
| Any money, cost, licence tier or entitlement | There is no commerce in the app or the repository                                |
| Testimonials, user counts, ratings           | No such evidence exists                                                          |
| A public download URL                        | None has been published; `downloadUrl` is `null` and the CTA falls back to email |
| Cross-platform or macOS/Linux support        | The repository is Windows-only (WPF, Win32, service)                             |
| "Unbreakable" or "unhackable"                | `SECURITY.md` explicitly disclaims this                                          |
| Cloud sync, backups, or remote access        | No such code exists                                                              |
| Any performance or battery benchmark         | No measurement was taken                                                         |
| Code signing                                 | The build is unsigned; the download CTA says so plainly                          |
| An uptime or availability claim              | There is no service to be unavailable                                            |

## 12. Open items for the owner

These cannot be resolved from the repository and are the only things standing
between this site and a launch:

1. **Production domain.** `NEXT_PUBLIC_SITE_URL` is unset, so canonical URLs,
   `sitemap.xml`, `robots.txt` and JSON-LD currently point at
   `http://localhost:3000`. Set it before deploying.
2. **Download URL.** `downloadUrl` is `null`. Set it and every download button
   becomes a direct link automatically; no component changes are needed.
3. **Code signing.** If the installer is ever signed, update
   `download.unsignedNotice` in `src/content/landing.ts`.
4. **Legal review.** The Terms and Privacy pages are written from the app's own
   licence and behaviour. They have not been reviewed by a lawyer.
