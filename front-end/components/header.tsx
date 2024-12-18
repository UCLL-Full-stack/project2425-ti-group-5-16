import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header
      className="p-3 mb-3 border-bottom"
      style={{ background: 'linear-gradient(90deg, #065290, #0a74da)' }}
    >
      <a className="fs-2 fw-bold d-flex justify-content-center mb-2 mb-lg-0 text-white text-decoration-none">
        Setup Showcase
      </a>
      <nav className="nav justify-content-center">
        <Link
          href="/"
          className="nav-link px-4 fs-5 text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#065290]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
        >
          HomePage
        </Link>
        <Link
          href="/SetupOverview"
          className="nav-link px-4 fs-5 text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#065290]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
        >
          SetupOverview
        </Link>

        <Link
          href="/CreateNewSetup"
          className="nav-link px-4 fs-5 text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#065290]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
        >
          CreateNewSetup
        </Link>

        <Link
          href="/EditSetup"
          className="nav-link px-4 fs-5 text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#065290]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
        >
          EditYourSetup
        </Link>

        <Link
          href="/Login"
          className="mt-2 w-14 h-8 bg-[#005d8c] hover:bg-[#063970] rounded text-white flex items-center justify-center no-underline"
        >
          Login
        </Link>

        <Link
          href="/Register"
          className="mt-2 w-14 h-8 bg-[#005d8c] hover:bg-[#063970] rounded text-white flex items-center justify-center no-underline"
        >
          Register
        </Link>
        
      </nav>
    </header>
  );
};

export default Header;

