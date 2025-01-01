import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Tab, Tabs, Divider, Tooltip, CardHeader, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { varAlpha } from 'src/theme/styles';
import { USERS_STATUS_OPTIONS } from 'src/_mock/_table/_users';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  rowInPage,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import { UsersTableRow } from './users-table-row';
import { UsersTableToolbar } from './users-table-toolbar';
import { AddContactsListDrawer } from '../drawers/add-contact-list';
import { UsersTableFiltersResult } from './users-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'All', tooltip: 'All uploaded lists.' },
  ...USERS_STATUS_OPTIONS,
];
const TABLE_HEAD = [
  {
    id: 'firstName',
    label: 'First Name',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },
  {
    id: 'lastName',
    label: 'Last Name',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },

  {
    id: 'email',
    label: 'Email',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },
  {
    id: 'country',
    label: 'Country',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },
  {
    id: 'project',
    label: 'Project/Created At',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },
  {
    id: 'ipCreatedAt',
    label: 'IP/Created At',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },
  {
    id: 'ipLastLoggedinAt',
    label: 'IP/Last Logged in At',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },
  {
    id: 'refrer',
    label: 'Refrer',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Default-Tooltip',
  },
  {
    id: 'status',
    label: 'Status',
    width: 'flex',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Default-Tooltip',
  },

  { id: '', width: 10 },
];

const dataOn = [
  {
    firstName: 'Rahul',
    lastName: 'Kapoor',
    email: 'rahul.kapoor@example.com',
    country: 'India',
    project: 'Connect',
    projectCreated: 'January 01, 2025 09:30 AM',
    ipCreatedAt: '192.168.1.1',
    ipCreatedOn: 'Jan 01, 2025 09:30 AM',
    ipLastLoggedinAt: '192.168.1.2',
    ipLastLoggedOn: 'Jan 01, 2025 10:00 AM',
    refrer: 'Nitin Verma',
    status: 'unverified',
},
{
    firstName: 'Priya',
    lastName: 'Mehta',
    email: 'priya.mehta@example.com',
    country: 'India',
    project: 'Subscription',
    projectCreated: 'January 01, 2025 11:15 AM',
    ipCreatedAt: '172.16.0.1',
    ipCreatedOn: 'Jan 01, 2025 11:15 AM',
    ipLastLoggedinAt: '172.16.0.2',
    ipLastLoggedOn: 'Jan 01, 2025 11:45 AM',
    refrer: 'Suman Gupta',
    status: 'verified',
},
{
    firstName: 'Ankush',
    lastName: 'Sharma',
    email: 'ankush.sharma@example.com',
    country: 'India',
    project: 'Form Builder',
    projectCreated: 'January 01, 2025 01:05 PM',
    ipCreatedAt: '10.0.0.1',
    ipCreatedOn: 'Jan 01, 2025 01:05 PM',
    ipLastLoggedinAt: '10.0.0.2',
    ipLastLoggedOn: 'Jan 01, 2025 01:35 PM',
    refrer: 'Anjali Singh',
    status: 'verified',
},
{
    firstName: 'Deepa',
    lastName: 'Rao',
    email: 'deepa.rao@example.com',
    country: 'India',
    project: 'Email Marketing',
    projectCreated: 'January 01, 2025 02:20 PM',
    ipCreatedAt: '172.31.255.255',
    ipCreatedOn: 'Jan 01, 2025 02:20 PM',
    ipLastLoggedinAt: '172.31.255.254',
    ipLastLoggedOn: 'Jan 01, 2025 02:50 PM',
    refrer: 'Karthik Reddy',
    status: 'unverified',
},
{
    firstName: 'Ravi',
    lastName: 'Naik',
    email: 'ravi.naik@example.com',
    country: 'India',
    project: 'Connect',
    projectCreated: 'January 01, 2025 03:45 PM',
    ipCreatedAt: '203.0.113.1',
    ipCreatedOn: 'Jan 01, 2025 03:45 PM',
    ipLastLoggedinAt: '203.0.113.2',
    ipLastLoggedOn: 'Jan 01, 2025 04:15 PM',
    refrer: 'Sunita Jain',
    status: 'verified',
},
{
    firstName: 'Sana',
    lastName: 'Patel',
    email: 'sana.patel@example.com',
    country: 'India',
    project: 'Subscription',
    projectCreated: 'January 01, 2025 05:30 PM',
    ipCreatedAt: '198.51.100.1',
    ipCreatedOn: 'Jan 01, 2025 05:30 PM',
    ipLastLoggedinAt: '198.51.100.2',
    ipLastLoggedOn: 'Jan 01, 2025 06:00 PM',
    refrer: 'Amit Kumar',
    status: 'verified',
}


];

