import styled from 'styled-components'
import { BiRepost } from 'react-icons/bi'

export default function RepostBar(){
    return(
        <Bar>
            <BiRepost style={{color:"#FFFFFF", fontSize:25+"px", marginLeft: 15+"px"}}/>
            <span>Re-posted by <strong>You</strong></span>
        </Bar>
    )
}

const Bar = styled.div`
    width: 100%;
    height: 35px;
    border-radius: 16px;
    background-color:#1E1E1E;

    display: flex;
    align-items: center;

    span{
        color:#FFFFFF;
        margin-left: 6px;
    }

    strong{
        font-weight: bolder;
    }

    @media (max-width: 675px){
        border-radius: 0px;
    }
`