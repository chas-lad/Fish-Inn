import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar(){

    const navigate = useNavigate();
    const logo = require("./../../assets/images/Logo.png")
    const className = "block py-2 pl-3 pr-4 text-gray rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    // The purpose of this use effect is to prevent users from just typing in a route path and being allowed access there without
    // being logged in as a registered user. This use effect will run each time the navbar is mounted.
    useEffect(() => {
        console.log('here')
        const loggedInUser = localStorage.getItem("user");

        if (loggedInUser == null) {
           navigate('/')
        }
      }, []);
      // const loggedInUser = localStorage.getItem("user");

      // console.log(loggedInUser)
      // logout the user
      const handleLogout = () => {
        localStorage.clear();
        navigate('/')
      };

    return (
      <>

        <nav class="border-blue-200 bg-teal-300 dark:bg-blue-800 dark:border-blue-700">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <img src={logo} class="h-10" alt="Fish Inn logo" />
            <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
              <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <li>
                  <Link to="/home" className={className}>Home</Link>
                </li>
                <li>
                  <Link to="/home" className={className}>Analytics</Link>
                </li>
                <li>
                  <Link to="/home" className={className}>Menu</Link>
                </li>
                <li>
                  <Link to="/home" className={className}>Profile</Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to="/" className="block py-2 pl-3 pr-4 text-gray rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </>
    )
}