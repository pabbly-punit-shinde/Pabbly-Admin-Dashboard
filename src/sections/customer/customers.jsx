import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { Box, Alert, Button, Tooltip, Snackbar, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import AddDialog from 'src/sections/one/components/dialog/add-dialog';
import { UsersTable } from 'src/sections/users/components/table/users-table';

// ----------------------------------------------------------------------

const metadata = { title: `Customers | Admin - ${CONFIG.site.name}` };
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
            title="Customers"
            Subheading="Track all the customers and their activities you can also create new customers."
            link_added="#"
          />
          <Tooltip
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
              Create Customer
            </Button>
          </Tooltip>
        </Box>

        <Box mt={4}>
          <UsersTable />
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
