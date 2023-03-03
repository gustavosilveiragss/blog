import Image from "next/image";
import { FaInstagram, FaLinkedin, FaGithub, } from "react-icons/fa";
import { IoMdMail, } from "react-icons/io";
import Logo from '../../public/icons/logo-temp.svg';

const Footer = () => {
    return (
        <footer id="footer" className="flex flex-row lg:footer items-center p-4 bg-base-300 text-neutral-content justify-around">
            <div className="flex flex-row items-center lg:items-center lg:grid-flow-col">
                <Image alt="G" height={30} width={30} color="white" src={Logo} />
                <p className="text-xs pl-2">© {new Date().getFullYear()} | Gustavo Silveira</p>
            </div>
            <div className="flex flex-row lg:grid-flow-col">
                <a href="mailto:gustavo24gss@gmail.com" className="mr-2">
                    <IoMdMail size={18} />
                </a>
                <a href="https://www.linkedin.com/in/gustavosilveirass" className="mr-2">
                    <FaLinkedin size={18} />
                </a>
                <a href="https://github.com/gustavosilveiragss" className="mr-2">
                    <FaGithub size={18} />
                </a>
                <a href="https://www.instagram.com/gustavosilveirass">
                    <FaInstagram size={18} />
                </a>
            </div>
        </footer>
    );
}

export default Footer;