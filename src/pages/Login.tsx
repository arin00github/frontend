import React, {useState} from 'react'
import {Box, Container, FormControl, Input, Text} from '@chakra-ui/react'

const Login = () => {
    const [form, setForm] =useState({
        userId: '',
        password: ''
    })
    return (
        <Box w={'100%'} h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box w={400}>
                <Text textAlign={'center'}>Login</Text>
                <Input name={"userId"} value={form.userId}placeholder={'아이디'}></Input>
                <Input name={'password'} value={form.password} placeholder={'비밀번호'}></Input>
            </Box>

        </Box>
    )
}


export default  Login;
