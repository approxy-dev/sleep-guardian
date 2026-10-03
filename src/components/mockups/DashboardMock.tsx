import { MockFrame } from '@/components/mockups/MockFrame';

/**
 * Faithful recreation of the dashboard, DASHBOARD tab.
 *
 * Source: `src/SleepGuardian.UI/Views/MainWindow.xaml` — a 560x800 window with the
 * silver gradient chrome, the custom title bar, the four tabs, and the Next
 * Curfew / Current Streak / Emergency Pass / Quick Set Curfew cards.
 *
 * The values are the app's documented defaults (shutdown 22:00, unlock 05:00,
 * 7 hours). A streak number is shown because the product records one; it is
 * illustrative, not a claim about anyone's actual progress.
 */
export function DashboardMock() {
  const heat = [
    3, 4, 2, 3, 3, 1, 0, 4, 3, 2, 3, 4, 3, 2, 1, 3, 4, 4, 2, 3, 1, 0, 2, 3, 4, 3, 2, 3, 4, 3, 2, 1,
    3, 4, 3, 4, 2, 1, 3, 4, 3, 2, 3, 4, 3, 2, 0, 1, 3, 4, 4, 3, 2, 3, 4, 3, 2, 1, 3, 4, 3, 2, 3, 4,
    3, 1, 2, 3,
  ];
  const heatColor = [
    'var(--color-sg-heat-0)',
    'var(--color-sg-heat-1)',
    'var(--color-sg-heat-2)',
    'var(--color-sg-heat-3)',
    'var(--color-sg-heat-4)',
  ] as const;

  return (
    <MockFrame designWidth={560} minPx={6.5}>
      <div
        className="w-full overflow-hidden rounded-[12px] border border-sg-ink-line text-left"
        style={{
          background: 'linear-gradient(180deg, #e5e4e2 0%, #c0c0c0 100%)',
          boxShadow: '0 12px 3px rgb(0 0 0 / 0.35)',
        }}
        role="img"
        aria-label="The SleepGuardian dashboard: next curfew tonight at 10 PM, a current streak of 12 days, the emergency pass, and a quick set control defaulting to 10 PM for seven hours."
      >
        {/* title bar */}
        <div className="flex items-center justify-between px-[0.875em] py-[0.6875em]">
          <span className="flex items-center gap-[0.5em] text-[0.8125rem] font-semibold text-sg-ink-text">
            <span aria-hidden="true">🌙</span>
            SleepGuardian
          </span>
          <span className="flex gap-[0.25em]" aria-hidden="true">
            <span className="flex h-[1.625em] w-[2.125em] items-center justify-center rounded-[6px] text-[0.625rem] text-sg-ink-muted">
              &#xE921;
            </span>
            <span className="flex h-[1.625em] w-[2.125em] items-center justify-center rounded-[6px] text-[0.625rem] text-sg-ink-muted">
              &#xE8BB;
            </span>
          </span>
        </div>

        {/* tabs */}
        <div className="flex gap-[1em] border-b border-black/5 px-[1em] pt-[0.25em]">
          {['DASHBOARD', 'SCHEDULE', 'HISTORY', 'SETTINGS'].map((tab, index) => (
            <span
              key={tab}
              className={
                index === 0
                  ? 'border-b-2 border-sg-graphite pb-[0.375em] text-[0.6875rem] font-semibold text-sg-graphite'
                  : 'pb-[0.375em] text-[0.6875rem] font-semibold text-sg-ink-muted'
              }
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="space-y-[0.625em] p-[0.75em]">
          {/* Next Curfew */}
          <Card>
            <Label>Next Curfew</Label>
            <p className="mt-[0.375em] text-[0.9375rem] font-semibold text-sg-ink-text">
              Tonight at 10:00 PM
            </p>
            <p className="mt-[0.25em] text-[0.75rem] text-sg-ink-muted">
              Unlocks at 5:00 AM &middot; 7-hour window
            </p>
          </Card>

          {/* Current Streak */}
          <Card>
            <div className="flex items-center justify-between gap-[0.75em]">
              <div className="min-w-0">
                <Label>Current Streak</Label>
                <p className="mt-[0.375em] flex items-baseline gap-[0.25em]">
                  <span className="text-[1.875rem] font-bold leading-none text-sg-success-deep">
                    12
                  </span>
                  <span className="text-[0.9375rem] text-sg-ink-muted">days</span>
                </p>
                <p className="mt-[0.25em] text-[0.75rem] text-sg-ink-muted">Target: 20 nights</p>
              </div>
              <div
                className="grid h-[6em] w-[6em] shrink-0 place-items-center rounded-full"
                style={{ background: 'conic-gradient(#4caf50 0 60%, #c0c0c0 60% 100%)' }}
              >
                <span className="grid h-[4.6em] w-[4.6em] place-items-center rounded-full bg-sg-ink-panel text-[1.375rem] font-bold text-sg-success-deep">
                  12
                </span>
              </div>
            </div>
          </Card>

          {/* Emergency Pass */}
          <Card>
            <Label>Emergency Pass</Label>
            <p className="mt-[0.375em] text-[0.8125rem] text-sg-ink-muted">
              Available &mdash; one 60-minute emergency unlock per week.
            </p>
            <span className="mt-[0.75em] inline-block rounded-[5px] border border-sg-amber-border bg-sg-ink-panel px-[0.875em] py-[0.4375em] text-[0.75rem] font-semibold text-sg-ink-muted">
              Use 1-Hour Emergency
            </span>
          </Card>

          {/* Quick Set Curfew */}
          <Card>
            <Label>Quick Set Curfew</Label>
            <div className="mt-[0.5em] grid grid-cols-2 gap-[0.5em]">
              <Field label="Shutdown at" value="10:00 PM" />
              <Field label="For how long" value="7 hours" />
            </div>
            <p className="mt-[0.5em] text-[0.75rem] text-sg-ink-muted">
              Unlocks at 5:00 AM the next morning
            </p>
            <div className="mt-[0.625em] flex gap-[0.5em]">
              <span className="rounded-[5px] border border-sg-ink-card-border bg-sg-ink-panel px-[0.875em] py-[0.4375em] text-[0.75rem] font-semibold text-sg-ink-text">
                Set for Today
              </span>
              <span className="rounded-[5px] border border-sg-ink-card-border bg-sg-ink-panel px-[0.875em] py-[0.4375em] text-[0.75rem] font-semibold text-sg-ink-text">
                Set Daily
              </span>
            </div>
          </Card>

          {/* history heatmap, from the HISTORY tab */}
          <Card>
            <div className="flex items-center justify-between">
              <Label>Last 12 weeks</Label>
              <span className="flex gap-[0.125em]" aria-hidden="true">
                {heatColor.map((color) => (
                  <span
                    key={color}
                    className="h-[0.75em] w-[0.75em] rounded-[2px]"
                    style={{ background: color }}
                  />
                ))}
              </span>
            </div>
            <div className="mt-[0.5em] grid grid-cols-12 gap-[0.1875em]">
              {heat.map((level, index) => (
                <span
                  key={`heat-${index}`}
                  className="aspect-square rounded-[2px]"
                  style={{ background: heatColor[level] }}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MockFrame>
  );
}

function Card({ children }: { readonly children: React.ReactNode }) {
  return (
    <div
      className="rounded-[10px] border border-sg-ink-card-border bg-sg-ink-panel p-[1em]"
      style={{ boxShadow: '0 1px 8px rgb(0 0 0 / 0.12)' }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { readonly children: React.ReactNode }) {
  return <p className="text-[0.75rem] text-sg-ink-muted">{children}</p>;
}

function Field({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div>
      <p className="text-[0.6875rem] text-sg-ink-muted">{label}</p>
      <p className="mt-[0.25em] rounded-[5px] border border-sg-ink-card-border bg-sg-ink-panel px-[0.5em] py-[0.375em] text-[0.8125rem] font-semibold text-sg-ink-text">
        {value}
      </p>
    </div>
  );
}
