import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Home(){

    const logo = require("./../../assets/images/Logo.png")

    return(
        <>
        <Navbar/>
        <div className="bg-hero-pattern">
            <div className="container mx-auto flex flex-row justify-between items-center py-10">
                <div className="flex flex-col">
                    <h1>
                        Transform your business
                    </h1>
                    <p className="mb-10">
                        Gain key insights about your business, allowing you to make more informed decisions and feel
                        confident in the direction your business is heading in. Amend your menu and staff schedules, 
                        giving you-the business owner, full control.
                    </p>
                </div>
                <div>
                    <img alt="Logo" className="rounded-lg" src={logo}/>
                </div>
            </div>
            <div className="container mx-auto m-20">
                <h2>
                    What we do and who we are!
                </h2>
                <p class="text-2xl">
                    Fish Inn started as a small company created by a young man called Chas, who coincidentally,
                    spent a significant portion of his youth working in a fish shop called the Fish Inn. Chas and his
                    parents were tired of not being able to understand the direction their business was heading. They
                    wanted something, or someone, to answer critical questions they had about the business, for example:
                    best selling products, customer demographics, stock levels and what the current state of an
                    everchanging menu was! Chas created Fish Inn to answer these questions, and it is now empowering Fish shops
                    across the UK!
                </p>
            </div>
        </div>
        <Footer/>
        </>
    );

}