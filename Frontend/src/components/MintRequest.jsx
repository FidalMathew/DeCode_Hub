import { Avatar, Button, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react"
import { char2Bytes } from '@taquito/utils';
import { MichelsonMap } from '@taquito/taquito';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect, useState } from "react";
import useGlobalContext from "../hooks/useGlobalContext"

const MintRequest = (props) => {

    console.log(props)

    const { Tezos } = useGlobalContext();

    const [tokenId, setTokenId] = useState(0)
    const [nfts, setNfts] = useState([])
    // const [loading, setLoading] = useState(false)
    const contractAddress = "KT1REz2LhQUmp6pvaZVebpuiRWoNXCq6iU5F"
    const url = "ipfs://QmWUATm299bNoVS9MypxbVcgd68fKHgyLW95s1jNX5NQB9"
    // const address = "tz1Ph1TwjnaskzUnnhwmntStrqmPy3NJPLGY"

    // get all nfts and fetch the token id for the next mint


    useEffect(() => {
        const getNFTs = async () => {
            const response = await axios.get(
                `https://api.ghostnet.tzkt.io/v1/contracts/${contractAddress}/bigmaps/ledger/keys`
            );
            const data = response.data;
            console.log(data);
            setNfts(data)
        };
        getNFTs()
    }, [])


    useEffect(() => {
        setTokenId(nfts.length);
        console.log(nfts.length)
    }, [nfts])

    const getContract = async () => {
        const contract = await Tezos.wallet.at(contractAddress);
        return contract;
    };

    const mintNFT = async () => {
        // await disconnectWallet();
        // await connectWallet();

        console.log(props.address, url, tokenId);
        const amount = 1;

        try {
            const contract = await getContract();
            const urlC = char2Bytes(url);
            const op = await contract.methods.mint(props.address, amount, MichelsonMap.fromLiteral({ '': urlC }), tokenId).send();
            await op.confirmation(3);

            // toast.promise(op.confirmation(3),
            //     {

            //         pending: 'Minting NFT',
            //         success: 'NFT Minted 👌',
            //         error: 'Cannot Mint NFT 🤯'
            //     }
            // )
            const res = await axios.put(`https://decodehub-app.onrender.com/request/update-requests/${props.id}`)
            props.setUpdate(!props.update)
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <VStack padding={"5"}>
                <Card width={"4xl"}>
                    <CardBody display={"flex"} justifyContent={"space-between"}>
                        <HStack>
                            <Avatar size={"sm"} />
                            <Text fontSize={"sm"}>{props.address}</Text>
                            <Text>requested for <span style={{ fontWeight: '700' }}>#{props.nftType}</span> NFT</Text>
                        </HStack>
                        <Button onClick={() => mintNFT()}>Mint NFT</Button>
                    </CardBody>
                </Card>
            </VStack>
        </div>
    )
}

export default MintRequest