// ----------------------------------------------------------------------

export function UsersTable() {
  const [selectedName, setSelectedName] = useState('');
  const addContactListDrawer = useBoolean();

  const table = useTable({
    defaultOrderBy: 'orderNumber',
    defaultSelected: [], // Add this to initialize selected state
  });

  const [tableData, setTableData] = useState(dataOn);

  const filters = useSetState({
    name: '',
    status: 'all',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const handleNameClick = (name) => {
    setSelectedName(name);
    addContactListDrawer.onTrue();
  };

  return (
    <Card>
      <CardHeader
        title={
          <Box display="inline-block">
            <Tooltip
              arrow
              placement="top"
              disableInteractive
              title="View and manage all the users here."
            >
              <Typography variant="h6">Customers Sign-Up Activities</Typography>
            </Tooltip>
          </Box>
        }
        sx={{ pb: 3 }}
      />
      <Divider />
      <Tabs
        value={filters.state.status}
        onChange={handleFilterStatus}
        sx={{
          px: 2.5,
          boxShadow: (theme) =>
            `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
        }}
      >
        {STATUS_OPTIONS.map((tab) => (
          <Tab
            key={tab.value}
            iconPosition="end"
            value={tab.value}
            label={
              <Tooltip disableInteractive placement="top" arrow title={tab.tooltip}>
                <span>{tab.label}</span>
              </Tooltip>
            }
            icon={
              <Label
                variant={
                  ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                  'soft'
                }
                color={
                  tab.value === 'verified' ? 'success' :
                  tab.value === 'unverified' ? 'error' :
                  'default'
                }                
              >
                {['verified', 'unverified'].includes(tab.value)
                  ? tableData.filter((user) => user.status === tab.value).length
                  : tableData.length}
              </Label>
            }
          />
        ))}
      </Tabs>
      <UsersTableToolbar
        filters={filters}
        onResetPage={table.onResetPage}
        numSelected={table.selected.length} // Add this line
      />

      {canReset && (
        <UsersTableFiltersResult
          filters={filters}
          totalResults={dataFiltered.length}
          onResetPage={table.onResetPage}
          sx={{ p: 2.5, pt: 0 }}
        />
      )}

      <Box sx={{ position: 'relative' }}>
        <Scrollbar
        //  sx={{ minHeight: 444 }}
        >
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              showCheckbox
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={dataFiltered.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {dataInPage
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row, index) => (
                  <UsersTableRow
                    key={index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onNameClick={() => handleNameClick(row.name)}
                    onSelectRow={() => {
                      table.onSelectRow(row.id); // Make sure this is called correctly
                    }}
                  />
                ))}

              <TableEmptyRows
                height={table.dense ? 56 : 56 + 20}
                emptyRows={emptyRows(table.page, table.rowsPerPage, dataOn.length)}
              />
              {tableData.length === 0 ? (
                <TableNoData
                  title="Not Data Found"
                  description="No data found in the table"
                  notFound={notFound}
                />
              ) : (
                <TableNoData
                  title="Not Search Found"
                  description={`No search found with keyword "${filters.state.name}"`}
                  notFound={notFound}
                />
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </Box>

      <TablePaginationCustom
        page={table.page}
        count={dataFiltered.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
      <AddContactsListDrawer
        open={addContactListDrawer.value}
        onClose={addContactListDrawer.onFalse}
        selectedName={selectedName}
      />
    </Card>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status, name, startDate, endDate } = filters;

  let filteredData = inputData;

  // Filter by name (firstName or lastName)
  if (name) {
    const lowerName = name.toLowerCase();
    filteredData = filteredData.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerName) ||
        user.lastName.toLowerCase().includes(lowerName)
    );
  }

  // Filter by status
  if (status !== 'all') {
    filteredData = filteredData.filter((user) => user.status.toLowerCase() === status);
  }

  // Apply sorting
  filteredData = filteredData.sort(comparator);

  return filteredData;
}

