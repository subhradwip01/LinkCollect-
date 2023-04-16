import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllByUsername } from "../api-services/collectionService";

const ShowCollectionsByUsername = () => {
    const { username } = useParams()
    const [collections, setCollections] = useState([])

    useEffect(() => {
        console.log(username)
        async function getAllUserCollections() {
            console.log("hey")
            const { data } = await getAllByUsername(username)
            setCollections(data.data);
        }
        getAllUserCollections()
    }, [])


    return (
        <div>
            {collections.map((collection, index) => (
                <div key={index}>
                    <h1>{collection.title}</h1>
                    {collection.timelines.map((timeline, i) => (
                        <p key={i}>{timeline.link}</p>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ShowCollectionsByUsername;