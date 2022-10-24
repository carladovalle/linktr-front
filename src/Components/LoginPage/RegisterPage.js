import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoDiv from './LogoDiv';
import axios from 'axios';

export default function RegisterPage() {
    const [form, setForm] = useState({})
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const navigate = useNavigate()
    const data = localStorage.getItem('token');

    useEffect(() => {
        if (data) {
            navigate("/timeline")
            return;
        }
    },[data, navigate])
    

    function handleForm(event) {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    function sendForm(event){
        event.preventDefault()
        setIsButtonDisabled(true)
        const url = process.env.REACT_APP_API_BASE_URL
        axios.post(`${url}/sign-up`, form)
          .then((response) => {
            console.log(response);
            setIsButtonDisabled(false)
            navigate("/")
          })
          .catch((error) => {
            console.log(error)
            if(error.response.status === 409){
                alert("E-mail ou usuário já cadastrado")
            }
            setIsButtonDisabled(false)
          });
    }

    return (
        <MainPageContent>
            <LogoDiv/>
            <FormDiv>
                <form onSubmit={sendForm}>
                    <input name='email' type='email' placeholder='E-mail' onChange={handleForm} disabled={isButtonDisabled ? true : false} required/>
                    <input name='password' type='password' placeholder='Password' onChange={handleForm} disabled={isButtonDisabled ? true : false} required/>
                    <input name='name' type='text' placeholder='Name' onChange={handleForm} disabled={isButtonDisabled ? true : false} required/>
                    <input name='username' type='text' placeholder='Username' onChange={handleForm} disabled={isButtonDisabled ? true : false} required/>
                    <input name='image' type='url' placeholder='Picture URL' onChange={handleForm} disabled={isButtonDisabled ? true : false} required/>
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
    @media (max-width: 635px) {
		display: flex;
		flex-direction: column;
	}   
`

const FormDiv = styled.div`

    form{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 50px;

        @media (max-width: 635px) {
			margin-top: 10%;
			padding: 0;
			justify-content: center;
			align-items: center;
		}
    }

    input{
        all:unset;
        width:430px;
        height:65px;
        background: #FFFFFF;
        border-radius: 6px;
        margin-bottom: 13px;
        padding-left:20px;

        @media (max-width: 635px) {
			width: 85%;
		}
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

        @media (max-width: 635px) {
			width: 85%;
		}
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