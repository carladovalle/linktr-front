import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDiv from './LogoDiv';
import axios from 'axios';

export default function RegisterPage() {
    const [form, setForm] = useState({})
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const navigate = useNavigate()

    function handleForm(event) {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    function sendForm(event){
        event.preventDefault()
        const url = "http://localhost:5000"
        //const url = process.env.REACT_APP_API_BASE_URL
        axios.post(`${url}/sign-up`, form)
          .then((response) => {
            console.log(response);
            navigate("/")
          })
          .catch((error) => {
            console.log(error)
            if(error.response.status === 409){
                alert("E-mail ou usuário já cadastrado")
            }
            setIsButtonDisabled(false)
          });
        setIsButtonDisabled(!isButtonDisabled)
    }

    return (
        <MainPageContent>
            <LogoDiv/>
            <FormDiv>
                <form onSubmit={sendForm}>
                    <input name='email' type='email' placeholder='E-mail' onChange={handleForm} required/>
                    <input name='password' type='password' placeholder='Password' onChange={handleForm} required/>
                    <input name='name' type='text' placeholder='Name' onChange={handleForm} required/>
                    <input name='username' type='text' placeholder='Username' onChange={handleForm} required/>
                    <input name='image' type='url' placeholder='Picture URL' onChange={handleForm} required/>
                    <button name='sign-up' type='submit' onChange={handleForm} disabled={isButtonDisabled} required>Sign Up</button>
                    <Link to='/'><p>Switch back to log in</p></Link>
                </form>
            </FormDiv>
        </MainPageContent>
    )
}

const isButtonDisabled = true

const MainPageContent = styled.div`
    display:flex;
`

const FormDiv = styled.div`

    form{
        display: flex;
        flex-direction: column;
        margin-top: 45%;
        padding: 50px;
    }

    input{
        all:unset;
        width:430px;
        height:65px;
        background: #FFFFFF;
        border-radius: 6px;
        margin-bottom: 13px;
        padding-left:20px;
    }

    input::placeholder{
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        padding-left:20px;
    }

    button{
        all:unset;
        width:430px;
        height:65px;
        background: #1877F2;
        border-radius: 6px;
        margin-bottom: 13px;
        padding-left:20px;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        color: #FFFFFF;
        text-align: center;
    }

    button:disabled{
        background: #000000;
    }

    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        text-decoration:underline;
        color:#FFFFFF;
        text-align:center;
    }
`