import Link from 'next/link';

import { PageWrapper } from './components/PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper>
      <main id="main">
        <div className="content">
          <section className="flex max-w-2xl flex-col gap-5">
            <p className="m-0 text-sm font-medium uppercase tracking-widest text-site-body-muted">
              404
            </p>
            <div className="flex flex-col gap-3">
              <h1 className="m-0 text-4xl font-bold leading-tight text-site-foreground">
                Página não encontrada
              </h1>
              <p className="m-0 text-site-body">
                O caminho que você tentou acessar não existe ou foi movido.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="font-semibold underline">
                Voltar para a home
              </Link>
              <Link href="/writings" className="font-semibold underline">
                Ver artigos
              </Link>
            </div>
          </section>
        </div>
      </main>
    </PageWrapper>
  );
}
