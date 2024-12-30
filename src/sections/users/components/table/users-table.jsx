import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Tab, Tabs, Divider, Tooltip, CardHeader, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsBetween } from 'src/utils/format-time';

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
    id: 'id',
    label: 'ID',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Date and time when the email verification action occurred.',
  },

  {
    id: 'name',
    label: 'Name',
    width: 'flex',
    whiteSpace: 'nowrap',
    tooltip: 'Description of the email verification action or status update.',
  },

  {
    id: 'email',
    label: 'Email',
    width: 'flex',
    whiteSpace: 'nowrap',

    tooltip: 'Details for the action happened to list.',
  },
  {
    id: 'reg_date',
    label: 'Reg. Date',
    width: 'flex',
    whiteSpace: 'nowrap',

    tooltip: 'Current state of the email verification credits.',
  },
  {
    id: 'status',
    label: 'Status',
    width: 'flex',
    whiteSpace: 'nowrap',
    align: 'right',
    tooltip: 'Current state of the email verification credits.',
  },

  { id: '', width: 10 },
];

const dataOn = [
  {
    id: '565743434',
    name: 'Ankit Mandli',
    email: 'ankit.mandli@pabbly.com',

    regDate: 'Oct 23, 2024 17:45:32',
    status: 'active',
  },
  {
    id: '565743434',
    name: 'Abhishek Nagar',
    email: 'ankit.mandli@pabbly.com',

    regDate: 'Oct 23, 2024 17:45:32',
    status: 'active',
  },
  {
    id: '565743434',
    name: 'Rajendra Jatav',
    email: 'ankit.mandli@pabbly.com',

    regDate: 'Oct 23, 2024 17:45:32',
    status: 'active',
  },
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
              <Typography variant="h6">Manage Users</Typography>
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
                  (tab.value === 'active' && 'success') ||
                  (tab.value === 'inactive' && 'error') ||
                  'default'
                }
              >
                {['active', 'inactive'].includes(tab.value)
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

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  let filteredData = inputData;

  // Filter by message (name)
  if (name) {
    filteredData = filteredData.filter(
      (order) => order.message && order.message.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by status
  if (status !== 'all') {
    filteredData = filteredData.filter((order) => order.status === status);
  }

  // Filter by date range
  if (!dateError) {
    if (startDate && endDate) {
      filteredData = filteredData.filter((order) =>
        fIsBetween(new Date(order.dateCreatedOn), startDate, endDate)
      );
    }
  }

  return filteredData;
}
