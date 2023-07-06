import {Link} from 'react-router-dom';

export default function LoginHeader({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    const logo = require("./../../assets/images/Logo.png")
    return(
        <div className="mb-10">
             <div className="flex justify-center">
                <img 
                    alt="Logo"
                    className="h-auto max-w-xs rounded-lg"
                    src={logo}/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-600">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-teal-700 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-blue-600 hover:text-blue-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}