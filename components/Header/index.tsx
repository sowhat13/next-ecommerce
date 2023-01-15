import Navbar from './Navbar'
import Notification from './Notification';

function Header(props: any) {
    const signOut = () => {
        props.signOut();
    }
    return (
        <>
            <Notification />
            <Navbar signOut={signOut} />
        </>
    )
}




export {
    Header
}