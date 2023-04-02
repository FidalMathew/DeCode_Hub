import Navbar from '../components/Navbar'
import { Box, Text, Flex } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import MintRequest from "../components/MintRequest"

const Admin = () => {
    const [requests, setRequests] = useState([])
    const [update, setUpdate] = useState(true)


    const URL = "https://decodehub-app.onrender.com/"

    useEffect(() => {
        const getRequests = async () => {
            const response = await axios.get("https://decodehub-app.onrender.com/request/get-requests");
            setRequests(response.data);
            console.log("adsd", response.data)
        };
        getRequests();
    }, [update]);


    return (
        <Box bg={"background"} minH={"100vh"}>
            <Navbar queryBar={false} isAdmin={true} />
            {/* show a text of no request if length is 0 */}
            <Flex flexDirection={"column"} alignItems={"center"}>
                {requests.length === 0 && <Text margin={"auto"} color={"white"} fontSize={"2xl"} as="b">No Requests</Text>}
            </Flex>
            {
                requests.map((req, idx) => (<MintRequest key={idx} id={req._id} address={req.address} nftType={req.nftType} setUpdate={setUpdate} update={update} />))
            }
        </Box>
    )
}

export default Admin
