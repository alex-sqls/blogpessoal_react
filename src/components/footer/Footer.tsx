import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function Footer() {
  const data = new Date().getFullYear();

  return (
    <div className="bg-indigo-900 text-white py-4 flex flex-col items-center gap-2">
      <p className="text-sm">
        Blog Pessoal Generation | Copyright {data}
      </p>
      <p className="text-sm">Acesse nossas redes sociais</p>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <LinkedinLogo size={32} weight="fill" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramLogo size={32} weight="fill" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookLogo size={32} weight="fill" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
