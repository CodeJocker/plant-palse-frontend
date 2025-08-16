'use client'

const NavBar = () =>{
    
    return (
        <>
            <header className="bg-white fixed w-full shadow text-green-700">
                <ul className="flex justify-between items-center px-4 md:px-16 py-4">
                    <li className="font-bold text-lg text-green-700">Mylogo</li>
                    <li className="md:hidden text-green-700">
                       <button>
                         
                       </button>
                    </li>
                    <li className="md:block order-2">
                            <li className="px-2 py-2 border border-gray-600 rounded-full">
                                <button>👨</button>
                            </li>
                    </li>
                </ul>
              
               
            </header>
        </>
    )
}
export default NavBar