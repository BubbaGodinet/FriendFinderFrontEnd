import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';

export default function PeopleItem({name, address, favorite, list_id, id, handlePersonClick, handleDeleteClick, handleUpdateClick, handleDirectionsClick}) {
    return (
        <div>
            <h2 onClick={() => handlePersonClick(address)} style={{fontFamily: 'Garamond, serif',color: '#000000'}}>{name}</h2>
            <h5 style={{color: '#002000'}}>{address}</h5>
            <h3>{favorite}</h3>
            <Stack spacing={2} direction="row">
                <Button onClick={handleUpdateClick} style={{backgroundColor: '#33CC66'}}variant="contained">Update</Button>
                <Button onClick={() => handleDirectionsClick(id)} style={{backgroundColor: '#3366CC'}}variant="contained">Directions</Button>
                <Button onClick={() => handleDeleteClick(id)} style={{backgroundColor: '#CC3333'}}variant="contained">Delete</Button>
            </Stack>
        </div>
    )
}