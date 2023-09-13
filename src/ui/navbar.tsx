import React from "react";

interface NavbarProps {
    children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ( {children} ) => {
    return (
        <nav className="w-screen h-[80px] px-3">
           <ul className="flex justify-between">
               {React.Children.map(children, (child, index) => (
                     <li key={index}>{child}</li>
               ))}
           </ul>
        </nav>
    )
};

export default Navbar;
