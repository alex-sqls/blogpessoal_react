import { FacebookLogo, FacebookLogoIcon, InstagramLogo, InstagramLogoIcon, LinkedinLogo, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
  const data = new Date().getFullYear();

  const {usuario} = useContext(AuthContext)

  let component: ReactNode

  if (usuario.token !== "") {
    component = (
      <div className="bg-indigo-900 text-white py-4 flex flex-col items-center gap-2">
      <p className="text-sm">
        Blog Pessoal Generation | Copyright {data}
      </p>
      <p className="text-sm">Acesse nossas redes sociais</p>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <LinkedinLogoIcon size={32} weight="fill" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramLogoIcon size={32} weight="fill" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookLogoIcon size={32} weight="fill" />
        </a>
      </div>
    </div>
    )
  }

  return (
    <>
    {component}
    </>
  );
}

export default Footer;
