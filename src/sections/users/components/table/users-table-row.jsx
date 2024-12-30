import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {
  Divider,
  Tooltip,
  MenuItem,
  MenuList,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function UsersTableRow({ row, selected, onSelectRow, onNameClick }) {
  const popover = usePopover();
  const timezone = ', (UTC+05:30) Asia/Kolkata';

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };
  const getStatusLabel = (status) => status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <>
      <TableRow hover selected={selected} sx={{ cursor: 'pointer' }}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onChange={(event) => {
              event.stopPropagation(); // Keep this if you need to prevent row click events
              onSelectRow(); // This will now work properly
            }}
            inputProps={{ 'aria-labelledby': row.id }}
          />
        </TableCell>
        <TableCell width={100}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Tooltip arrow placement="top" disableInteractive title={`ID of the user: ${row.id}.`}>
              <Box
                component="span"
                sx={{
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100px',
                  display: 'inline-block',
                }}
              >
                {row.id}
              </Box>
            </Tooltip>
          </Stack>
        </TableCell>

        <TableCell width={300}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip
              arrow
              placement="top"
              disableInteractive
              title={`Name of the user: ${row.name}.`}
            >
              <Box
                component="span"
                sx={{
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px',
                  display: 'inline-block',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => onNameClick(row.name)}
                >
                  {row.name}
                </Typography>
              </Box>
            </Tooltip>
          </Stack>
        </TableCell>

        <TableCell width={340}>
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Email of the user: ${row.email}.`}
          >
            <Box
              component="span"
              sx={{
                color: 'text.primary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '300px',
                display: 'inline-block',
              }}
            >
              {row.email}
            </Box>
          </Tooltip>
        </TableCell>

        <TableCell width={140}>
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Registration date of the user: ${row.regDate}${timezone}.`}
          >
            <Box
              component="span"
              sx={{
                color: 'text.primary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '300px',
                display: 'inline-block',
              }}
            >
              {row.regDate}
            </Box>
          </Tooltip>
        </TableCell>

        <TableCell width={140} align="right">
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Status of user is: ${row.status === 'active' ? `Active` : `Inactive`}`}
          >
            <Label
              variant="soft"
              color={getStatusColor(row.status)}
              sx={{ textTransform: 'capitalize' }}
            >
              {getStatusLabel(row.status)}
            </Label>
          </Tooltip>
        </TableCell>
        <TableCell
          align="right"
          sx={{ px: 1, whiteSpace: 'nowrap' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title="Click to see options." arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Update connection." arrow placement="left">
            <MenuItem sx={{ color: 'secondary' }}>
              <Iconify icon="material-symbols:settings-b-roll-rounded" />
              Update
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip title="Delete connection." arrow placement="left">
            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>
    </>
  );
}
