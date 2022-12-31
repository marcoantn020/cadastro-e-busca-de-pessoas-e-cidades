import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useDrawerContext } from '../../contexts'

interface IMenuLateralProps {
  children: React.ReactNode
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()
    
  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">
          
          <Box 
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Avatar 
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://media.vanityfair.com/photos/62faca32888dcb1c799a5d52/4:3/w_1999,h_1499,c_limit/Wednesday-First-Look-04.jpg" />
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

      <Box height="100vh" marginLeft={smDown ? 0: theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}