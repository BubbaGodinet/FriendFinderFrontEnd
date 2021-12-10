import Popover from '@mui/material/Popover';
import { useState } from 'react'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function AddPeoplePopup({setListId, listId, handleNewPersonSubmit, addPersonAnchorEl, handleAddPersonClose}) {
    const [personChecked, setPersonChecked] = useState(false);
    const [personData, setPersonData] = useState({
      name: '',
      address: '',
      favorite: personChecked,
      list_id: listId
    })

    function newPersonSubmit(e){
      e.preventDefault();
      handleNewPersonSubmit(personData)
      console.log(listId)
    }

    function handlePersonChange(e){
      setPersonData({...personData, [e.target.name]:e.target.value})
      setPersonChecked(e.target.checked);
      setPersonData(prevState => {
        return {
          ...prevState,
          list_id: listId,
          favorite: !personChecked
        }
      })
    }

    const open = Boolean(addPersonAnchorEl);
    const id = open ? 'simple-popover' : undefined;
   return (
    <div>
    <Popover
        id={id}
        open={open}
        anchorEl={addPersonAnchorEl}
        onClose={handleAddPersonClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
          <div>
          <form onSubmit={newPersonSubmit}>
              <input style={{marginLeft: '5px', border: '2px solid #aeb5e2'}}onChange={handlePersonChange} 
              type="text"
              name="name"
              value= {personData.name}
              placeholder='Name Here...'
              className='input-text'></input>
              <input style={{marginLeft: '5px', border: '2px solid #aeb5e2'}} onChange={handlePersonChange}
              type="text"
              name="address"
              value= {personData.address}
              placeholder='Address Here...'
              className='input-text'></input>
              <input onChange={handlePersonChange}
              type='hidden'
              name="list_id"
              value= {listId}
              placeholder='Group Here...'
              className='input-text'></input>
              <FormControlLabel style={{paddingLeft:'6px'}}control={<Switch
              checked={personChecked}
              onChange={handlePersonChange}
              value={personChecked}
              inputProps={{ 'aria-label': 'controlled' }} />} label="Favorite"/>
              <input
              style={{ marginRight:'15px' }}
              type="submit"
              name="submit"
              value="Add"
              className="submit"/>
          </form>
          </div>
      </Popover>
    </div>
   )
}