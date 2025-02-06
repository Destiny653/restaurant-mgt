'use client'
import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Clock, MapPin, Phone, ChefHat, Utensils, Wine } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[80vh]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Restaurant atmosphere"
            className="opacity-40 w-full h-full transform transition-transform duration-[20s] object-cover scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        <div className="relative flex items-center mx-auto px-4 h-full container">
          <div className={`max-w-2xl text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block mb-4 font-cormorant text-xl text-yellow-400 italic">
              Welcome to
            </span>
            <h1 className="mb-6 font-bold font-playfair text-6xl leading-tight">
              La Maison
              <span className="block mt-2 font-cormorant font-normal text-2xl text-gray-300 italic">
                Fine Dining & Culinary Arts
              </span>
            </h1>
            <p className="mb-8 font-lato text-gray-200 text-xl">
              Where culinary artistry meets warm hospitality in an atmosphere of refined elegance
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={'/reservation'}>
              <button className="group flex items-center bg-yellow-600 hover:bg-yellow-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Reserve a Table
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
              </button>
              </Link>
              <Link href={'/menu'}>
                <button className="group relative border-2 border-white hover:border-yellow-400 px-8 py-4 rounded-lg font-semibold transition-all duration-300 overflow-hidden">
                  <span className="group-hover:text-gray-900 relative z-10 transition-colors duration-300">Explore Menu</span>
                  <div className="group-hover:scale-x-100 absolute inset-0 bg-white transform origin-left transition-transform duration-300 scale-x-0" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className={`bg-white shadow-xl py-12 relative z-10 -mt-20 mx-4 rounded-xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="mx-auto px-4 container">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: <Clock className="w-8 h-8 text-yellow-600" />,
                title: "Opening Hours",
                info: "Mon-Sun: 11:00 AM - 11:00 PM",
                subInfo: "Kitchen closes at 10:00 PM"
              },
              {
                icon: <MapPin className="w-8 h-8 text-yellow-600" />,
                title: "Location",
                info: "123 Gourmet Street, Foodville",
                subInfo: "Valet parking available"
              },
              {
                icon: <Phone className="w-8 h-8 text-yellow-600" />,
                title: "Reservations",
                info: "(555) 123-4567",
                subInfo: "Or book online 24/7"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 hover:bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <div className="bg-yellow-50 p-3 rounded-full">{item.icon}</div>
                <div>
                  <h3 className="mb-1 font-playfair font-semibold text-xl">{item.title}</h3>
                  <p className="font-lato text-gray-600">{item.info}</p>
                  <p className="mt-1 font-lato text-gray-400 text-sm">{item.subInfo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto px-4 container">
          <div className="items-center gap-16 grid grid-cols-1 md:grid-cols-2">
            <div>
              <span className="font-cormorant text-xl text-yellow-600 italic">Our Story</span>
              <h2 className="mb-6 font-bold font-playfair text-4xl">A Legacy of Culinary Excellence</h2>
              <p className="mb-6 font-lato text-gray-600 leading-relaxed">
                Founded in 2010, La Maison has been serving exceptional cuisine that
                combines traditional flavors with modern innovation. Our passionate
                team of chefs creates memorable dining experiences using only the
                finest locally-sourced ingredients.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-lato text-gray-600">4.8/5 from 500+ reviews</span>
              </div>
              <div className="gap-6 grid grid-cols-3">
                {[
                  { icon: <ChefHat className="w-6 h-6" />, text: "Master Chefs" },
                  { icon: <Utensils className="w-6 h-6" />, text: "Fine Cuisine" },
                  { icon: <Wine className="w-6 h-6" />, text: "Premium Wines" }
                ].map((item, index) => (
                  <div key={index} className="bg-white shadow-sm hover:shadow-md p-4 rounded-lg text-center transition-shadow duration-300">
                    <div className="inline-flex bg-yellow-50 mb-3 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <p className="font-semibold text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="gap-4 grid grid-cols-2">
              {[
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
                "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de",
                "https://images.unsplash.com/photo-1542528180-1c2803fa048c"
              ].map((src, index) => (
                <div
                  key={index}
                  className="group relative shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`Restaurant image ${index + 1}`}
                    className="group-hover:scale-110 w-full h-48 transform transition-transform duration-500 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative bg-gray-900 py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
            alt="Restaurant ambiance"
            className="opacity-25 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="relative mx-auto px-4 text-center container">
          <h2 className="mb-8 font-bold font-playfair text-4xl text-white">
            Experience the Magic of La Maison
          </h2>
          <p className="mx-auto mb-12 max-w-2xl font-lato text-gray-300 text-xl">
            Join us for an unforgettable dining experience. Book your table today
            and let us take you on a culinary journey.
          </p>
         <Link href={'/reservation'}>
          <button className="bg-yellow-600 hover:bg-yellow-700 px-12 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Make a Reservation
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;