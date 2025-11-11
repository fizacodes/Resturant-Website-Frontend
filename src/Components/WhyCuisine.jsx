import { motion } from "framer-motion";

function WhyCuisine() {
  // Animation variants for boxes
  const boxVariants = (index) => ({
    hidden: { opacity: 0, x: index % 2 === 0 ? -120 : 120 }, // alternate left/right
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 60, damping: 15, duration: 7, ease: "easeOut" },
    },
  });

  return (
    <div className="bg-black    pt-20 z-20 overflow-hidden">
      <div>
        <h1 className="text-amber-600 text-center">MEMBER BENEFITS</h1>
        <h1 className="text-5xl font-serif text-center text-white mt-2">
          Why Choose La Cuisine?
        </h1>
        <h1 className="text-center text-gray-300 mt-2">
          Unlock a world of culinary privileges designed for true food
          enthusiasts
        </h1>

        {/* Boxes Section */}
        <div className="flex justify-center mt-5">
          <div className="mt-2 grid md:grid-cols-3 grid-cols-2 max-w-5xl lg:gap-6 gap-2 place-items-center">
            {[
              {
                img: "calendar.svg",
                color: "bg-amber-600",
                title: "Priority Reservations",
                text: "Skip the waitlist and get first access to peak dining time",
              },
              {
                img: "gift.svg",
                color: "bg-orange-600",
                title: "Birthday Rewards",
                text: "Celebrate your special day with a complimentary dessert",
              },
              {
                img: "star.svg",
                color: "bg-yellow-500",
                title: "Earn Points",
                text: "Get 10 points for every dollar spent and redeem for rewards",
              },
              {
                img: "calendar.svg",
                color: "bg-amber-600",
                title: "Exclusive Access",
                text: "Enjoy member-only tasting events and workshops",
              },
              {
                img: "gift.svg",
                color: "bg-orange-600",
                title: "Seasonal Offers",
                text: "Be the first to know about seasonal menus and deals",
              },
              {
                img: "star.svg",
                color: "bg-yellow-500",
                title: "VIP Experience",
                text: "Special recognition and priority service at our partner restaurants",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="lg:w-[300px] md:w-[200px]  border p-4 border-amber-700/40 rounded-lg cursor-pointer"
                variants={boxVariants(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.06,
                  y: -5,
                  transition: { duration: 0.4, ease: "easeOut" },
                }}
              >
                <img
                  src={item.img}
                  className={`${item.color} p-4 rounded-lg mb-4`}
                  alt=""
                />
                <h1 className="text-white">{item.title}</h1>
                <h1 className="text-gray-400 mt-4 text-sm">{item.text}</h1>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Stats */}
        <motion.div
          className="flex justify-center items-center sm:gap-6 gap-2  mt-8"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 1.2, ease: "easeOut" },
          }}
          viewport={{ once: true }}
        >
          {[
            { number: "50K+", label: "Active Members" },
            { number: "500K+", label: "Reservations Made" },
            { number: "$2M+", label: "Rewards Redeemed" },
            { number: "4.9/5", label: "Members Rating" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="border border-amber-400/40  sm:w-[200px] w-[100px] p-2 rounded-xl text-center"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              <h1 className="text-amber-400 sm:text-3xl text-xl text-center">
                {item.number}
              </h1>
              <h1 className="text-gray-300 text-sm mt-2">{item.label}</h1>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default WhyCuisine;
