import axios from "axios";
import { useEffect, useReducer } from "react";

interface CustomQueryHookState {
    isLoading: boolean,
    error: string,
    data: any
}

const initialState: CustomQueryHookState = {
    isLoading: false,
    error: "",
    data: null
}
const reducer = (state: CustomQueryHookState, action: {type: string, payload?: any}) => {
    switch(action.type){
        case "CALL":
            return {...state, isLoading: true}
        case "ERROR":
            return {...state, isLoading: false, error: action.payload}
        case "SUCCESS":
            return {...state, isLoading: false, data: action.payload}
        default:
            return state
    }
}
const useCustomQuery = (queryService: (...params: any) => Promise<any>, ...queryParams: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        const controller = new AbortController();

        dispatch({type: "CALL"})
        ;(async ()=> {
            try {
                const data = await queryService(...queryParams, {signal: controller.signal});
                dispatch({type: "SUCCESS", payload: data.data})
            } catch (error) {
                if(axios.isCancel(error)){
                    dispatch({type: "ERROR", payload: "Request Canceled"})
                    return
                }
                if(error instanceof Error){
                    dispatch({type: "ERROR", payload: error.message})
                }
            }
        })()

        // cleanup
        return () => controller.abort();
    }, [])

    return {...state}
}

export default useCustomQuery