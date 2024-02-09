import { useEffect, useState } from "react";
import AddCoffee from "./AddCoffee";

export default function TeaList() {

    const [teas, setTeas] = useState([]);

    const getAllTeas = () => {
        fetch('http://localhost:8080/api/teas')
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json()
        })
        .then(responseData => setTeas(responseData._embedded.teas))
        .catch(err => console.error(err))
    }

    useEffect(() => {getAllTeas()}, []);

    const deleteTea = (id) => {
        console.log(id);
        fetch("http://localhost:8080/deleteTea?id=" + id, { method: 'DELETE' })
        .then(response => {
            if (response.ok){
                alert('Tee poistettu.')
                getAllTeas();
            } else {
                alert('Jotain meni pieleen.');
            }
        })
        .catch(err => console.log(err));
    }


    return ( 
        <div>
            <h1>Lempiteet</h1>
            <table style={{margin: "auto", padding: 20}}>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Paino (g)</th>
                        <th>Hinta (€)</th>
                        <th></th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                    teas.map((tea, index) => 
                        <tr key={index}>
                            <td>{tea.name}</td>
                            <td>{tea.weight}</td>
                            <td>{tea.price}</td>
                            <td><button onClick={() => deleteTea(index + 1)}>Poista</button></td>
                        </tr>)
                    }
                </tbody>
            </table>   
            <AddCoffee getTeas={getAllTeas}/>
        </div>
    );
}