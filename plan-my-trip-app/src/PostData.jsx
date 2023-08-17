import React,{useState} from "react";


const PostData=()=>{
     const[name,setName]=useState("");
     const[email,setEmail]=useState("");
     const[destination,setDestination]=useState("");
     const[travelers,setTravelers]=useState(0);
     const[budget,setBudget]=useState(0);

     const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch(`https://plan-my-trip-backend.onrender.com/api`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    email,
                    destination,
                    travelers,
                    budget
                })
            })
          if(response.ok){
            setName("");
            setEmail("");
            setDestination("");
            setTravelers(0);
            setBudget(0);

            
          }
        } catch (error) {
            console.log(error.message)
        }
     }
    return(
        <div>
            <h2>Post Data</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} placeholder="Enter your name" onChange={(e)=>{setName(e.target.value)}} /> <br />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}} /> <br />

                <select name="destination" id="destination" value={destination} onChange={(e)=>{setDestination(e.target.value)}}>
                    <option value="">Select your destination</option>
                    <option value="India">India</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="America">America</option>
                </select> <br />

                <label htmlFor="travelers">No. of travelers:</label>
                <input type="number" id="travelers" name="travelers" value={travelers} placeholder="Enter how many people travel" onChange={(e)=>{setTravelers(e.target.value)}} /> <br />

                <label htmlFor="budget">Budget per person:</label>
                <input type="number" id="budget" name="budget" value={budget} placeholder="Enter price per person" onChange={(e)=>{setBudget(e.target.value)}} /> <br />

                  <button type="submit">submit</button> <br />

                    <div>Refresh the page after posting a new trip</div>
            </form>
        </div>
    )
}

export default PostData;
