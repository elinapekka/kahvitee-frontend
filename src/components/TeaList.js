import { useEffect, useState } from "react";
import AddTea from "./AddTea";
import EditTea from "./EditTea.js";

export default function TeaList() {

    const [teas, setTeas] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedTea, setSelectedTea] = useState({
        id: 0,
        name: '',
        weight: 0,
        price: 0,
    });

    const getAllTeas = () => {
        fetch('http://localhost:8080/teas')
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
        fetch("http://localhost:8080/deletetea?id=" + id, { method: 'DELETE' })
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

    if (teas.length === 0) {
        return (
            <div>
                <div style={{padding: 15,}}>
                    Tällä hetkellä ei yhtään teetä tallennettuna tai backend ei ole käynnissä. 
                </div>
                <AddTea />
            </div>
        )
    } else {
        return ( 
            <div>
                <div style={{ 
                    visibility: isVisible ? "visible" : "hidden",
                    height: isVisible ? "fit-content" : 0,
                    
                }} >
                    <EditTea
                        tea={selectedTea} 
                        setTea={setSelectedTea}
                        setIsVisible={setIsVisible}
                        getAllTeas={getAllTeas}
                    />
                </div>
                <h2>Lempiteet</h2>
                <table style={{margin: "auto"}}>
                    <thead>
                        <tr>
                            <th>Nimi</th>
                            <th>Paino (g)</th>
                            <th>Hinta (€)</th>
                            <th></th>
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
                                <td style={{maxWidth: "25px"}} >
                                <button 
                                className="editButton" 
                                onClick={() => {
                                    setSelectedTea({
                                        id: (index + 1),
                                        name: tea.name,
                                        weight: tea.weight,
                                        price: tea.price,
                                    }); 
                                    setIsVisible(true);
                                }}>
                                    Muokkaa
                                </button>
                            </td>
                                <td style={{maxWidth: "25px"}}>
                                    <button 
                                    className="deleteButton" 
                                    onClick={() => deleteTea(index + 1)}>
                                        Poista
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>   
                <AddTea getAllTeas={getAllTeas} />
            </div>
        );
    }
}