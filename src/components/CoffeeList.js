import { useEffect, useState } from "react";
import AddCoffee from "./AddCoffee";
import EditCoffee from "./EditCoffee";

export default function CoffeeList() {

    const [coffees, setCoffees] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCoffee, setSelectedCoffee] = useState({
        id: 0,
        name: '',
        weight: 0,
        price: 0,
        roastLevel: 0,
    });

    const getAllCoffees = () => {
        fetch('http://localhost:8080/coffees')
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json()
        })
        .then(responseData => setCoffees(responseData._embedded.coffees))
        .catch(err => console.error(err))
    }

    useEffect(() => {getAllCoffees()}, []);


    const deleteCoffee = (id) => {
        fetch("http://localhost:8080/deletecoffee?id=" + id, { method: 'DELETE' })
        .then(response => {
            if (response.ok){
                alert('Kahvi poistettu.')
                getAllCoffees();
            } else {
                alert('Jotain meni pieleen.');
            }
        })
        .catch(err => console.log(err));
    }

    return ( 
        <div>
            <div style={{ 
                visibility: isVisible ? "visible" : "hidden",
                height: isVisible ? "fit-content" : 0,
                
            }} >
                <EditCoffee 
                    coffee={selectedCoffee} 
                    setCoffee={setSelectedCoffee}
                    setIsVisible={setIsVisible}
                    getAllCoffees={getAllCoffees}
                />
            </div>
            <h2>Lempikahvit</h2>
            <table style={{margin: "auto"}}>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Paino (g)</th>
                        <th>Hinta (€)</th>
                        <th>Paahtoaste (1-5)</th>
                        <th></th>
                        <th></th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                    coffees.map((coffee, index) => 
                        <tr key={index}>
                            <td>{coffee.name}</td>
                            <td>{coffee.weight}</td>
                            <td>{coffee.price}</td>
                            <td>{coffee.roastLevel}</td>
                            <td style={{maxWidth: 35}} >
                                <button 
                                className="editButton" 
                                onClick={() => {
                                    setSelectedCoffee({
                                        id: (index + 1),
                                        name: coffee.name,
                                        weight: coffee.weight,
                                        price: coffee.price,
                                        roastLevel: coffee.roastLevel
                                    }); 
                                    setIsVisible(true);
                                }}>
                                    Muokkaa
                                </button>
                            </td>
                            <td style={{maxWidth: 35}} >
                                <button 
                                className="deleteButton" 
                                onClick={() => deleteCoffee(index + 1)}>
                                    Poista
                                </button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
            <AddCoffee getAllCoffees={getAllCoffees}/>
        </div>
    );
}