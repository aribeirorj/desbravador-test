/** Esqueleto no formato do cartão: a página não "pula" quando os dados chegam. */
export function UserProfileCardPlaceholder() {
  return (
    <div className="card shadow-sm" aria-busy="true">
      <span className="visually-hidden">Carregando perfil…</span>
      <div className="card-body placeholder-glow" aria-hidden="true">
        <div className="text-center">
          <span
            className="placeholder rounded-circle d-inline-block mb-3"
            style={{ width: 160, height: 160 }}
          />
          <span className="placeholder placeholder-lg col-7 d-block mx-auto mb-2" />
          <span className="placeholder col-4 d-block mx-auto" />
        </div>
        <div className="row g-0 my-4">
          <span className="placeholder placeholder-lg col-4 offset-1" />
          <span className="placeholder placeholder-lg col-4 offset-2" />
        </div>
        <span className="placeholder col-3 d-block mb-1" />
        <span className="placeholder col-8 d-block mb-3" />
        <span className="placeholder col-2 d-block mb-1" />
        <span className="placeholder col-10 d-block" />
      </div>
    </div>
  );
}
