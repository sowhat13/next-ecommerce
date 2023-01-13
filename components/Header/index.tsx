import Navbar from './Navbar'

function Header(props: any) {
    const signOut = () => {
        props.signOut();
    }
    return (
        <>
            <Navbar signOut={signOut} />
        </>
    )
}




export {
    Header
}