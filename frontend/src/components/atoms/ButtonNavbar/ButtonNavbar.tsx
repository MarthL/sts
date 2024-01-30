import { Box, IconButton, Tooltip } from '@mui/material';
import { Home, People, Person, ExitToApp } from '@mui/icons-material';

interface ButtonNavbarProps {
  title: 'home' | 'people' | 'person' | 'logout';
}

// interface IconComponentProps {
//   title: string;
// }

export const ButtonNavbar: React.FC<ButtonNavbarProps> = (props: ButtonNavbarProps) => {
  const { title } = props;

  const color = 'primary'
  const styles = `"&:hover": { color: "black" }, fontSize: 30`
  
  const renderUpperCase = (stringToConvert: string) => {
    return stringToConvert[0].toUpperCase() + stringToConvert.slice(1).toLowerCase();
  }


  // Use those parameter to render the correct button
  const iconComponent: { [key in ButtonNavbarProps['title']]: React.ReactNode } = {
    home : <Home color={color} sx={{styles}} />,
    people: <People color={color} sx={{styles}} />,
    person: <Person color={color} sx={{styles}} />,
    logout: <ExitToApp color={color} sx={{styles}} />
  };
  
  const icon = iconComponent[title];

  return(
      <Box mx={1}>
      <Tooltip title={renderUpperCase(title)}>
          <IconButton>
                {icon}
          </IconButton>
      </Tooltip>
  </Box>
    )

    
}