function LoginPage({
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    setIsRegistering,
  }) {
    return (
      <div className="min-h-screen bg-slate-100 flex">
        <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold mb-4">
            HireLoom
          </h1>
  
          <p className="text-xl text-blue-100">
            Weave your career path
          </p>
        </div>
  
        <div className="w-1/2 flex items-center justify-center">
          <div className="bg-white shadow-xl rounded-2xl p-10 w-[420px]">
            <h2 className="text-3xl font-bold mb-6">
              Login
            </h2>
  
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />
  
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-6"
            />
  
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              Login
            </button>
  
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 cursor-pointer font-semibold"
              >
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default LoginPage;