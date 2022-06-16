import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

//class component
//jsonplaceholder.typicode.com/users

const App = (props)=>{
  const [ monsters, setMonsters ] = useState([]);
  const [ searchValue, setSearchValue ] = useState('');
  const [ filteredMonsters, setFilteredMonsters ] = useState([]);


  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster)=>monster.name.toLocaleLowerCase().includes(searchValue));
    setFilteredMonsters(newFilteredMonsters);
  },[searchValue, monsters])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users)=>{
      setMonsters(users)
    })
  },[])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchValue(searchFieldString);
  }

  return(
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
        className='monsters-search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search monsters'
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
