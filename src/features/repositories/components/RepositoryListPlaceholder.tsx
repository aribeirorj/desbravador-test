export function RepositoryListPlaceholder() {
  return (
    <div aria-busy="true">
      <span className="visually-hidden">Carregando repositórios…</span>
      <div className="row row-cols-1 row-cols-md-2 g-3" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body placeholder-glow">
                <span className="placeholder col-6 d-block mb-3" />
                <span className="placeholder placeholder-sm col-11 d-block mb-1" />
                <span className="placeholder placeholder-sm col-8 d-block mb-3" />
                <span className="placeholder placeholder-sm col-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
