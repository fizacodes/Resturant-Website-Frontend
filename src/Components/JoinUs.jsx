import SignUp from "./SignUp"
import { useState } from "react"

function JoinUs() {
  const [showSignUp,setShowSignUp]=useState(false);
  return (
    <div className='bg-black pt-20 flex justify-center items-center pb-20 overflow-hidden'>
      <div className='w-full max-w-3xl border border-amber-500/50 rounded-2xl p-10 shadow-[0_0_40px_rgba(255,191,0,0.1)] text-center'>
        
        {/* Tag */}
        <span className='inline-block text-amber-400 border border-amber-400/50 px-4 py-1 rounded-full text-sm  tracking-wider mb-6'>
          Limited Time Offer
        </span>

        {/* Heading */}
        <h1 className='bg-gradient-to-r from-amber-300 to-amber-700 text-5xl font-serif font-medium bg-clip-text text-transparent mb-4'>
          Join Today & Get 500 Bonus Points
        </h1>

        {/* Paragraph */}
        <p className='text-yellow-50  leading-relaxed mb-10 text-sm'>
          Sign up now and start earning rewards on your first visit. 
          Plus, get exclusive access to our new seasonal menu before anyone else!
        </p>

        {/* Button */}
        <button onClick={()=>setShowSignUp(true)} className='bg-gradient-to-r from-amber-400 to-amber-700 text-black font-semibold px-8 py-3 rounded-lg shadow-md hover:scale-105 hover:shadow-[0_0_25px_rgba(255,191,0,0.4)] transition-all duration-300'>
          Create New Account
        </button>
        <p className='text-gray-300 mt-6 text-[12px]'>No Credit Card Required.Free Forever.Cancel Anytime.</p>
        <div className='w-3/4 mx-auto border-t border-amber-500/30 my-8'></div>
        <ul className='text-lime-50  text-sm flex justify-center items-center gap-4'>
          <li>Instant Access</li>
          <li>Secure & Private</li>
          <li>24/7 Support</li>
          <li>Money-back Guarrentee</li>
        </ul>
      </div>
      {showSignUp && <SignUp onClose={()=>setShowSignUp(false)}/>}
    </div>
  )
}

export default JoinUs

