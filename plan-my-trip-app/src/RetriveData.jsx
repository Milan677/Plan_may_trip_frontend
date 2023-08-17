import React, { useState, useEffect } from 'react';


const RetriveData = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [filterDestination, setFilterDestination] = useState('');
    const [sort, setSort] = useState('');

    useEffect(()=>{
        const fetchedData=async()=>{
            try {
                const response= await fetch(`https://plan-my-trip-backend.onrender.com/api`);
                if(response.ok){
                    const responseData=await response.json();
                    setData(responseData);
                    setFilter(responseData)
                }
            } catch (error) {
                console.error(error.message)
            }
          
        };
        fetchedData()
    },[])

    const handleDelete=async(id)=>{
        try {
            const response=await fetch(`https://plan-my-trip-backend.onrender.com/api/${id}`,{
                method:"DELETE"
            });
            if(response.ok){
                setData(data.filter(item=>item._id!==id));
                setFilter(filter.filter(item=>item._id!==id));
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleFilter = async() => {
        try {
            const response = await fetch(`https://plan-my-trip-backend.onrender.com/api/filter-sort?destination=${filterDestination}&sortBy=${sort}`);
            if (response.ok) {
              const responseData = await response.json();
              setFilter(responseData);
            }
          } catch (error) {
            console.error(error);
          }
    };


    

    return (
        <div id="container">
            <h2>Retrieve Data</h2>
            <div>
                <select name="" id="" value={filterDestination} onChange={(e) => { setFilterDestination(e.target.value) }} >
                    <option value="">choose destination</option>
                    <option value="India">India</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="America">America</option>
                </select>

                <select name="" id="" value={sort} onChange={(e) => { setSort(e.target.value) }}>
                    <option value="">Sort by Budget</option>
                    <option value="Asc">low to high</option>
                    <option value="Desc">high to low</option>
                </select>

                <button onClick={handleFilter}>Apply filter</button>
            </div>

            <div id="inner-container">
                {filter.map(item => (
                    <div key={item._id} className="card">
                        <p>Name: {item.name}</p>
                        <p>Email: {item.email}</p>
                        <p>Destination: {item.destination}</p>
                        <p>No. of Travelers: {item.travelers}</p>
                        <p>Budget Per Person: {item.budget}</p>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default RetriveData;