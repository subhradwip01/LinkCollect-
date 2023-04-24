import { useEffect, useState } from "react";
import { getCollection } from "../api-services/collectionService";
import { useParams } from "react-router-dom";

const ShowOneCollection = () => {
    const [collection, setCollection] = useState({})
    const { id: collectionId } = useParams();

    useEffect(()=>{
        async function gettingCollection() {
            const { data } = await getCollection(collectionId)
            setCollection(data.data);
        }
        gettingCollection()
    },[])

    return ( 
        <div>
            {collection.timelines?.map((timeline, index)=>(
                <div key={index}>{timeline.link}</div>
            ))}
        </div>
     );
}
 
export default ShowOneCollection;