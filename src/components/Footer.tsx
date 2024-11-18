import Image from "next/image";
import githubImgSrc from "../../public/github-mark.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-5 flex h-8 w-full flex-row items-center justify-center gap-2 px-5 py-6">
      <p>Copyright © Laszlo Kis {new Date().getFullYear()}</p>
      <Link
        className="flex items-center justify-center text-xl text-gray-950 hover:text-neutral-400"
        href="https://github.com/ev0clu"
        target="_blank"
      >
        <Image
          src={githubImgSrc}
          alt="github-logo"
          className={"rounded-full hover:opacity-60"}
          height={20}
          width={20}
        />
      </Link>
    </footer>
  );
};

export default Footer;
