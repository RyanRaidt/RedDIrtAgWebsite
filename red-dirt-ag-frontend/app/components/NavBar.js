export default function NavBar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Red Dirt Ag</h1>
      <div className="space-x-6">
        <a href="/" className="text-gray-600 hover:text-green-600">
          Home
        </a>
        <a href="/quote" className="text-gray-600 hover:text-green-600">
          Get a Quote
        </a>
        <a href="/contact" className="text-gray-600 hover:text-green-600">
          Contact
        </a>
      </div>
    </nav>
  );
}
