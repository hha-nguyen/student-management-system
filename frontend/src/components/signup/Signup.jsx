import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Flex, Heading, Image, Link, Stack, Text} from "@chakra-ui/react";
import CreateStudentForm from "../shared/CreateStudentForm.jsx";

const Signup = () => {
    const { student, setStudentFromToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (student) {
            navigate("/dashboard/students");
        }
    })

    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <Flex p={8} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Image
                        src={"https://uet.vnu.edu.vn/wp-content/uploads/2017/02/logo2_new.png"}
                        boxSize={"400px"}
                        alt={"UET Logo"}
                        alignSelf={"center"}
                    />
                    <Heading fontSize={'2xl'} mb={15}>Register for an account</Heading>
                    <CreateStudentForm onSuccess={(token) => {
                        localStorage.setItem("access_token", token)
                        setStudentFromToken()
                        navigate("/dashboard");
                    }}/>
                    <Link color={"blue.500"} href={"/"}>
                        Already have an account? Login
                    </Link>
                </Stack>
            </Flex>
            <Flex
                flex={1}
                p={10}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                bgGradient={{sm: 'linear(to-r, blue.600, purple.600)'}}
            >
                <Text fontSize={"6xl"} color={'white'} fontWeight={"bold"} mb={5}>
                    <Link target={"_blank"} href={"https://uet.vnu.edu.vn/"}>
                        UET Page
                    </Link>
                </Text>
                <Image
                    alt={'Signup Image'}
                    objectFit={'scale-down'}
                    src={'https://huongnghiep.hocmai.vn/wp-content/uploads/2021/12/1.png'}
                />
            </Flex>
        </Stack>
    );
}

export default Signup;