import React, { useState } from "react";
import { Box, Text, Container, Input, Button } from "@chakra-ui/react";
import { useForm } from 'react-hook-form'

export default function RegisterPage() {

    const [inputValue, setInputValue] = useState({
        email: '',
        name: '',
        password: '',
        pwConfirmed: ''
    })

    const { register, clearErrors, setError, formState: { errors } } = useForm();
    return (
        <Container>
            <Box mt={30}>
                <Text textAlign={'center'} fontSize={20} mb={10}>회원가입</Text>
                <form>
                    <Text>email</Text>
                    <Input { ...register('email',{ required: true }) } />
                    <Text>name</Text>
                    <Input { ...register('name', { required: true }) } />
                    <Text>password</Text>
                    <Input { ...register('password', { required:true }) } />
                    <Box mt={4}>
                        <Button type={"submit"}>로그인</Button>
                    </Box>
                </form>
            </Box>
        </Container>
    )
}
