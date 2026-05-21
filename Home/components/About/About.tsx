import { FC } from 'react';

import { Divider } from 'Base/components/Divider';
import { SocialIcons } from 'Base/components/SocialIcons';

export const About: FC = () => (
  <section id="about" className="flex flex-col gap-4">
    <div>
      <p className="no-margin-top">
        🇯🇵🇧🇷 . software engineer . writer . researcher
      </p>
      <p className="no-margin text-[#c1c1c1] light:text-[#666]">
        mathematics . machine learning . science
        <br />
        software & performance engineering
      </p>
    </div>
    <SocialIcons />
    <Divider />
  </section>
);
