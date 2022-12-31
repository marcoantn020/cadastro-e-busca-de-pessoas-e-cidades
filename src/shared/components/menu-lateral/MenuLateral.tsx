import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { Box } from '@mui/system'

interface IMenuLateralProps {
  children: React.ReactNode
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme()
    
  return (
    <>
      <Drawer variant='permanent'>
        <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">
          
          <Box 
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Avatar 
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://avatars.githubusercontent.com/u/79472501?s=400&u=564d1632908b4f09763f1ded8407a800d09343eb&v=4" />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Pagina inicial" />
              </ListItemButton>
            </List>
          </Box>
            
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}