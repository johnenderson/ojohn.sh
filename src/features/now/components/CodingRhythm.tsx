const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

type CodingRhythmProps = {
  rhythm: number[];
};

export const CodingRhythm = ({ rhythm }: CodingRhythmProps) => {
  const max = Math.max(...rhythm, 1);
  const busiest = rhythm.indexOf(Math.max(...rhythm));

  return (
    <div className="rounded-md border border-site-border-muted bg-site-card p-4 sm:p-5">
      <h3 className="m-0 text-base font-semibold text-site-foreground">
        Quando eu codo
      </h3>
      <p className="mb-5 mt-1 text-xs text-site-body-muted">
        Contribuições por dia da semana (último ano)
      </p>
      <div className="flex items-end gap-1.5">
        {rhythm.map((count, index) => {
          const height = Math.round((count / max) * 100);
          const isBusiest = index === busiest && count > 0;

          return (
            <div
              key={WEEKDAYS[index]}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-24 w-full items-end">
                <div
                  className={`w-full rounded-sm transition-all ${
                    isBusiest ? 'bg-site-primary' : 'bg-site-card-hover'
                  }`}
                  style={{ height: `${Math.max(height, 6)}%` }}
                  title={`${WEEKDAYS[index]}: ${count} contribuições`}
                />
              </div>
              <span className="text-[11px] font-medium text-site-body-muted">
                {WEEKDAYS[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
