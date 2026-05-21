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
              <span className="text-xs uppercase tracking-widest text-[#8b8494] border border-[#3a3146] px-3 py-1 light:text-[#777] light:border-[#ddd]">
                em construção
              </span>
            </div>

            <h1 className="text-2xl font-bold m-0 text-white light:text-[#333]">
              Sobre mim
            </h1>

            <p className="text-[#b8b2c2] m-0 leading-relaxed light:text-[#555]">
              Essa página ainda está sendo escrita. Volte em breve.
            </p>

            <div className="w-12 h-px bg-[#3a3146] mt-2 light:bg-[#ddd]" />

            <p className="text-[#8f879b] text-sm m-0 light:text-[#777]">
              Enquanto isso, você pode ler os{' '}
              <Link href="/writings" className="text-[#e8e5ee] hover:text-[#c4b5fd] light:text-[#333] light:hover:text-[#7c3aed] transition-colors">
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
