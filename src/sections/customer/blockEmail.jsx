import { z as zod } from 'zod';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Alert,
  Stack,
  Radio,
  Button,
  Snackbar,
  RadioGroup,
  Typography,
  Autocomplete,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';

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
  newEmail: zod.array(zod.string()).min(1, { message: 'New email is required!' }),
});

const appsOptions = [
  { label: 'Connect', value: 'connect' },
  { label: 'Subscription Billing', value: 'subscriptionbilling' },
  { label: 'Email Marketing', value: 'emailmarketing' },
  { label: 'Form Builder', value: 'formbuilder' },
  { label: 'Hook', value: 'hook' },
  { label: 'Chatflow', value: 'chatflow' },
  { label: 'Email Verification', value: 'emailverification' },
  // Add more options as needed
];

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

  const defaultValues = { oldEmail: '', newEmail: [] };

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

  const [status, setStatus] = useState('block'); // Add state for status

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
            title="Block/Unblock Customer"
            Subheading="Block customer at application level."
            link_added="#"
          />
        </Box>
        <Box mt={4}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
              <Field.Text name="email" type="email" label="Customer's Email" />
              <Autocomplete
                multiple
                options={appsOptions}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => {
                  methods.setValue(
                    'apps',
                    value.map((option) => option.value)
                  );
                }}
                renderInput={(params) => (
                  <Field.Text
                    {...params}
                    name="pabblyapplication"
                    label="Pabbly Application"
                    helperText={
                      <Stack component="span" direction="row" alignItems="center">
                        <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} />
                        If you block a customer in the Pabbly Email Marketing app, it only blocks
                        them from that specific app, not their entire account.
                      </Stack>
                    }
                  />
                )}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
                <Box>
                  <Typography variant="subtitle2">Status:</Typography>
                  <Stack direction="row" spacing={2}>
                    <RadioGroup
                      row
                      name="status"
                      value={status}
                      onChange={(event) => setStatus(event.target.value)}
                    >
                      <FormControlLabel value="block" control={<Radio />} label="Block" />
                      <FormControlLabel value="unblock" control={<Radio />} label="Unblock" />
                    </RadioGroup>
                  </Stack>
                </Box>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  sx={{ ml: 'auto' }}
                >
                  Submit
                </LoadingButton>
              </Box>
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
