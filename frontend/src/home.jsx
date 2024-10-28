import "./index.css";
import Navbar from "./navbar";

function Home() {
    return (
        <>
            <Navbar />
            <div className="relative flex flex-col items-center bg-gray-100 min-h-screen">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" 
                     style={{ backgroundImage: "url('https://tse1.mm.bing.net/th?id=OIP.GhIeA_ylN8puKC-coCFcnQHaFR&pid=Api&P=0&h=220')" }} />
                <div className="relative mt-24 z-10 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center text-green-700 mt-10">
                        Welcome to Rural Connect
                    </h1>
                    <p className="text-lg text-gray-700 text-center mt-4">
                        Your one-stop destination for information on government services, community discussions, and support for rural development.
                    </p>
                    <p className="text-lg text-gray-600 text-center mt-4">
                        Explore our resources to connect with the government services that matter most to you. Join discussions with fellow users and get immediate support through our chatbot.
                    </p>
                    <button className="mt-6 ml-20 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;
