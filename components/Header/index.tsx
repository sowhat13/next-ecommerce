import Navbar from './Navbar'
import Notification from './Notification';

function Header(props: any) {
    const signOut = () => {
        props.signOut();
    }
    return (
        <div className='flex flex-col w-full  sticky top-0 left-0 z-50 bg-background-color'>
            <Notification />
            <Navbar signOut={signOut} />
        </div>
    )
}




export {
    Header
}