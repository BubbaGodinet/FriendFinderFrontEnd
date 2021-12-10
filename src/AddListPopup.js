import Popover from '@mui/material/Popover';
import { useState } from 'react'


export default function AddListPopup({addListAnchorEl, handleAddListClose, handleNewGroupSubmit}) {
  const [groupData, setGroupData] = useState({
    group: ''
  })

  function newGroupSubmit(e) {
    e.preventDefault()
    handleNewGroupSubmit(groupData)
  }

  function handleGroupChange(e){
    setGroupData({...groupData, [e.target.name]:e.target.value})
  }

    const open = Boolean(addListAnchorEl);
    const id = open ? 'simple-popover' : undefined;
   return (
    <div>
    <Popover
        id={id}
        open={open}
        anchorEl={addListAnchorEl}
        onClose={handleAddListClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
          <div>
          <form onSubmit={newGroupSubmit}>
              <input style={{ border: '2px solid #aeb5e2', marginTop: '2px', marginBottom: '2px', marginLeft: '2px'}}onChange={handleGroupChange}
              type="text"
              name="group"
              value= {groupData.group}
              placeholder='New Group Name...'
              className='input-text'></input>
               <input
              style={{ marginLeft:'5px', marginRight:'2px' }}
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