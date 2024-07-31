import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { SearchOutlined, BackwardOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import Bubbles from './Bubbles'
import magikarp from '../src/assets/shiny-magikarp-no-bg.png'
import './App.scss'

import all from '../src/assets/all.svg'
import bivalvia from '../src/assets/bivalvia.svg'
import crab from '../src/assets/crab.svg'
import eel from '../src/assets/eel.svg'
import freshwater from '../src/assets/freshwater.svg'
import normalfishs from '../src/assets/normalfishs.svg'
import other from '../src/assets/other.svg'
import rays from '../src/assets/rays.svg'
import saltwater from '../src/assets/saltwater.svg'
import shark from '../src/assets/shark.svg'
import shrimp from '../src/assets/shrimp.svg'
import squid from '../src/assets/squid.svg'

function App() {
  const baseUrl = 'http://127.0.0.1:8000/api'
  const [loading, setLoading] = useState(false)
  const [fish, setFish] = useState([])
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [noPagination, setNoPagination] = useState(false);

  const fetchAllFishes = async () => {
    setNoPagination(true);
    setMenu(false);
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/fishs`)

    setFish(data);
    setLoading(false);
  }

  const handleSearch = async () => {
    setNoPagination(true);
    setMenu(false);

    if(search.length === 0) {
      fetchAllFishes();
      return;
    }

    console.log('searching...')
    setLoading(true);

    try {
      const filteredName = await getFilteredName(search);

      if(filteredName.length === 0) {
        setFish([]); // Set to an empty array if no fish found
        setMenu(false);
      } else {
        setFish(filteredName);
        //const { data } = await axios.get(`${baseUrl}/fish/${specificId}`)
        //setFish([data]); // Wrap data in an array to maintain consistency when mapping
      }
    } catch (err) {
      console.error('Error searching:', err)
      setFish([]); // Set to an empty array in case of error
      setMenu(false);
    } finally {
      setLoading(false);
    }
  }

  const getFilteredName = async (name) => {
    try {
      const { data } = await axios.get(`${baseUrl}/fishs`)
      const filteredName = data.filter(f => 
        f.name_bm.toLowerCase().includes(name.toLowerCase()) || 
        f.common_name.toLowerCase().includes(name.toLowerCase())
      )

      return filteredName;

    } catch (err) {
      console.error('Error fetching name list:', err);
      return null;
    }
  }

  const handleChange = (e) => {
    setSearch(e.target.value);

    if(e.target.value.trim().length === 0) {
      fetchAllFishes();
    } else {
      const filteredName = fish.filter(f => 
        f.name_bm.toLowerCase().includes(e.target.value.toLowerCase()) || 
        f.common_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
      setFish(filteredName);
    }
  }

  const handleButtonMenu = async (filter) => {
    setNoPagination(false);
    setMenu(false);
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/fishs/${filter}?page=${page}`);
    // console.log(data);

    setFish(data.data);
    setPage(data.current_page);
    setLastPage(data.last_page);
    setFilterValue(filter);
    setLoading(false);
    setSearch('');
  }

  const handlePage = useCallback(async () => {
    setNoPagination(false);
    setMenu(false);
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/fishs/${filterValue}?page=${page}`);
    // console.log(data);

    setFish(data.data);
    setPage(data.current_page);
    setLastPage(data.last_page);
    setLoading(false);
    setSearch('');
  }, [page]);

  const openCard = () => {
    console.log("open")
  }

  useEffect(() => {
    // fetchAllFishes();

    if(menu) {
      setSearch('')
      setPage(1)
    }
  }, [menu])


  useEffect(() => {
    if (!menu) {
      handlePage();
    }
  }, [page, handlePage]);

  return (
    <>
      <div className="app">
        { !menu ? <div className='back' onClick={() => setMenu(true)}><BackwardOutlined /></div> : '' }
        <h1 onClick={() => setMenu(true)}>Hydro World</h1>

        <div className="search">
          <input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            placeholder='Search for specific aquatic life...'
          />
          <button className='search-button' onClick={handleSearch}><SearchOutlined /></button>
        </div>

        { menu ? (
          <div className='menu'>
            <button onClick={fetchAllFishes}><img src={all} style={{ width: '36px' }}/> All</button>
            <button onClick={() => handleButtonMenu('bivalvia')}><img src={bivalvia} style={{ width: '36px' }}/> Bivalvia</button>
            <button onClick={() => handleButtonMenu('crabs')}><img src={crab} style={{ width: '36px' }}/> Crabs</button>
            <button onClick={() => handleButtonMenu('eels')}><img src={eel} style={{ width: '36px' }}/> Eels</button>
            <button onClick={() => handleButtonMenu('normalfishs')}><img src={normalfishs} style={{ width: '36px' }}/> Normal Fishs</button>
            <button onClick={() => handleButtonMenu('prawns')}><img src={shrimp} style={{ width: '36px' }}/> Prawns / Shrimps / Lobster</button>
            <button onClick={() => handleButtonMenu('rays')}><img src={rays} style={{ width: '36px' }}/> Rays</button>
            <button onClick={() => handleButtonMenu('sharks')}><img src={shark} style={{ width: '36px' }}/> Sharks</button>
            <button onClick={() => handleButtonMenu('squids')}><img src={squid} style={{ width: '36px' }}/> Squids</button>
            <button onClick={() => handleButtonMenu('others')}><img src={other} style={{ width: '36px' }}/> Others</button>
            <button onClick={() => handleButtonMenu('freshwater')}><img src={freshwater} style={{ width: '36px' }}/> Freshwater Fishs</button>
            <button onClick={() => handleButtonMenu('saltwater')}><img src={saltwater} style={{ width: '36px' }}/> Saltwater Fishs</button>
          </div>
        ) : (
          loading ? (
            <div className='loading'>Loading...</div> 
          ) : (
            fish.length > 0 ? (
              <div className='container-main'>
                <div className="list-aquatic">
                    {fish.map((fish, index) => (
                      <div key={index} className='card' onClick={openCard}>
                        <h2>⯍ {fish.common_name} ⯍</h2>
                        <img src={fish.image_url} alt="" />
                        <div>
                          <p className='name-bm'><u>{fish.name_bm}</u></p>
                          <p>{fish.description}</p>
                        </div>
                      </div>
                    ))}

                </div>

                { noPagination === true ? null : (
                  <div className='pagination'>
                    <h3 style={ page != 1 ? { cursor: 'pointer' } : { pointerEvents: 'none', color: '#636363' } } onClick={() => setPage(page - 1)}><CaretLeftOutlined /></h3>
                    <h3 className='page-number'>{page}</h3>
                    <h3 style={ page != lastPage ? { cursor: 'pointer' } : { pointerEvents: 'none', color: '#636363' } } onClick={() => setPage(page + 1)}><CaretRightOutlined /></h3>
                  </div>
                )}
              </div>
            ) : ( 
              !menu && (
              <div className='not-found'>
                <img src={magikarp} alt="" />
                <p>Aquatic Life Not Found!</p>
              </div> 
              )
            )
          )
        )}

        { menu || loading ? <Bubbles diff={false}/> : <Bubbles diff={true}/> }
      </div>
    </>
  )
}

export default App
