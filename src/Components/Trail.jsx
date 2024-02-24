
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Trail() {
    const [event, setEvent] = useState(null);
    const [quantity, setQuantity] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [eventId, setEventId] = useState(null);
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
          'Authorization': `Bearer ${token}`, // Use the Bearer token here
          'Content-Type': 'multipart/form-data'
      }
  }
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/event/search/?page=1',config);
                const eventData = response.data.results[0];
                setEvent(eventData);
                setEventId(eventData.id); // Set the event ID
                setTotalPrice(eventData.entry_fee); // Set initial total price
            } catch (error) {
                console.error('Error fetching event data: ', error);
            }
        };

        fetchEventData();
    }, []);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
        setTotalPrice((quantity + 1) * event.entry_fee);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setTotalPrice((quantity - 1) * event.entry_fee);
        }
    };

    const handleEventIdChange = (e) => {
        setEventId(e.target.value);
    };

    const handlePayClick = () => {
        axios.post(`http://127.0.0.1:8000/ticket/booking/${eventId}/`, { quantity, total_price: totalPrice,event:eventId },config)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
            <p><span className="font-semibold">Capacity:</span> {event.capacity}</p>
            <p><span className="font-semibold">Entry Fee:</span> {event.entry_fee}</p>
            <div className="mt-4 flex items-center">
                <button className="px-3 py-1 bg-blue-500 text-white" onClick={decrementQuantity}>-</button>
                <input type="number" className="mx-3 w-16 text-center" value={quantity} readOnly />
                <button className="px-3 py-1 bg-blue-500 text-white" onClick={incrementQuantity}>+</button>
            </div>
            <div className="mt-4 flex items-center">
                <span className="font-semibold">Total Price:</span>
                <input type="number" className="mx-3 w-16 text-center" value={totalPrice} readOnly />
            </div>
            <div className="mt-4 flex items-center">
                <span className="font-semibold">Event ID:</span>
                <input type="text" className="mx-3 w-16" value={eventId} onChange={handleEventIdChange} />
            </div>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white" onClick={handlePayClick}>Pay</button>
        </div>
    );
}

export default Trail;