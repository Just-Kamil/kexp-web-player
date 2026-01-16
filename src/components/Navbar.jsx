import ShowIndicator from "./ShowIndicator.jsx";
import kexpLogo from "../assets/kexp-logo.svg";


function NavBar() {

    return (
        <div className=" flex flex-row navbar-fixed-top w-screen justify-between bg-black/50 left-0 shadow-lg  absolute top-0 h-min">
            <img src={kexpLogo} alt='KEXP-logo' className=' w-30 content-center ml-5 '></img>
            <ShowIndicator />
            <div className='flex row content-center self-center mr-5 text-2xl'>
                <a  className='self-center mr-2' href='https://www.kexp.org/donate/'>Donate</a>
                <h2 className='text-yellow-500 font-bold'> | </h2>
                <a  className='self-center ml-2' href='https://www.kexp.org/'>Website</a>
            </div>
        </div>
    )
}

export default NavBar;