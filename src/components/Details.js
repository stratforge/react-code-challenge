import React , {memo, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../redux/reducer";
import "./loader.css"
 function Details(){
    const storeSearchObj = useSelector((state) => state.spaceX.searchObj);
    const storeLoader = useSelector((state) => state.spaceX.loader);
    const searchObj = storeSearchObj? storeSearchObj : JSON.parse(localStorage.getItem("serachObj"));
    const loader = storeLoader !== undefined ? storeLoader : localStorage.getItem("loader");
    const dispatch = useDispatch();
    console.log("Details", searchObj)
    const [APIResponse, setApiResponse] = useState({});

    useEffect(()=>{
        dispatch(setLoader(true));
        localStorage.setItem("loader", true);
        fetch(`https://api.spacexdata.com/v3/${searchObj && searchObj.page}/${searchObj && searchObj.id}`)
        .then(res => res.json())
        .then(resp => {
            console.log(resp);
           setApiResponse(resp);
        })
        dispatch(setLoader(false))
        localStorage.setItem("loader", false);
    },[])

    console.log("loader...", loader)

    const setLocalStorage = () => {
        localStorage.setItem("serachObj",JSON.stringify(searchObj));
        localStorage.setItem("loader", loader);
    }

    return (
        <div data-testId="details" className="noClass">
        {searchObj && searchObj.page === "history" && !loader && (
     <div style={{margin:"10px", border: "1px rodge",
     width: "500px",
     alignItems: "center",
     display: "inline-block",
     backgroundColor: "cadetblue"}}>
     <div style ={{    padding: "20px", marginBottom: "1px", borderBottom: "5px ridge"}}><span style={{padding: "20px", fontWeight:"bold"}}>{`${APIResponse.title}`}</span></div>
     <table style={{ display: "inline-block", textAlign: "start", padding: "30px"}}>
    {APIResponse.title && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Title</td><td style={{paddingLeft:"20px"}}>{APIResponse.title}</td></tr>}
   {APIResponse.details && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Details</td><td style={{paddingLeft:"20px"}}>{APIResponse.details}</td></tr>}
    {APIResponse.flight_number && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Flight number</td><td style={{paddingLeft:"20px"}}>{APIResponse.flight_number}</td></tr>}
    {APIResponse.event_date_utc && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Date</td><td style={{paddingLeft:"20px"}}>{APIResponse.event_date_utc}</td></tr>}
   
    </table> 
     </div>   
     )}
             { searchObj && searchObj.page === "launches" && !loader && (
     <div style={{margin:"10px", border: "1px rodge",
     width: "500px",
     alignItems: "center",
     display: "inline-block",
     backgroundColor: "cadetblue"}}>
     <div style ={{    padding: "20px", marginBottom: "1px", borderBottom: "5px ridge"}}><span style={{padding: "20px", fontWeight:"bold"}}>{`${APIResponse.mission_name}`}</span></div>
     <table style={{ display: "inline-block", textAlign: "start", padding: "30px"}}>
    {APIResponse.mission_name && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Title</td><td style={{paddingLeft:"20px"}}>{APIResponse.mission_name}</td></tr>}
   {APIResponse.details && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Details</td><td style={{paddingLeft:"20px"}}>{APIResponse.details}</td></tr>}
    {APIResponse.flight_number && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Flight number</td><td style={{paddingLeft:"20px"}}>{APIResponse.flight_number}</td></tr>}
    {APIResponse.launch_date_utc && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Date</td><td style={{paddingLeft:"20px"}}>{APIResponse.launch_date_utc}</td></tr>}
   <tr style={{margin: "20px", fontWeight:"bold"}}><td>SuccessFul</td><td style={{paddingLeft:"20px"}}>{APIResponse.launch_success ? "YES" : "NO"}</td></tr>
    </table>
     </div>   
     )}
                  {searchObj && searchObj.page === "rockets" && !loader &&  (
     <div style={{margin:"10px", border: "1px rodge",
     width: "500px",
     alignItems: "center",
     display: "inline-block",
     backgroundColor: "cadetblue"}}>
     <div style ={{    padding: "20px", marginBottom: "1px", borderBottom: "5px ridge"}}><span style={{padding: "20px", fontWeight:"bold"}}>{`${APIResponse.rocket_name}`}</span></div>
     <table style={{ display: "inline-block", textAlign: "start", padding: "30px"}}>
    {APIResponse.company && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Title</td><td style={{paddingLeft:"20px"}}>{APIResponse.company}</td></tr>}
   {APIResponse.description && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Details</td><td style={{paddingLeft:"20px"}}>{APIResponse.description}</td></tr>}
    {APIResponse.country && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Country</td><td style={{paddingLeft:"20px"}}>{APIResponse.country}</td></tr>}
    {APIResponse.success_rate_pct && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Success rate</td><td style={{paddingLeft:"20px"}}>{APIResponse.success_rate_pct}</td></tr>}
    {APIResponse.reddit && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Reddit link</td><td style={{width:"1200px", paddingLeft:"30px" }}><a href={APIResponse.links.reddit} onClick={()=> setLocalStorage()}>Reddit link</a></td></tr> }
    {APIResponse.wikipedia && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Wikipedia link</td><td style={{width:"1200px", paddingLeft:"30px" }}><a href={APIResponse.wikipedia} onClick={()=> setLocalStorage()}>Wikipedia link</a></td></tr> }
    {APIResponse.cost_per_launch && <tr style={{margin: "20px", fontWeight:"bold"}}><td>Cost per launch</td><td style={{paddingLeft:"20px"}}>{APIResponse.cost_per_launch}</td></tr>}
   <tr style={{margin: "20px", fontWeight:"bold"}}><td>SuccessFul</td><td style={{paddingLeft:"20px"}}>{APIResponse.launch_success ? "YES" : "NO"}</td></tr>
    </table>
     </div>   
     )}

     {loader &&
     <div className="loader"></div> }
     </div>
    )
}

export default memo(Details)