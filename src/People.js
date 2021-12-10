import PeopleItem from './PeopleItem'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

export default function People({people, handlePersonClick, handleDeleteClick, handleUpdateClick, handleDirectionsClick, handleAddPersonClick}) {

    const peopleToDisplay = people.map(person => 
    <>
    <ListItemButton >
    <PeopleItem handlePersonClick={handlePersonClick} key = {person.id} id = {person.id} name = {person.name} address = {person.address} favorite = {person.favorite} list={person.list_id} handleDeleteClick={handleDeleteClick} handleUpdateClick={handleUpdateClick} handleDirectionsClick={handleDirectionsClick} />
    </ListItemButton>
    <Divider />
    </>)
    return (
        <div className='people-container'>
             <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
             <h1 className='title'>Your Friends</h1>
            <List component="nav" aria-label="main mailbox folders">
            {peopleToDisplay}
            
            </List>
     </Box>
        </div>
    )
}

