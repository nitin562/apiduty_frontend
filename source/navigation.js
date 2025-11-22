import {navigationRef} from "./Source.jsx"

export default function navigate(name, params={}){
    if(navigationRef.isReady()){
        navigationRef.navigate(name, params)
    }
    else{
        console.warn("Navigation Not Ready Yet")
    }
}
