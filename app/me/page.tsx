import Link from 'next/link';

import { PageWrapper } from '../components/PageWrapper';
import {
  faCakeCandles,
  faCode,
  faGraduationCap,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Metadata } from 'next';

import { PageTitle } from '@/base/components/PageTitle';

export const metadata: Metadata = {
  title: 'Sobre mim',
  description: 'Sobre John Enderson',
};

const tldrCards = [
  {
    icon: faCakeCandles,
    cardClassName: 'border-pink-500 bg-pink-500/20',
    iconClassName: 'bg-pink-500',
    pretitleClassName: 'text-pink-300',
    pretitle: 'Aniversário',
    title: '02 de fevereiro',
    description: 'Aquário',
  },
  {
    icon: faHandshake,
    cardClassName: 'border-yellow-500 bg-yellow-500/20',
    iconClassName: 'bg-yellow-500',
    pretitleClassName: 'text-yellow-300',
    pretitle: 'Pronomes',
    title: 'ele/dele',
    description: 'Pronomes pessoais',
  },
  {
    icon: faCode,
    cardClassName: 'border-blue-500 bg-blue-500/20',
    iconClassName: 'bg-blue-500',
    pretitleClassName: 'text-blue-300',
    pretitle: 'Trampo',
    title: 'Itaú Unibanco',
    description: 'Engenheiro de Software',
    href: 'https://www.linkedin.com/company/itau/',
  },
  {
    icon: faGraduationCap,
    cardClassName: 'border-emerald-500 bg-emerald-500/20',
    iconClassName: 'bg-emerald-500',
    pretitleClassName: 'text-emerald-300',
    pretitle: 'Educação',
    title: 'Uninove',
    description: '2020 - 2025',
  },
];

export default function Page() {
  return (
    <PageWrapper>
      <main id="main">
        <div className="content">
          <div className="flex max-w-5xl flex-col items-start gap-8">
            <PageTitle
              title="Sobre mim"
              subtitle="Um pouco sobre trabalho, vida e o que existe entre uma coisa e outra."
            />

            <div className="h-px w-full bg-site-border-muted" />

            <section
              aria-labelledby="tldr-title"
              className="flex w-full flex-col gap-6"
            >
              <h2
                id="tldr-title"
                className="m-0 text-2xl font-bold text-site-foreground"
              >
                TL;DR
              </h2>

              <ul className="m-0 grid w-full list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {tldrCards.map((card) => (
                  <li
                    key={card.pretitle}
                    className={`flex gap-3 rounded border p-3 ${card.cardClassName}`}
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded text-white ${card.iconClassName}`}
                    >
                      <FontAwesomeIcon icon={card.icon} className="size-5" />
                    </span>
                    <div>
                      <h3
                        className={`m-0 text-xs font-semibold uppercase ${card.pretitleClassName}`}
                      >
                        {card.pretitle}
                      </h3>
                      {card.href ? (
                        <Link
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mb-0.5 block font-semibold leading-5 text-site-foreground hover:text-site-primary-hover transition-colors"
                        >
                          {card.title}
                        </Link>
                      ) : (
                        <p className="mb-0.5 mt-0 font-semibold leading-5 text-site-foreground">
                          {card.title}
                        </p>
                      )}
                      <p className="m-0 text-sm leading-4 text-site-body-muted">
                        {card.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <div className="h-px w-full bg-site-border-muted" />

            <section
              aria-labelledby="personally-title"
              className="flex w-full max-w-3xl flex-col gap-6"
            >
              <h2
                id="personally-title"
                className="m-0 text-2xl font-bold text-site-foreground"
              >
                Pessoalmente
              </h2>

              <div className="flex flex-col gap-5 text-site-body-muted leading-relaxed">
                <p className="m-0">Oi, eu sou o John!</p>

                <p className="m-0">
                  Atualmente sou Engenheiro de Software no{' '}
                  <Link
                    href="https://www.linkedin.com/company/itau/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-site-foreground hover:text-site-primary-hover transition-colors"
                  >
                    Itaú Unibanco
                  </Link>
                  , atuando na comunidade de Gerir Finanças para clientes PJ.
                  Meu principal papel dentro da squad é garantir a
                  confiabilidade de jornadas críticas que transacionam bilhões
                  e, em alguns cenários, trilhões de reais mensalmente.
                </p>

                <p className="m-0">
                  Grande parte do meu tempo é dedicada a garantir que nossas
                  soluções estejam aderentes às diretrizes, mandates e
                  requisitos de compliance do banco. Também sou um aspirante a{' '}
                  <Link
                    href="https://sre.google/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-site-foreground hover:text-site-primary-hover transition-colors"
                  >
                    SRE
                  </Link>{' '}
                  (Site Reliability Engineer), papel que desempenho dentro da
                  squad, com foco em observabilidade, resiliência e estabilidade
                  de sistemas distribuídos.
                </p>

                <p className="m-0">
                  Trabalho principalmente com Java e Spring Boot, tecnologias
                  que utilizo para resolver problemas de negócio e dos clientes.
                  Também uso Terraform e AWS para criar e gerenciar
                  infraestrutura. Participar de uma modernização me trouxe
                  muitas experiências boas, visão de negócio e muita
                  responsabilidade.
                </p>

                <p className="m-0">
                  Fora do horário comercial, quando não estou lendo, explorando
                  o{' '}
                  <Link
                    href="https://www.datadoghq.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-site-foreground hover:text-site-primary-hover transition-colors"
                  >
                    Datadog
                  </Link>{' '}
                  ou escrevendo código, provavelmente estou em uma call no
                  Discord com amigos ou em algum lugar do mundo vivendo
                  experiências totalmente distantes da tecnologia.
                </p>

                <p className="m-0">
                  Ah, e eu também sou pai de pet. A Maya é a responsável por me
                  lembrar que existe vida fora da tecnologia. rs
                </p>
              </div>
            </section>

            <div className="h-px w-full bg-site-border-muted" />

            <p className="text-site-body-muted text-sm m-0">
              Você também pode ler meus{' '}
              <Link
                href="/writings"
                className="text-site-foreground hover:text-site-primary-hover transition-colors"
              >
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
