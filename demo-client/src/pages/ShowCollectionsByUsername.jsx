import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllByUsername } from "../api-services/collectionService";

const ShowCollectionsByUsername = () => {
    const { username } = useParams()
    const [collections, setCollections] = useState([])
    
    console.log()

    useEffect(() => {
        async function getAllUserCollections() {
            if(username){
                const { data } = await getAllByUsername(username)
                setCollections(data.data);
            }
        }
        getAllUserCollections()
    }, [])

    console.log(collections)

    return (
        <div>
            <h1>Collections</h1>
            {collections.map((collection, index) => (
                    <div>
                        <Link key={index} to={`/${username}/collections/${collection._id}`}>{collection.title}</Link>
                    </div>
            ))}
        </div>
    );
}

export default ShowCollectionsByUsername;