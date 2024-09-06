import React from "react";
import NavbarHome from "./NavbarHome";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <NavbarHome />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url('./Red Modern Texture Background Online Delivery - Banner.png')` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4" style={{ color: "#FFFFFF" }}>
            Welcome to Max Delivery
          </h1>
          <p className="mt-4 text-lg md:text-2xl" style={{ color: "#FFFFFF" }}>
            Your journey to success starts here
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition duration-300" style={{ backgroundColor: "#3e5091" }}>
            Get Started
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="attributes" className="py-24 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12-12"  style={{ color: "#3e5091" }}>
    Nos Atouts</h2>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105">
              <img
                src="./icons8-approbation-50.png"
                alt="Rapidité"
                className="w-24 h-24 mb-6 mx-auto object-cover"
              />
              <h3 className="text-2xl font-semibold mb-4">Rapidité</h3>
              <p className="text-gray-700">Nous garantissons les délais de livraison et de contre-remboursement les plus rapides.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105">
              <img
                src="./icons8-coup-de-main-50.png"
                alt="Fiabilité"
                className="w-24 h-24 mb-6 mx-auto object-cover"
              />
              <h3 className="text-2xl font-semibold mb-4">Fiabilité</h3>
              <p className="text-gray-700">Nous nous engageons à assurer que vos clients reçoivent leurs colis en parfait état.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105">
              <img
                src="./icons8-carte-64.png"
                alt="Traçabilité"
                className="w-24 h-24 mb-6 mx-auto object-cover"
              />
              <h3 className="text-2xl font-semibold mb-4">Traçabilité</h3>
              <p className="text-gray-700">Suivez vos colis en temps réel grâce à notre plateforme.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105">
              <img
                src="./icons8-monde-50.png"
                alt="Practicité"
                className="w-24 h-24 mb-6 mx-auto object-cover"
              />
              <h3 className="text-2xl font-semibold mb-4">Practicité</h3>
              <p className="text-gray-700">Nous venons récupérer vos colis directement à votre domicile.</p>
            </div>
          </div>
        </div>
      </section>
      <br/>
      <br/>
       <br/>
      


      {/* About Us Section */}
      <div className="container mx-auto text-center">
      <h2 className="text-5xl font-bold mb-12" style={{ color: "#3e5091" }}>
  À propos de Max Delivery
</h2>

    </div>
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img src="./1.jpg" alt="About Us" className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300" />
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
  <p className="text-gray-700 mb-4 text-lg md:text-xl">
    Max Delivery est une société de livraison innovante basée au Maroc, dédiée à offrir des solutions de transport rapides et fiables pour tous vos besoins de livraison.
  </p>
  <p className="text-gray-700 mb-4 text-lg md:text-xl">
    Notre mission est de simplifier le processus de livraison en offrant des services de haute qualité, adaptés aux exigences de nos clients. Grâce à une équipe professionnelle et une plateforme moderne, nous garantissons la sécurité et la rapidité de chaque envoi.
  </p>
  <p className="text-gray-700 text-lg md:text-xl">
    Que vous ayez besoin d'une livraison express ou d'un service de contre-remboursement, Max Delivery est votre partenaire de confiance pour des solutions de livraison efficaces et personnalisées. Faites-nous confiance pour prendre soin de vos colis et offrir une expérience sans faille à vos clients.
  </p>
</div>

        </div>
        {/* <Footer/> */}

      </section>
      <Footer/>

    </div>
    
  );
};

export default Home;
