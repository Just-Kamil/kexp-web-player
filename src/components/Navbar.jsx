import ShowIndicator from "./ShowIndicator.jsx";


function NavBar() {

    return (
        <div className=" flex flex-row navbar-fixed-top w-screen justify-between bg-black/50 left-0 shadow-lg  absolute top-0 h-min">
            <h1 className=' content-center ml-5 text-yellow-500 font-bold'>KEXP</h1>
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