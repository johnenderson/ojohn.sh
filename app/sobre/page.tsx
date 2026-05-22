import Link from 'next/link';
import type { Metadata } from 'next';

import { PageWrapper } from 'app/components/PageWrapper';

export const metadata: Metadata = {
  title: 'Sobre mim',
  description: 'Sobre John Enderson',
};

export default function Page() {
  return (
    <PageWrapper>
      <main id="main">
        <div className="content">
          <div className="flex flex-col items-start gap-6 mt-8">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-site-body-muted border border-site-border-muted px-3 py-1">
                em construção
              </span>
            </div>

            <h1 className="text-2xl font-bold m-0 text-site-foreground">
              Sobre mim
            </h1>

            <p className="text-site-body-muted m-0 leading-relaxed">
              Essa página ainda está sendo escrita. Volte em breve.
            </p>

            <div className="w-12 h-px bg-site-border-muted mt-2" />

            <p className="text-site-body-muted text-sm m-0">
              Enquanto isso, você pode ler os{' '}
              <Link href="/writings" className="text-site-foreground hover:text-site-primary-hover transition-colors">
                artigos
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
