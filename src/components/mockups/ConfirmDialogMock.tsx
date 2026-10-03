import { MockFrame } from '@/components/mockups/MockFrame';

/**
 * Faithful recreation of the schedule confirmation dialog.
 *
 * Source: `src/SleepGuardian.UI/Windows/ScheduleConfirmDialog.xaml` — the dialog
 * that shows the start time in 12- and 24-hour form beside a moon/sun icon, the
 * 7/8 hour length presets, the derived unlock time in both forms, the preview
 * line, and the immutability note.
 *
 * The values shown (22:00 -> 05:00, 7 hours, every day) are the app's own
 * documented defaults, not invented ones.
 */
export function ConfirmDialogMock() {
  return (
    <MockFrame designWidth={460} minPx={8}>
      <div
        className="w-full overflow-hidden rounded-[12px] border border-sg-ink-line text-left"
        style={{
          background: 'linear-gradient(180deg, #e5e4e2 0%, #c0c0c0 100%)',
          boxShadow: '0 12px 3px rgb(0 0 0 / 0.35)',
        }}
        role="img"
        aria-label="The confirmation dialog: shutdown at 10:00 PM, 24 hour, seven hours, unlock at 5:00 AM, every day."
      >
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-black/5 px-[0.875em] py-[0.625em]">
          <span className="flex items-center gap-[0.5em] text-[0.75rem] font-semibold text-sg-ink-text">
            <span aria-hidden="true">🌙</span>
            Confirm Curfew Schedule
          </span>
          <span
            className="flex h-[1.375em] w-[1.75em] items-center justify-center rounded-[4px] text-[0.625rem] text-sg-ink-muted"
            aria-hidden="true"
          >
            ✕
          </span>
        </div>

        {/* body */}
        <div className="space-y-[0.875em] px-[1.25em] py-[0.875em]">
          <div className="flex items-start gap-[0.875em]">
            <span
              className="pt-[0.125em] text-[1.75em] leading-none text-sg-ink-text"
              aria-hidden="true"
            >
              🌙
            </span>
            <div>
              <p className="text-[0.6875rem] text-sg-ink-muted">Shutdown at</p>
              <p className="text-[1.375rem] font-bold leading-tight text-sg-ink-text">10:00 PM</p>
              <p className="mt-[0.125em] text-[0.75rem] text-sg-ink-muted">22:00</p>
            </div>
          </div>

          <div>
            <p className="text-[0.6875rem] text-sg-ink-muted">Curfew length</p>
            <div className="mt-[0.375em] flex gap-[0.375em]">
              <span className="rounded-[5px] border border-sg-amber-border bg-sg-amber px-[0.75em] py-[0.3125em] text-[0.75rem] font-semibold text-sg-amber-text">
                7 hours
              </span>
              <span className="rounded-[5px] border border-sg-ink-card-border bg-sg-ink-panel px-[0.75em] py-[0.3125em] text-[0.75rem] font-semibold text-sg-ink-text">
                8 hours
              </span>
            </div>
          </div>

          <div>
            <p className="text-[0.6875rem] text-sg-ink-muted">Unlock at</p>
            <p className="text-[1.25rem] font-bold leading-tight text-sg-ink-text">5:00 AM</p>
            <p className="mt-[0.125em] text-[0.75rem] text-sg-ink-muted">05:00 (next morning)</p>
          </div>

          <div className="rounded-[8px] border border-sg-ink-line bg-sg-ink-panel px-[0.75em] py-[0.5em]">
            <p className="text-[0.8125rem] font-semibold text-sg-ink-text">
              10:00 PM today &rarr; 5:00 AM tomorrow
            </p>
            <p className="mt-[0.25em] text-[0.6875rem] text-sg-ink-muted">Repeats every day</p>
          </div>

          <p className="text-[0.6875rem] leading-relaxed text-sg-ink-muted">
            This schedule will be locked to these times until you disable it. Changing it later
            requires the admin password, and disabling is blocked while a streak is in progress.
          </p>
        </div>

        {/* actions — "Back to edit" is first, matching the XAML */}
        <div className="flex justify-end gap-[0.5em] px-[1.25em] pb-[1em]">
          <span className="rounded-[5px] border border-sg-ink-card-border bg-sg-ink-panel px-[1em] py-[0.375em] text-[0.75rem] font-semibold text-sg-ink-text">
            Back to edit
          </span>
          <span className="rounded-[5px] border border-sg-ink-card-border bg-sg-ink-panel px-[1em] py-[0.375em] text-[0.75rem] font-semibold text-sg-ink-text">
            Cancel
          </span>
          <span className="rounded-[5px] border border-sg-ink-card-border bg-sg-ink-panel px-[1em] py-[0.375em] text-[0.75rem] font-semibold text-sg-ink-text">
            Confirm
          </span>
        </div>
      </div>
    </MockFrame>
  );
}
