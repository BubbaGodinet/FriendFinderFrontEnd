import Popover from '@mui/material/Popover';
import { useState } from 'react'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function UpdatePopup({updateAnchorEl, handleUpdateClose}) {
  
    const [updateChecked, setUpdateChecked] = useState(true);

    const handleChange = (event) => {
      setUpdateChecked(event.target.checked);
    };

    const open = Boolean(updateAnchorEl);
    const id = open ? 'simple-popover' : undefined;
   return (
    <div>
    <Popover
        id={id}
        open={open}
        anchorEl={updateAnchorEl}
        onClose={handleUpdateClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
          <div>
          <form>
              <input
              type="text"
              name="name"
            //   value="placeholder"
              placeholder='Updated Name Here...'
              className='input-text'></input>
              <input
              type="text"
              name="name"
            //   value="placeholder"
              placeholder='Updated Address Here...'
              className='input-text'></input>
              <input
              type="text"
              name="name"
            //   value="placeholder"
              placeholder='Updated List Here...'
              className='input-text'></input>
              <FormControlLabel style={{paddingLeft:'6px'}}control={<Switch
              checked={updateChecked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }} />} label="Favorite"/>
              <input
              style={{ marginRight:'15px' }}
              type="submit"
              name="submit"
              value="Update"
              className="submit"/>
          </form>
          </div>
          
      </Popover>
    </div>
   )
}