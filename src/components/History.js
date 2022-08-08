import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 import { setSearchValue } from '../redux/reducer'
 import { useDispatch } from "react-redux";
 import "./pages.css"

export default function History(){
    const [history, setHistory]=useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(history.length<=0)
        fetch("https://api.spacexdata.com/v3/history")
        .then(res => res.json())
        .then(y => {console.log(y); setHistory(y)});
    },[])

    return (
        <div style={{justifyContent: "space-between", display:"contents", overflowX:"hidden"}}>
    <div data-testId="list" style = {{    
        position: "fixed",
        top: "108",
        paddingBottom: "0",
        height: "100%",
        zIndex:1,
        width: "220px",
        overflowX: "scroll",
        backgroundColor: "transparent"}}>
        <ul style={{  
            margin:"auto",  
        width: "100%",
        backgroundColor: "#E7E9EB",
        overflowY:"scroll !important",
        listStyleType:"none",
        paddingTop: "20px"}}>
   {history.map((data, index)=>(<li key={`${index}_item`} data-testId="list" onClick={()=>dispatch(setSearchValue({page: "history", id: `${data.id}`}))} style={{ width:"140px" ,color:"darkblue",fontWeight:"bold" ,padding: "10px"}}><Link to="details">{data.title}</Link></li>))}
        </ul>
    </div>
    <div data-testId="rightpanel" className="rightPanel" >
        <h3 data-testId="overview">Overview</h3>
        <div data-testId="content">{`In 2001, Musk conceptualised "Mars Oasis", a project to land a miniature experimental greenhouse containing seeds with dehydrated gel on Mars to grow plants on Martian soil, "so this would be the furthest that life's ever travelled" in an attempt to regain public interest in space exploration and increase the budget of NASA. But Musk realized that even with a much larger space budget, travel to Mars would be prohibitively expensive without a fundamental breakthrough in rocket technology.
    In October 2001, Musk travelled to Moscow with Jim Cantrell and Adeo Ressi to buy refurbished Dnepr ICBMs that could send the envisioned payloads into space.In early 2002 Musk was seeking staff for the new company and approached rocket engineer Tom Mueller, who would eventually become SpaceX's CTO of Propulsion until 2020.SpaceX was first headquartered in a 75,000 square feet warehouse in El Segundo, California. Musk decided SpaceX's first rocket would be named Falcon 1, a nod to Star Wars' Millennium Falcon. Musk planned for Falcon 1's first launch to occur in November 2003, 15 months after the company started.
On August 4, 2008 SpaceX accepted a further $20 million investment from Founders Fund. In early 2012, approximately two-thirds of the company were owned by its founderand his 70 million shares were then estimated to be worth $875 million on private markets, which roughly valued SpaceX at $1.3 billion as of February 2012. After the COTS 2+ flight in May 2012, the company private equity valuation nearly doubled to $2.4 billion.
On 16 June 2009 SpaceX announced the opening of its Astronaut Safety and Mission Assurance Department. It hired former NASA astronaut Ken Bowersox to oversee the department as a vice president of the company. However, it has since been reported that the former astronaut subsequently left SpaceX in late 2011. No reason was given and no replacement in that position has been announced.
On 16 June 2009 SpaceX announced the opening of its Astronaut Safety and Mission Assurance Department. It hired former NASA astronaut Ken Bowersox to oversee the department as a vice president of the company. However, it has since been reported that the former astronaut subsequently left SpaceX in late 2011. No reason was given and no replacement in that position has been announced.`}</div> 
</div>
<div style={{ marginLeft: "240px", paddingTop:"10px" ,textAlign:"left"}} >
   {history.map(data => (
    <div style={{ display:"initial", marginTop:"60px" ,textAlign:"left", width: "50px"}}>
        <table style = {{marginTop:"20px"}}>
         <tr><td style={{backgroundColor: "lightblue", width:"140px" ,fontWeight:"bold" ,padding: "10px"}}>Title</td><td style={{width:"1000px", display:"flex" , paddingLeft:"30px"}}>{data.title}</td></tr>
         <tr><td style={{backgroundColor: "lightblue", width:"140px",fontWeight:"bold"  ,padding: "10px"}}>Details</td><td style={{width:"1000px" , display:"flex" , paddingLeft:"30px"}}>{data.details}</td></tr> 
         <tr><td style={{backgroundColor: "lightblue", width:"140px" ,fontWeight:"bold" ,padding: "10px"}}>Flight number</td><td style={{width:"1000px", display:"flex" , paddingLeft:"30px" }}>{data.flight_number}</td></tr> 
         <tr><td style={{backgroundColor: "lightblue", width:"140px" ,fontWeight:"bold" ,padding: "10px"}}>Article link</td><td style={{width:"1000px",  display:"flex" ,paddingLeft:"30px" }}><a href={data.links.article}>Aricle link</a></td></tr> 
         
         </table>

    </div>
   ))}
</div>
    </div>
    )
}