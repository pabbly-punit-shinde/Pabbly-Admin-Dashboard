import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `User | Pabbly Admin - ${CONFIG.site.name}` };

export default function Page() {
  
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
    <BlankView/>
  
    </>
  );
}