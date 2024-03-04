import React, { useState, useEffect } from "react";
import './App.css';
import Records from './components/records';
import Pagination from './components/pagination';

const URL="http://localhost:5000/api/customers";
const Index= ()=>{
    const [customers, setCustomers] = useState([]);
    const [searchItem, setsearchItem] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [recordsPerPage] = useState(20);
    const [loading,setLoading]=useState(true);
    const [isError,setError]=useState({status:false,msg:""});

    const fetchUrlData=async(url)=>{
      try {
        setLoading(true);
        setError({status:false,msg:""});
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setCustomers(data);
        setLoading(false);
        setError({status:false, msg:""});
        if (!data.length){
          throw new Error('data not found')
        }} catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            setError({
              status:true,
              msg: error.message || "something went wrong..."});
        }
  }
  
  const handleSort = async (sortBy) => {
    try {
      setSortBy(sortBy);
      const response = await fetch.get(`/api/customers/sort?sortBy=${sortBy}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error sorting data:', error);
    }
  };

  useEffect(()=>{
    if(searchItem===' ')
    fetchUrlData(URL);
    const newURL=`${URL}/${searchItem}`;
    fetchUrlData(newURL);
  },[searchItem]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = customers.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(customers.length / recordsPerPage)

    return(
      <div className='container'>
          <input type="text" 
            name="searchbar"
            id="searchbar"
            placeholder="enter name or location"
            value={searchItem}
            onChange={(e)=>setsearchItem(e.target.value)}
            />
            <button>Search</button>
            <select onChange={(e) => handleSort(e.target.value)}>
              <option value="">Sort By</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
            </select>
            {loading && !isError?.status && <h3>Loading...</h3>}
            {isError?.status && <h3 style={{ color: "red" }}>{isError.msg}</h3>}
            {!loading && !isError?.status && (
              <div>
                <Records customers={currentRecords}/>
                <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
                </div>
            )}   
            </div>         
     )
 }

export default Index;