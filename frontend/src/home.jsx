import "./index.css";
import Navbar from "./navbar";

function Home() {
    return (
        <>
            <Navbar />
            <div className="relative flex flex-col items-center bg-gray-100 min-h-screen">
                <div className="absolute inset-0 bg-cover bg-center opacity-70" 
                     style={{ backgroundImage: "url('https://media.gettyimages.com/id/1358342424/photo/sunset-in-the-rural-area-of-the-state-of-s%C3%A3o-paulo.jpg?s=612x612&w=0&k=20&c=Li5D3lpXykO5vHrkDhY6CTrg0tMZnXHYP0NpciU8VGo=')" }} />
                <div className="relative mt-24 z-10 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" style={{ backgroundImage: "url('https://www.taropumps.com/media/2001/agronomist-with-farmer-at-cotton-field.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity:0.8 }}>
                    <h1 className="text-4xl font-bold text-center text-black-700 mt-8 ml-2">
                        Welcome to Rural Connect
                    </h1>
                    <p className="text-lg text-gray-700 text-center mt-4 text-black">
                        Your one-stop destination for information on government services, community discussions, and support for rural development.
                    </p>
                    <p className="text-lg text-gray-600 text-center mt-4 text-black">
                        Explore our resources to connect with the government services that matter most to you. Join discussions with fellow users and get immediate support through our chatbot.
                    </p>
                    <button className="mt-6 mx-auto ml-30 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
                     Get Started
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;