import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoDiv from './LogoDiv';
import axios from 'axios';

export default function RegisterPage() {
    return (
        <MainPageContent>
            <LogoDiv/>
            <FormDiv>
                <form>
                    <input name='email' type='text' placeholder='E-mail'/>
                    <input name='password' type='text' placeholder='Password'/>
                    <input name='username' type='text' placeholder='E-mail'/>
                    <input name='image' type='text' placeholder='Picture URL'/>
                    <button name='login' type='submit'>Sign Up</button>
                    <Link to='/'><p>Switch back to log in</p></Link>
                </form>
            </FormDiv>
        </MainPageContent>
    )
}

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