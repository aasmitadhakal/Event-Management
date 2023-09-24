import {data} from './Data'
function Card2() {
  return (
    <div>
 <div className="card-container">
      {data.map((card) => (
        <div key={card.id} card={card} />
      ))}
    </div>

    </div>
  )
}

export default Card2