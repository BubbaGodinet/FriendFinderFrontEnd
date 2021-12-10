
import MenuItem from './MenuItem'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';


export default function Menu({handleDeleteList, handleListClick, selectedIndex, handleAddListClick, startGroup}) {

  
  const listToDisplay = startGroup.map(item =>
    <>
    <ListItemButton
    selected={selectedIndex === item.id}
    onDoubleClick={() => handleDeleteList(item.id)}
    onClick={(e) => handleListClick(e, item.id)}
  >
  <MenuItem key={item.id} id={item.id} group={item.group} handleListClick={handleListClick}/>
  
  </ListItemButton>
  <Divider />
  </>)
    return (
      <div className='menu-container'>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <h1 className='title'>Your Groups</h1>
        <List component="nav" aria-label="main mailbox folders">
     
      {listToDisplay}
      
     
     </List>
     </Box>
     </div>
  );
}