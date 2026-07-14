function Navbar({ setIsLoggedIn, setEmail, setPassword }) {
    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
    };
  
    return (
      <nav className="bg-white shadow px-8 py-4 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            HireLoom
          </h1>
  
          <p className="text-gray-500">
            Weave your career path
          </p>
        </div>
  
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </nav>
    );
  }
  
  export default Navbar;