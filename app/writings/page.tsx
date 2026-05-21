import { PageWrapper } from 'app/components/PageWrapper';
import type { Metadata } from 'next';

import { Writings } from 'Home/components/Writings';

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Artigos por John Enderson',
  openGraph: {
    images: [{ url: 'https://johnenderson.com/logo.jpeg' }],
  },
};

export default function Page() {
  return (
    <PageWrapper>
      <main id="main">
        <div className="content">
          <Writings header="h1" />
        </div>
      </main>
    </PageWrapper>
  );
}
