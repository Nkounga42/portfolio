import { experience } from "../libs/data";

export default function Timeline() {
  const renderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" >
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  )

  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical max-w-4xl">
      {experience.map((event, index) => (
        <li key={index} >
          {index !== 0 && <hr />}
          <div className="timeline-middle">{renderIcon()}</div>
          <div
            className={`relative timeline-${event.position} ${event.position === "start" ? "mb-10 md:text-end" : "md:mb-10"
              }`}
          >
            <time className="font-mono italic">{event.date}</time>
              <div className={`md:w-full h-full md:mb-0 mb-4  md:absolute top-3  ${event.position === "start" ? "-right-full bg-base-300__ md:-mr-8  mr-0" : "-left-full bg-primary__ -300 md:-ml-8   ml-0"} `} ></div>
            <div className="text-lg font-black">{event.title}</div>
            {event.content} 
          </div>
          <hr />
        </li>
      ))}
    </ul>
  )
}