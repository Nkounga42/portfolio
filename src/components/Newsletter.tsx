import { Calendar, HandMetal } from 'lucide-react'

export default function Newsletter() {
  return (
    <div className="relative isolate flex justify-center py-16 sm:py-24 lg:py-32 min-h-[4  00px] bg-base-200">
      <div className="hero-content flex- col items-start col-revers lg:flex-row max-w-5xl gap-8">
        <div className="text-center lg:text-left max-w-xl">
          <h2 className="text-4xl font-bold">Abonnez-vous à notre newsletter</h2>
          <p className="py-6 text-base-content/70">
            Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
            dolore.
          </p>
          <div className="join">
            <input 
              type="email" 
              placeholder="Enter votre email" 
              className="input input-bordered join-item" 
              required
            />
            <button className="btn btn-primary join-item">S'Abonner</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
          <div className="  ">
            <div className="">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10 flex gap-2 mb-4">
                <Calendar className="w-6 h-6" />
              <h3 className="card-title">Weekly articles</h3>
              </div>
              <p className="text-base-content/70">
                Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
              </p>
            </div>
          </div>

          <div className=" ">
            <div className="">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10 flex gap-2 mb-4">
                <HandMetal className="w-6 h-6" />
              <h3 className="card-title">No spam</h3>
              </div>
              <p className="text-base-content/70">
                Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
