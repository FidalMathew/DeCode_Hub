import { Box, Button, VStack, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react"

const NFTCard = (props) => {

    const nftMap = {
        1: {
            title: "5Upvotes",
            desc: "Achievement for 5upvotes for answering questions "
        }
    }

    console.log(props.nftTypeContract);

    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={`https://gateway.ipfs.io/ipfs/QmTz72WkYzGmWWz2JnSPfPTLpB7oHebLGZBM6wPSysJgpW`}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                    // height={"xs"}    
                />
                <VStack mt='6' spacing='3'>
                    <Heading size='md' margin={"auto"}>{nftMap[props.nftTypeContract].title}</Heading>
                    <Heading size='md' margin={"auto"}>#{props.id}</Heading>
                    <Text align={"center"} as="">
                        {nftMap[props.nftTypeContract].desc}
                    </Text>
                    {/* <Text color='blue.600' fontSize='2xl'>
                        $450
                    </Text> */}
                </VStack>
            </CardBody>
            {/* <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                </ButtonGroup>
            </CardFooter> */}
        </Card>
    )
}

export default NFTCard
