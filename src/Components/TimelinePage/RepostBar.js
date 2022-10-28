import styled from 'styled-components'
import { BiRepost } from 'react-icons/bi'
import { useEffect, useState } from 'react'

export default function RepostBar({isrepost, reposterid, reposterName}){
    
    const [name, setName] = useState('')
    const userId = localStorage.getItem('id')
    
    useEffect(() => {
        if(Number(reposterid) === Number(userId)){
            setName("You")
        }else{
            setName(reposterName)
        }
    }, [])
    

    return(
        <>
        {
        isrepost ?
        <Bar>
            <BiRepost style={{color:"#FFFFFF", fontSize:25+"px", marginLeft: 15+"px"}}/>
            <span>Re-posted by <strong>{name}</strong></span>
        </Bar>
        :
        <></>
        }
        </>
        
        
    )
}

const Bar = styled.div`
    width: 100%;
    height: 70px;
    border-radius: 16px 16px;
    background-color:#1E1E1E;
    margin-bottom: -32px;
    padding-top: 8px;

    display: flex;
    align-items: flex-start;

    span{
        color:#FFFFFF;
        margin-left: 6px;
        margin-top: 4px;
    }

    strong{
        font-weight: bolder;
    }

    @media (max-width: 675px){
        border-radius: 0px;
    }
`