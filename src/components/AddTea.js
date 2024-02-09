import { useState } from "react";

export default function AddTea() {

    const [tea, setTea] = useState({
        name: "",
        weight: 0,
        price: 0,
    });

    const handleSubmit = () => {
        if(/^[0-9a-zA-ZäöåÄÖÅ\s]+$/.test(tea.name) && tea.weight >= 0 && tea.price >= 0 ){
            fetch("http://localhost:8080/addtea?name=" + tea.name 
                + "&weight=" + tea.weight 
                + "&price=" + tea.price, 
                {   method: 'POST',
                    headers: {'Content-type': 'application/json'},
                }
            )
            .then(response => {
                if (response.ok) {
                    alert('Tee lisätty');
                } else {
                    alert('Jotain meni pieleen: ' + response.statusText);
                }
            })
            .catch(err => console.error(err))
        } else {
            alert('Teen lisääminen epäonnistui, tarkista syöttämäsi arvot.');
        }
    }

    return ( 
        <div>
            <h3>Lisää uusi tee</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Nimi:
                    <input 
                        type="text" 
                        value={tea.name} 
                        onChange={(event) => setTea({...tea, name: event.target.value})} 
                    />
                </label>
                <label>
                    Paino:
                    <input 
                        type="number" 
                        value={tea.weight} 
                        onChange={(event) => setTea({...tea, weight: event.target.value})} 
                    />
                </label>                    
                <label>
                    Hinta:
                    <input 
                        type="number" 
                        value={tea.price} 
                        onChange={(event) => setTea({...tea, price: event.target.value})} 
                    />
                </label>        
                <input type="submit" value="Lisää" />
            </form>
        </div>
    );
}