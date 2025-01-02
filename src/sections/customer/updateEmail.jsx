import { z as zod } from 'zod';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Alert, Stack, Button, Snackbar, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { listItems } from 'src/_mock/big-card/_dashboardBigCardListItems';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import PageHeader from 'src/components/page-header/page-header';

import AddDialog from 'src/sections/one/components/dialog/add-dialog';

const metadata = { title: `Password Reset | Admin - ${CONFIG.site.name}` };
const { items, style } = listItems;

const EmailUpdateSchema = zod.object({
  oldEmail: zod
    .string()
    .min(1, { message: 'Old email is required!' })
    .email({ message: 'Invalid email address!' }),
  newEmail: zod
    .string()
    .min(1, { message: 'New email is required!' })
    .email({ message: 'Invalid email address!' }),
});

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

  const password = useBoolean();

  const defaultValues = { oldEmail: '', newEmail: '' };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(EmailUpdateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const buttonClick = () => {
    setAddSubaccountDialogOpen(true);
  };

  const handleAdd = () => {
    // Validate fields

    // Only proceed if no validation errors

    setSnackbarState({
      open: true,
      message: 'Successfull message',
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
            title="Update Customer Email"
            Subheading="From here, account email will be updated in Connect, PSB, PEM,"
            link_added="#"
          />
        </Box>
        <Box mt={4}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
              <Field.Text name="oldEmail" type="email" label="Old Email" />

              <Field.Text
                name="newEmail"
                type="email"
                label="New Email"
                helperText={
                  <Stack component="span" direction="row" alignItems="center">
                    <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Before changing
                    email, make sure that the customer does not have the affiliate associated with
                    the email. As changing the email will impact the affiliate links.
                  </Stack>
                }
              />

              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting}
                sx={{ ml: 'auto' }}
              >
                Submit
              </LoadingButton>
            </Card>
          </Form>
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
