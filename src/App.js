import MyMap from './MyMap'
import Menu from './Menu'
import People from './People'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import UpdatePopup from './UpdatePopup'
import AddListPopup from './AddListPopup'
import AddPeoplePopup from './AddPeoplePopup'
import { FlyToInterpolator } from 'react-map-gl';
import logo from './assets/FriendFinder-Logo3.png'
import { style } from '@mui/system'

export default function App() {
const [people, setPeople] = useState([])
const [filteredPeople, setFilteredPeople] = useState([])
const [filteredList, setFilteredList] = useState([])
const [personMarker, setPersonMarker] = useState([])
const [selectedIndex, setSelectedIndex] = useState(1);
const [updateAnchorEl, setUpdateAnchorEl] = useState(null);
const [addListAnchorEl, setAddListAnchorEl] = useState(null);
const [addPersonAnchorEl, setAddPersonAnchorEl] = useState(null);
const [startGroup, setStartGroup] = useState([])
const [listId, setListId] = useState(null);
const [directions, setDirections] = useState(null);
const [viewport, setViewport] = useState({
  latitude: 40.318460,
  longitude: -111.720440,
  width: '1150px',
  height: '1150px',
  zoom: 10
});

useEffect(() => {
  fetch('http://localhost:9292/lists')
  .then(res => res.json())
  .then(group => 
      setStartGroup(group)
      )
}, [])

    useEffect(() => {
        fetch('http://localhost:9292/people')
        .then(res => res.json())
        .then(people => 
            setPeople(people)
            )
     }, [])

     function handleListClick(e, id){
      console.log('hello im a button')
      console.log('this is my id:', id )
      const filteredPeople = people.filter(person => person.list_id === id)
      setFilteredPeople(filteredPeople)
      setSelectedIndex(id)
      setListId(id)
    //  const addresses = filteredPeople.map(person => person.address).join(';')
    //   console.log(addresses)
    //   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/${addresses}`)
    //   .then(response => response.json())
    //   .then(adi => console.log(adi))
    }

    function handlePersonClick(address){
      fetch(`http://api.positionstack.com/v1/forward?access_key=bf433bb43c0427d79c3c77f6e057cd0c&query=${address}`)
      .then(response => response.json())
      .then(adi => { 
        setPersonMarker(adi.data[0])
        setViewport({
          ...viewport,
          latitude: adi.data[0].latitude,
          longitude: adi.data[0].longitude,
          zoom: 14,
          transitionDuration: 3000,
          transitionInterpolator: new FlyToInterpolator(),
        })
        console.log(adi.data[0])})
    }

    function handleDeleteClick(id) {
      fetch(`http://localhost:9292/people/${id}`, {
        method: "DELETE", 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(() => {
        const peopleAfterDelete = filteredPeople.filter(person => person.id !== id)
        setFilteredPeople(peopleAfterDelete)
      })
    }
     
    function handleUpdateClick(event) {
      setUpdateAnchorEl(event.currentTarget)
    }

    const handleUpdateClose = () => {
      setUpdateAnchorEl(null);
    }

    function handleAddListClick(event) {
      setAddListAnchorEl(event.currentTarget);
    }

    const handleAddListClose = () => {
      setAddListAnchorEl(null);
    }

    function handleAddPersonClick(event) {
      setAddPersonAnchorEl(event.currentTarget);
    }

    const handleAddPersonClose = () => {
      setAddPersonAnchorEl(null);
    }
  
    function handleDirectionsClick(id) {
      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/-111.720440,40.318460;${personMarker.longitude + ',' + personMarker.latitude}?access_token=pk.eyJ1IjoiZ29idWJiYSIsImEiOiJja3d1eTFrdmwxN2pqMnVzZWM4Y3J5bTY3In0.4zdRkgdsRUP2eOjxjceZoA`)
      .then(response => response.json())
      .then(directionsRes => {
        setDirections([{
          path: [[-111.720440,40.318460],[directionsRes.waypoints[1].location[0],directionsRes.waypoints[1].location[1]]],
          name: 'location-location',
          color: [0,0,0]
        }])
        console.log(directionsRes)})
        console.log('toAddress:', personMarker.longitude, personMarker.latitude)
        console.log('directions:', directions)
        const style = document.getElementById('visibleMap')
        style.innerText += "#map {border-radius: 20px; position: absolute; top: 140px; left: 30px; width: 98%; height: 97%;}"
        let desiredPerson = people.filter(person => person.id === id)
        let destinationAdi = desiredPerson[0].address
        const start = document.querySelector('[placeholder="Choose a starting place"]')
        const destination = document.querySelector('[placeholder="Choose destination"]')
        console.log(start, destination)
        console.log(personMarker)
        destination.value = (destinationAdi)
        start.value = ('1167 n 1015 w Orem, Ut')
    }
    
    const navMap = document.querySelector('.mapboxgl-map')
    navMap.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
      const style = document.getElementById('visibleMap')
      style.innerHTML = ''
      }
    })

    function handleNewGroupSubmit(newGroup){
      const newGroupObj = {
        group: newGroup.group
      }
      fetch("http://localhost:9292/lists", {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newGroupObj)
      })
      .then(response => response.json())
      .then(group => setStartGroup([...startGroup, group]))
    }

    function handleNewPersonSubmit(newPerson){
      console.log('listId:', newPerson)
      
      fetch("http://localhost:9292/people", {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newPerson)
      })
      .then(response => response.json())
      .then(person => setFilteredPeople([...filteredPeople, person]))
    }

    function handleDeleteList(id){
      fetch(`http://localhost:9292/lists/${id}`, {
        method: "DELETE", 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        const listsAfterDelete = startGroup.filter(menuItem => menuItem.id !== id)
        setStartGroup(listsAfterDelete)
      })
      console.log(id)
    }

  return (
    <div className="App">
      <img className='logo' src={logo} alt="logo" />
   <div className="main-container">
   <Menu handleDeleteList={handleDeleteList} startGroup={startGroup} handleListClick={handleListClick} selectedIndex={selectedIndex} handleAddListClick={handleAddListClick}/>
   <MyMap directions={directions} viewport={viewport} setViewport={setViewport} people={filteredPeople} personMarker={personMarker}/>
   <People people={filteredPeople} handlePersonClick={handlePersonClick} handleDeleteClick={handleDeleteClick} handleUpdateClick={handleUpdateClick} handleDirectionsClick={handleDirectionsClick} handleAddPersonClick={handleAddPersonClick}/>
   </div>
   <UpdatePopup updateAnchorEl={updateAnchorEl} handleUpdateClose={handleUpdateClose}/>
   <AddListPopup addListAnchorEl={addListAnchorEl} handleAddListClose={handleAddListClose} handleNewGroupSubmit={handleNewGroupSubmit}/>
   <AddPeoplePopup setListId={setListId} listId={listId} handleNewPersonSubmit={handleNewPersonSubmit} addPersonAnchorEl={addPersonAnchorEl} handleAddPersonClose={handleAddPersonClose}/>
   <Button onClick={handleAddPersonClick} className='addPerson'> <Typography style={{ fontSize: '60px', color: '#aeb5e2', fontFamily: 'Garamond, serif'}}>+</Typography></Button>
   <Button onClick={handleAddListClick} className='addGroup'><Typography style={{ fontSize: '60px', color: '#aeb5e2', fontFamily: 'Garamond, serif'}}>+</Typography></Button>
   </div>
  );
}