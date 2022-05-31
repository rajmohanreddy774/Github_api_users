import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const initState={
    loading:true,
    error:false,
    data:{}
}

const githubAction={
"fetch":"fetch",
"success":"success",
"failure":"failure"
}


const githubReducer=(state, action)=>{
switch(action.type){
    case githubAction.fetch:{
        return({ 
            ...state,
            loading:true,
            error:false,
            data:null
            } )
    }
    case githubAction.success:{
        return({
            ...state,
            loading:false,
            error:false,
            data:action.payload
        })
    }
    case githubAction.failure:{
        return({
            ...state,
            loading:true,
            error:true,
        })
    }
    default: return state
}
}

const Github = () => {
    const[{loading,error,data}]=useReducer(githubReducer, initState)

    useEffect(()=>{
        dispatch({
            type:githubAction.fetch
        })
        axios({
            url:"https://api.github.com/search/users",
            method:"GET",
            params:{
                q:"masai"
            }
        }).then((res)=>{
            dispatch({
                type:githubAction.success,
                payload:res.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:githubAction.failure
            })
        })
    },[])
    console.log(data)
  return (
    <div>
        {loading && <div>Loading</div>}
        {error && <div>Error</div>}
        {
            data?.items.map((item)=><div key={item.id}>{item.login}</div>)
        }
      
    </div>
  )
}

export default Github
