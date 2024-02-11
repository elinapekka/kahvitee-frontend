
export default function EditCoffee({coffee, setCoffee, setIsVisible, getAllCoffees}) {

    const handleSubmit = () => {
        if(/^[0-9a-zA-ZäöåÄÖÅ\s]+$/.test(coffee.name) && coffee.weight >= 0 && coffee.price >= 0 && (coffee.roastLevel >= 1 && coffee.roastLevel <= 5)){
            fetch("http://localhost:8080/editcoffee?id=" + coffee.id 
                + "&name=" + coffee.name 
                + "&weight=" + coffee.weight 
                + "&price=" + coffee.price 
                + "&roastLevel=" + coffee.roastLevel, 
                {   method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                }
            )
            .then(response => {
                if (response.ok) {
                    getAllCoffees();
                } else {
                    console.log(response.statusText);
                    alert('Jotain meni pieleen.');
                }
                setCoffee({
                    id: 0,
                    name: '',
                    weight: 0,
                    price: 0,
                    roastLevel: 0,
                });
                setIsVisible(false);
            })
            .catch(err => console.error(err))
        } else {
            alert("Kahvin muokkaaminen epäonnistui, tarkista syöttämäsi arvot.")
        }
    }

    return(
        <div>
            <h3>Muokkaa</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Nimi:
                    <input 
                        type="text" 
                        value={coffee.name} 
                        onChange={(event) => setCoffee({...coffee, name: event.target.value})} 
                    />
                </label>
                <label>
                    Paino:
                    <input 
                        className="numberInput"
                        type="number" 
                        value={coffee.weight} 
                        onChange={(event) => setCoffee({...coffee, weight: event.target.value})} 
                    />
                </label>
                <label>
                    Hinta:
                    <input 
                        className="numberInput"
                        type="number" 
                        value={coffee.price} 
                        onChange={(event) => setCoffee({...coffee, price: event.target.value})} 
                    />
                </label>
                <label>
                    Paahtoaste:
                    <select value={coffee.roastLevel} onChange={(event) => setCoffee({...coffee, roastLevel: event.target.value})}>
                        <option name="1">1</option>
                        <option name="2">2</option>
                        <option name="3">3</option>
                        <option name="4">4</option>
                        <option name="5">5</option>
                    </select>
                </label>
                <br/>
                <input className="submitButton" type="submit" value="Muokkaa" />
            </form>
            <button 
                className="exitButton" 
                onClick={
                    () => {
                    setIsVisible(false); 
                    setCoffee({
                        id: 0,
                        name: '',
                        weight: 0,
                        price: 0,
                        roastLevel: 0,
                    });
            }}>
                Peruuta
            </button>
        </div>
    )

}