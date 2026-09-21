export function RepositoryDetailsPlaceholder() {
  return (
    <div className="card shadow-sm" aria-busy="true">
      <span className="visually-hidden">Carregando repositório…</span>
      <div className="card-body p-4 placeholder-glow" aria-hidden="true">
        <span className="placeholder placeholder-lg col-5 d-block mb-4" />
        {[8, 3, 4].map((width, index) => (
          <div key={index} className="mb-3">
            <span className="placeholder placeholder-sm col-2 d-block mb-1" />
            <span className={`placeholder col-${width} d-block`} />
          </div>
        ))}
      </div>
    </div>
  );
}
