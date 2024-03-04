import React from 'react';
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import { ArrowDownward, ArrowForwardIos } from '@mui/icons-material';

interface ListItemProfileProps {
  icon: React.ReactNode;
  text: string;
  index: number;
  selectedIndex: number;
  handleListItemClick: (index: number) => void;
}

export const ListItemProfile: React.FC<ListItemProfileProps> = (props: ListItemProfileProps) => {
  const { icon, text, index, selectedIndex, handleListItemClick } = props;

  return (
    <>
      <List sx={{ marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
            {selectedIndex === index && <div style={{ marginLeft: 20 }}> <ArrowDownward /> </div>}
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}