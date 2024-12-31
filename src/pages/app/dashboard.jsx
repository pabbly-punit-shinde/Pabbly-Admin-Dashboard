import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { Box, Alert, Button, Tooltip, Snackbar, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { Iconify } from 'src/components/iconify';
import BigCard from 'src/components/big-card/big-card';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';
import DashboardFolder from 'src/components/dashboard-folder/dashboard-folder';

import AddDialog from 'src/sections/one/components/dialog/add-dialog';
import { UsersTable } from 'src/sections/users/components/table/users-table';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard | Admin - ${CONFIG.site.name}` };
const { items, style } = listItems;

export default function Page() {
  const [addSubaccountDialogOpen, setAddSubaccountDialogOpen] = useState(false);
  const handleAddSubaccountDialogClose = () => setAddSubaccountDialogOpen(false); // State for Add Subaccount dialog
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarState((prev) => ({ ...prev, open: false }));
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const buttonClick = () => {
    setAddSubaccountDialogOpen(true);
  };

  const handleAdd = () => {
    // Validate fields

    // Only proceed if no validation errors

    setSnackbarState({
      open: true,
      message: 'Successfull messgae',
      severity: 'success',
    });

    setAddSubaccountDialogOpen(false);
  };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            mb: 0,
          }}
        >
          <PageHeader
            title="Total Signups Stats (Project Additions)"
            Subheading="This stats shows the total number of  people who signed up to any particular project. This stats also includes people who have migrated from a different application."
            link_added="#"
          />
          {/* <Tooltip
            title="Click here to add WhatsApp Number."
            arrow
            placement="top"
            disableInteractive
          >
            <Button
              onClick={buttonClick}
              sx={{ mt: isMobile ? 2 : 0 }}
              startIcon={
                <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
              }
              size="large"
              variant="contained"
              color="primary"
            >
              Add Button
            </Button>
          </Tooltip> */}
        </Box>
        <Box
          sx={{
            mt: '40px',
            mb: '24px',
            gap: 3,
            display: 'grid',
            flexWrap: 'wrap',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' },
          }}
        >
          <StatsCards
            cardtitle="Total Sign Ups"
            cardstats="939652"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="Pabbly Connect"
            cardstats="520197"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="Pabbly Subscription Billing"
            cardstats="112617"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="Pabbly Form Builder"
            cardstats="124056"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="Pabbly Email Marketing"
            cardstats="112207"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
          <StatsCards
            cardtitle="Pabbly Email Verification"
            cardstats="70575"
            icon_name="2card.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
        </Box>
        <Box
          sx={{
            // mt: 4,
            gap: 3,
            display: 'col',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
          }}
        >
          {/* <Box>
            <DashboardFolder />
          </Box> */}
          <Box width="100%">
            <Box>
              <UsersTable />
            </Box>
          </Box>
          <Box
            width="100%"
            sx={{
              gap: 3,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
            }}
          >
            <Box mt={3}>
              <BigCard
                getHelp={false}
                isVideo
                bigcardtitle="Sign-Up Links"
                buttontitle="Add WhatsApp Number"
                style={style}
                items={items}
              />
            </Box>
            <Box mt={3}>
              <BigCard
                getHelp={false}
                isVideo
                bigcardtitle="Login Links"
                buttontitle="Add WhatsApp Number"
                style={style}
                items={items}
              />
            </Box>
          </Box>
        </Box>
      </DashboardContent>
      <AddDialog
        addDialogOpen={addSubaccountDialogOpen}
        handleDialogClose={handleAddSubaccountDialogClose}
        action={
          <Button onClick={handleAdd} variant="contained" color="primary">
            Action
          </Button>
        }
      />
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          // mt: 13,
          zIndex: theme.zIndex.modal + 9999,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary, // Keeping text color consistent
            '& .MuiAlert-icon': {
              color:
                snackbarState.severity === 'error'
                  ? theme.palette.error.main
                  : theme.palette.success.main,
            },
          }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
