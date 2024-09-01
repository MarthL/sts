import React from 'react';
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';

interface ListItemProfileProps {
  icon: any;
  text: string;
  index: number;
  selectedIndex: number;
  handleListItemClick: (index: number) => void;
}

export const ListItemProfile: React.FC<ListItemProfileProps> = (props: ListItemProfileProps) => {
  const { icon, text, index, selectedIndex, handleListItemClick } = props;

  return (
    <>
      <List sx={{ my: 0, py: 0 }}>
        <ListItem disablePadding>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon sx={{ ml: 15 }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}