import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

import { Scrollbar } from 'src/components/scrollbar';

// Dummy data for static list
const staticList = [
  {
    id: 1,
    name: 'Pabbly Connect',
    coverUrl: '/static/images/products/product_1.jpg',
    signup_url: 'https://accounts.pabbly.com/signup/?s=connect',
    login_url: 'https://accounts.pabbly.com/login/?s=connect',
  },
  {
    id: 2,
    name: 'Pabbly Subscription Billing',
    coverUrl: '/static/images/products/product_1.jpg',
    signup_url: 'https://accounts.pabbly.com/signup/?s=pabbly-subscriptions',
    login_url: 'https://accounts.pabbly.com/login/?s=pabbly-subscriptions',
  },
  {
    id: 3,
    name: 'Pabbly Form Builder',
    coverUrl: '/static/images/products/product_1.jpg',
    signup_url: 'https://accounts.pabbly.com/signup/?s=formget',
    login_url: 'https://accounts.pabbly.com/login/?s=formget',
  },
  {
    id: 4,
    name: 'Pabbly Email Marketing',
    coverUrl: '/static/images/products/product_1.jpg',
    signup_url: 'https://accounts.pabbly.com/signup/?s=mailget',
    login_url: 'https://accounts.pabbly.com/login/?s=mailget',
  },
  {
    id: 5,
    name: 'Pabbly Email Verification',
    coverUrl: '/static/images/products/product_1.jpg',
    signup_url: 'https://accounts.pabbly.com/signup/?s=emailverify',
    login_url: 'https://accounts.pabbly.com/login/?s=emailverify',
  },
];

// ----------------------------------------------------------------------

export function EcommerceLatestProducts({ title, subheader, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar sx={{ minHeight: 384 }}>
        <Box
          sx={{
            p: 3,
            gap: 3,
            minWidth: 360,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {staticList.map((item) => (
            <Item key={item.id} item={item} title={title} />
          ))}
        </Box>
      </Scrollbar>
    </Card>
  );
}

function Item({ item, title, sx, ...other }) {
  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    >
      <Avatar
        variant="rounded"
        alt={item.name}
        src={item.coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      />

      <Box
        sx={{ gap: 0.5, minWidth: 0, display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}
      >
        <Link noWrap href={title === 'Sign-up Links' ? item.signup_url : item.login_url} sx={{ color: 'text.primary', typography: 'subtitle2' }}>
          {item.name}
        </Link>
        <Link noWrap href={title === 'Sign-up Links' ? item.signup_url : item.login_url} sx={{ color: 'text.primary', typography: 'subtitle2' }}>
          {title === 'Sign-up Links' ? item.signup_url : item.login_url}
        </Link>
      </Box>
    </Box>
  );
}
