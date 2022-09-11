import React, { useState } from "react";
import { Box, Text, Container, Input, Button } from "@chakra-ui/react";
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function LoginPage() {

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
          <Text mb={10} fontSize={20} textAlign={'center'}>로그인</Text>
          <form>
            <Text>email</Text>
            <Input { ...register('email',{ required: true }) } />
            <Text>name</Text>
            <Input { ...register('name', { required: true }) } />
            <Text>password</Text>
            <Input { ...register('password', { required:true }) } />
            <Text>password confirm</Text>
            <Input { ...register('pwConfirmed', { required:true }) } />
            <Box mt={4}>
              <Button w={'100%'} type={"submit"}>로그인</Button>
            </Box>
            <Box mt={10}>
              <Text><Link to={'/register'}>회원가입</Link></Text>
            </Box>
          </form>
        </Box>
      </Container>
  )
}
