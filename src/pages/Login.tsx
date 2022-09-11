import React, {useState} from 'react'
import {Box, Button, Container, FormControl, Input, Text} from '@chakra-ui/react'
import {useAppDispatch} from "../redux/store";
import {getLogin} from "../redux/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()
    const [form, setForm] =useState({
        userId: '',
        password: ''
    })

    const handleLogin = () => {
        const firstPatch = getLogin(true)
        dispatch(firstPatch)
        navigate('/home')
    }


    return (
        <Box w={'100%'} h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box w={400}>
                <Text textAlign={'center'}>Login</Text>
                <Input name={"userId"} value={form.userId}placeholder={'아이디'}></Input>
                <Input name={'password'} value={form.password} placeholder={'비밀번호'}></Input>
                <Button w={'100%'} onClick={handleLogin}>로그인</Button>
            </Box>

        </Box>
    )
}


export default  Login;
