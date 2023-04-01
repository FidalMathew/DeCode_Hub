import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import QueryCard from "../components/QueryCard"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Query = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const getQueries = async () => {
            setloading(true)
            const response = await axios.get("https://decodehub-app.onrender.com/question/get-question");
            setQuestions(response.data);
            console.log(response.data)
            setloading(false)
        };
        getQueries();
    }, []);

    return (
        <Box bg="background" minHeight={"100vh"}>

            <Navbar queryBar={true} />
            <VStack padding={"6"}>
                <Heading color={"white"} marginBottom={"10"}>Top Queries</Heading>
                {questions.length === 0 && <Text color={"white"}>No queries yet</Text>}
                {questions.map((question) => (
                    <Link to={`/answer/${question._id}`}>
                        <QueryCard
                            key={question._id}
                            title={question.title}
                            total={question.ans}
                            description={question.description}
                            code={question.code}
                            codeLanguage={question.codeLanguage}
                            image={question.image}
                            user={question.userId.account}
                        />
                    </Link>
                ))}
            </VStack>
        </Box>
    )
}

export default Query
