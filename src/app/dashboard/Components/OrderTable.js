import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



function Row(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  
  const OrderAddon = ( {order_group_addon} ) => {
    let addonName;


    if (order_group_addon.length>0) {
      const orderAddon = order_group_addon.map(addon => addon.addon);
      addonName = orderAddon.map(addon => addon.name).join(',');
    } else {
      addonName = 'NA';
    }
    return addonName;
}
const ShippingInformation = ({ orderGroup }) => {
    let shippingDate, trackingNum;
    if (orderGroup && orderGroup.plan && orderGroup.plan.subscription) {
      shippingDate = orderGroup.plan.subscription.shipping_date;
      trackingNum = orderGroup.plan.subscription.tracking_num;
    } else if (orderGroup && orderGroup.device) {
      shippingDate = orderGroup.device.customer_standalone_device.shipping_date;
      trackingNum = orderGroup.device.customer_standalone_device.tracking_num;
    } else if (orderGroup && orderGroup.sim) {
      shippingDate = orderGroup.sim.customer_standalone_sim.shipping_date;
      trackingNum = orderGroup.sim.customer_standalone_sim.tracking_num;
    }
    return [shippingDate,trackingNum];
}

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {order.order_num}
        </TableCell>
        <TableCell >{order.created_at}</TableCell>
        <TableCell >${order.invoice.subtotal}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >shipping Date</TableCell>
                    <TableCell>Tracking Date</TableCell>
                    <TableCell >Device Name</TableCell>
                    <TableCell >Plans</TableCell>
                    <TableCell >SIMs</TableCell>
                    <TableCell >Add-ons</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {order&&order.all_order_group&&order.all_order_group.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {ShippingInformation(historyRow)[0]?ShippingInformation(historyRow)[0]:"NA"}
                      </TableCell>
                      <TableCell>
                        {ShippingInformation(historyRow)[1]||"NA"}                      </TableCell>
                      <TableCell >
                        {historyRow.device&&historyRow.device.name?historyRow.device.name:"NA"}
                        </TableCell>
                      <TableCell >
                        {historyRow.plan&&historyRow.plan.name?historyRow.plan.name:"NA"}
                        </TableCell>
                      <TableCell >
                        {historyRow.sim&&historyRow.sim.name?historyRow.sim.name:"NA"}
                        </TableCell>

                      <TableCell >
                        {OrderAddon(historyRow)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


export default function OrderTable({customer}) {
  return (
    <TableContainer  component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <TableCell >Order Number</TableCell>            
            <TableCell >Order Date</TableCell>
            <TableCell >Amount</TableCell>
            <TableCell >Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customer&&customer.orders&&customer.orders.map((order) => (
            <Row key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}