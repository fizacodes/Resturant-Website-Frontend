import React from "react";

function Footer() {
  return (
    <footer className="bg-black border-t border-amber-500/30 text-yellow-50  overflow-hidden pt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-20 ">
        <div>
          <h1 className="text-amber-400 text-2xl mb-4 font-serif font-medium">
            La Cuisine
          </h1>
          <p className="text-yellow-50 text-sm">
            Where culinary excellence meets unforgettable moments.
          </p>
          <div className="flex gap-4 mt-4">
            <img
              src="facebook.svg"
              alt=""
              className="border border-amber-500/50 rounded-full p-2"
            />
            <img
              src="instagram.svg"
              alt=""
              className="border border-amber-500/50 rounded-full p-2"
            />
            <img
              src="twitter.svg"
              alt=""
              className="border border-amber-500/50 rounded-full p-2"
            />
          </div>
        </div>
        <div>
          <h1 className="mb-2 text-amber-400">Opening Hours</h1>
          <div className="flex gap-4 text-yellow-50 text-sm mt-2">
            <p>Monday-Friday</p>
            <p>5PM-11PM</p>
          </div>
          <div className="flex gap-6 text-yellow-50 text-sm mt-2">
            <p>Saturday</p>
            <p>4PM-12AM</p>
          </div>
          <div className="flex gap-8 text-yellow-50 text-sm mt-2">
            <p>Sunday</p>
            <p>4PM-10PM</p>
          </div>
        </div>
        
        <div>
          <h1 className="mb-2 text-amber-400 ">Contact Us</h1>
          <p className="flex gap-2 mb-2"><img src="map-pin.svg" className="w-5" alt="" />123 Gourment Street,Culinary District,NY 1001</p>
          <h1 className="flex gap-2 mb-2"><img src="phone.svg"   className="w-5" alt="" /> +1 (555) 123-4567</h1>
          <p className="flex gap-2 mb-2"><img src="mail.svg"   className="w-5" alt="" />info@lacuisin.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
