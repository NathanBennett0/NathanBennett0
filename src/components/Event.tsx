import './event.css';

type EventProps = {
  title: string;
  description: string;
};

const Event = ({ title, description }: EventProps) => {
  return (
    <div className="event">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default Event;
