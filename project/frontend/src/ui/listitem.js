import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
      </ListItemIcon>
      <ListItemText primary="ส่งผลทดสอบเครื่องวัด" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      </ListItemIcon>
      <ListItemText primary="แจ้งขอเปลี่ยน/ลบ เครื่องวัด" />
    </ListItemButton>
  </React.Fragment>
);
