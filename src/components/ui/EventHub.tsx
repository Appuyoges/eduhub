import { Calendar } from "lucide-react";

export default function EventHub() {
  return (
    <div className="bg-secondary p-6 rounded-lg">
      <h2 className="text-xl font-bold text-dark flex items-center gap-2">
        <Calendar size={24} /> Upcoming Events
      </h2>
      <p>Join, RSVP & explore campus activities.</p>
    </div>
  );
}
