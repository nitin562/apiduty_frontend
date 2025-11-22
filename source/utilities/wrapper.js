export function wrapWithLoader(func, setLoading){
    return async ()=>{
        setLoading(true)
        await func()
        setLoading(false)
    }
}
