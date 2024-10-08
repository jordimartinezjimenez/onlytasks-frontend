import Logo from "./Logo";
import NavMenu from "./NavMenu";

export default function Header() {
    return (
        // <header className="bg-[#74d3d1] py-5 animate-fade-down">
        //     <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        //         <div className="w-64">
        //             <Logo />
        //         </div>
        //     </div>
        // </header>
        <header className="border-2 border-primary py-5 my-5 max-w-screen-md mx-auto rounded-3xl animate-fade-down">
            <div className="flex flex-col lg:flex-row justify-between items-center px-5">
                <div className="w-40">
                    <Logo />
                </div>
                <NavMenu />
            </div>
        </header>
    )
}
