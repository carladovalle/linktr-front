import styled from 'styled-components';

export default function LoginPage() {
    return (
        <MainPageContent>
            <DesktopDiv>
                <div>
                    <h1>linktr</h1>
                    <p>save, share and discover</p>
                    <p>the best links on the web</p>
                </div>
            </DesktopDiv>
            <FormDiv>
                <form>
                    <input name='email' type='text' placeholder='E-mail'/>
                    <input name='password' type='text' placeholder='Password'/>
                    <button name='login' type='submit'>log in</button>
                    <p>First time ? Create an account!</p>
                </form>
            </FormDiv>
        </MainPageContent>
    )
}

const MainPageContent = styled.div`
    display:flex;
`

const DesktopDiv = styled.div`
    background-color: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    height:100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
        font-weight:700;
        font-size:106px;
        color:#FFFFFF;
        font-family: 'Oswald';
        font-style: normal;
        margin-bottom: 20px;
    }

    p{
        font-weight: 700;
        font-size: 43px;
        color: #FFFFFF;
        margin-bottom: 20px;
    }
`

const FormDiv = styled.div`

    form{
        display: flex;
        flex-direction: column;
        margin-top: 60%;
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