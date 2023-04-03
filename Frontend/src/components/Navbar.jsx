import { Button, HStack, Avatar, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text, Image } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import './Navbar.css'
import ToggleTheme from "./ToggleTheme"
import { useEffect, useState } from "react"
import useGlobalContext from "../hooks/useGlobalContext"
import { ReactComponent as Temple } from '../assets/temple.svg';
import { Link, useNavigate } from "react-router-dom"

const Navbar = ({ queryBar, isAdmin }) => {

  const { walletAddress, setWalletAddress, connectWallet, getActiveAccount, disconnectWallet, getUserId, checkIfWalletConnected } = useGlobalContext();
  const navigate = useNavigate()
  const [isAdmin1, setisAdmin1] = useState(false);
  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWalletAddress(wallet);
  };
  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWalletAddress(wallet);
    navigate('/')
  };

  useEffect(() => {
    const func = async () => {
      const account = await getActiveAccount();
      if (account) {
        setWalletAddress(account.address);
      }
    };
    func();
  }, [walletAddress, setWalletAddress, getActiveAccount]);


  useEffect(() => {
    const res = checkIfWalletConnected()
    // if success is false then set wallet address to null
    if (!res.success) {
      setWalletAddress(null);
    }
  }, [])

  // backend

  useEffect(() => {
    if (walletAddress)
      getUserId();
  }, [walletAddress, getUserId])

  const address = ["tz1cHtGRewCVsbFybBtTy6EM8mvSCjdimxqK"];

  useEffect(() => {
    if (address.includes(walletAddress)) {
      setisAdmin1(true);
    }
  }, [walletAddress]);

  return (

    <HStack padding={"7"} display={"flex"} justifyContent={"space-between"}>
      <Text as="b" fontSize={"2xl"} marginLeft="10" color={"white"}>
        <Link to="/"><img style={{ height: 'auto', width: '13rem' }} src="/DeCode_Hub.png" /> </Link>
      </Text>
      {queryBar ? <InputGroup width={"container.md"}>
        <Input backgroundColor={"white"} placeholder="Search Query" rounded={"3xl"} />
        <InputRightElement children={<SearchIcon marginRight={"3"} />} />
      </InputGroup> : isAdmin && <Text fontSize={"3xl"} color={"white"} as="b">Admin Page</Text>}
      <HStack>
        {/* <ToggleTheme /> */}
        {/* <Button width={"44"} onClick={handleConnectWallet} rounded={"3xl"} colorScheme={"blue"}>
          {walletAddress
            ? walletAddress.slice(0, 8) +
            "..." +
            walletAddress.slice(walletAddress.length - 4, walletAddress.length)
            : "Connect"}
        </Button> */}
        {/* Add an ask question button on when wallet address is present */}

        <a href="https://github.com/FidalMathew/DeCode_Hub" target="_blank"><Avatar src='https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/github-512.png' /></a>

        {walletAddress && <Button colorScheme={"teal"} color={"white"} onClick={() => navigate('/askQuestion')} rounded={"3xl"}>Ask Question</Button>}

        {!walletAddress ?
          <>
            <Button leftIcon={<Temple height={"27"} />} backgroundColor={"#FE8542"} color={"white"} onClick={handleConnectWallet} rounded={"3xl"}>
              Connect Wallet
            </Button>
          </> :
          <>
            <Menu>
              <MenuButton as={Button} rounded={"3xl"} colorScheme={"blue"}>
                {walletAddress.slice(0, 8) + "..." + walletAddress.slice(-4)}
              </MenuButton>
              <MenuList>
                {isAdmin1 && <MenuItem onClick={() => navigate('/admin')}>Admin</MenuItem>}
                <MenuItem onClick={() => navigate('/query')}>Query Page</MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={handleDisconnectWallet}>Disconnect</MenuItem>
              </MenuList>
            </Menu>
          </>}
      </HStack >
    </HStack >
  )
}

export default Navbar;
