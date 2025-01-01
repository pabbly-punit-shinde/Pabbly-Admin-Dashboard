import Box from '@mui/material/Box';
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
  ListItemText,
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
      case 'verified':
        return 'success';
      case 'unverified':
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
              event.stopPropagation();
              onSelectRow();
            }}
            inputProps={{ 'aria-labelledby': row.id }}
          />
        </TableCell>

        {/* First Name */}
        <TableCell>
          <Tooltip arrow placement="top" disableInteractive title={`First Name: ${row.firstName}.`}>
            <Typography
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
              }}
              onClick={() => onNameClick(row.firstName)}
            >
              {row.firstName}
            </Typography>
          </Tooltip>
        </TableCell>

        {/* Last Name */}
        <TableCell>
          <Tooltip arrow placement="top" disableInteractive title={`Last Name: ${row.lastName}.`}>
            <Typography
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
              }}
              onClick={() => onNameClick(row.lastName)}
            >
              {row.lastName}
            </Typography>
          </Tooltip>
        </TableCell>

        {/* Email */}
        <TableCell>
          <Tooltip arrow placement="top" disableInteractive title={`Email: ${row.email}.`}>
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

        {/* Country */}
        <TableCell>
          <Tooltip arrow placement="top" disableInteractive title={`Email: ${row.country}.`}>
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
              {row.country}
            </Box>
          </Tooltip>
        </TableCell>

        {/* Project */}
        <TableCell>
          <Tooltip arrow placement="top" disableInteractive title={`Email: ${row.project}.`}>
            <ListItemText
              disableTypography
              primary={
                <Box
                  component="span"
                  sx={{
                    color: 'text.primary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'wrap',
                    maxWidth: '300px',
                    display: 'inline-block',
                  }}
                >
                  {row.project}
                </Box>
              }
              secondary={
                <Box
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'wrap',
                    maxWidth: '300px',
                    display: 'inline-block',
                  }}
                >
                  {row.projectCreated}
                </Box>
              }
              sx={{ display: 'flex', flexDirection: 'column' }}
            />
          </Tooltip>
        </TableCell>

        {/* ipCreatedAt */}
        <TableCell>
          <Tooltip arrow placement="top" disableInteractive title={`Email: ${row.ipCreatedAt}.`}>
            <ListItemText
              disableTypography
              primary={
                <Box
                  component="span"
                  sx={{
                    color: 'text.primary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'wrap',
                    maxWidth: '300px',
                    display: 'inline-block',
                  }}
                >
                  {row.ipCreatedAt}
                </Box>
              }
              secondary={
                <Box
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'wrap',
                    maxWidth: '300px',
                    display: 'inline-block',
                  }}
                >
                  {row.ipCreatedOn}
                </Box>
              }
              sx={{ display: 'flex', flexDirection: 'column' }}
            />
          </Tooltip>
        </TableCell>

        {/* ipLastLoggedinAt */}
        <TableCell>
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`Email: ${row.ipLastLoggedinAt}.`}
          >
            <ListItemText
              disableTypography
              primary={
                <Box
                  component="span"
                  sx={{
                    color: 'text.primary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'wrap',
                    maxWidth: '300px',
                    display: 'inline-block',
                  }}
                >
                  {row.ipLastLoggedinAt}
                </Box>
              }
              secondary={
                <Box
                  component="span"
                  sx={{
                    color: 'text.secondary',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'wrap',
                    maxWidth: '300px',
                    display: 'inline-block',
                  }}
                >
                  {row.ipLastLoggedOn}
                </Box>
              }
              sx={{ display: 'flex', flexDirection: 'column' }}
            />
          </Tooltip>
        </TableCell>

        {/* refrer */}
        <TableCell>
          <Tooltip arrow placement="top" disableInteractive title={`Email: ${row.refrer}.`}>
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
              {row.refrer}
            </Box>
          </Tooltip>
        </TableCell>

        {/* Status */}
        <TableCell align="right">
          <Tooltip
            arrow
            placement="top"
            disableInteractive
            title={`User Status: ${row.status === 'verified' ? 'Verified' : 'Unverified'}`}
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

        {/* Actions */}
        <TableCell
          align="right"
          sx={{ px: 1, whiteSpace: 'nowrap' }}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title="More actions" arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* Popover Menu */}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Update this user" arrow placement="left">
            <MenuItem sx={{ color: 'main' }}>
              <Iconify icon="material-symbols:login" />
              Login As 
            </MenuItem>
          </Tooltip>

          <Tooltip title="Update this user" arrow placement="left">
            <MenuItem sx={{ color: 'main' }}>
              <Iconify icon="material-symbols:person-cancel-rounded" />
              Unverify
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />

          <Tooltip title="Delete this user" arrow placement="left">
            <MenuItem sx={{ color: 'error.main' }}>
              <Iconify icon="material-symbols:block" />
              Block
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>
    </>
  );
}
