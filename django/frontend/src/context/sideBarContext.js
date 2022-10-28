import { useState, createContext } from "react";
const SideBarContext = createContext();
export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return <SideBarContext.Provider value={{ isOpen, setIsOpen, toggleMenu }}>{children}</SideBarContext.Provider>
}
export default SideBarContext;