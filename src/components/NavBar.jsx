import { LogIn } from "lucide-react";
function NavBar() {
  return (
    <nav className="sticky left-0 top-0 w-full shadow-md flex justify-between px-12 py-6">
      <h1 className="text-xl font-semibold">InnerCircles</h1>
      <div className="hidden md:flex gap-4 text-neutral-500">
        <button>Home</button>
        <button>Circes</button>
        <button>Post</button>
      </div>
      <div className="login ">
        <button className="flex gap-2 cursor-pointer hover:bg-gray-100 rounded-lg py-2 px-4">
          <span>
            <LogIn />
          </span>{" "}
          Login
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
