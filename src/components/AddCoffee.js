import { useState } from "react";

export default function AddCoffee( {getCoffees} ) {


    const [coffee, setCoffee] = useState({
        name: "",
        weight: 0,
        price: 0,
        roastLevel: 1,
    });

    const handleSubmit = () => {
        fetch("http://localhost:8080/addcoffee?name=" + coffee.name + "&weight=" + coffee.weight + "&price=" + coffee.price + "&roastLevel=" + coffee.roastLevel, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            //body: JSON.stringify(coffee) 
        })
        .then(response => {
            if (response.ok) {
                alert('Kahvi lisätty');

            } else {
                console.log(JSON.stringify.coffee)
                alert('Jotain meni pieleen: ' + response.statusText);
            }
        })
        .catch(err => console.error(err))
    }

    return ( 
        <div>
            <h3>Lisää uusi kahvi</h3>
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
                        type="number" 
                        value={coffee.weight} 
                        onChange={(event) => setCoffee({...coffee, weight: event.target.value})} 
                    />
                </label>
                <label>
                    Hinta:
                    <input 
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
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}