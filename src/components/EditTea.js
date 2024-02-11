
export default function EditTea({tea, setTea, setIsVisible, getAllTeas}) {

    const handleSubmit = () => {
        if(/^[0-9a-zA-ZäöåÄÖÅ\s]+$/.test(tea.name) && tea.weight >= 0 && tea.price >= 0){
            fetch("http://localhost:8080/edittea?id=" + tea.id 
                + "&name=" + tea.name 
                + "&weight=" + tea.weight 
                + "&price=" + tea.price,
                {   method: 'PUT',
                    headers: {'Content-type': 'application/json'},
                }
            )
            .then(response => {
                if (response.ok) {
                    getAllTeas();
                } else {
                    console.log(response.statusText);
                    alert('Jotain meni pieleen.');
                }
                setTea({
                    id: 0,
                    name: '',
                    weight: 0,
                    price: 0,
                });
                setIsVisible(false);
            })
            .catch(err => console.error(err))
        } else {
            alert("Teen muokkaaminen epäonnistui, tarkista syöttämäsi arvot.")
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
                        value={tea.name} 
                        onChange={(event) => setTea({...tea, name: event.target.value})} 
                    />
                </label>
                <label>
                    Paino:
                    <input 
                        className="numberInput"
                        type="number" 
                        value={tea.weight} 
                        onChange={(event) => setTea({...tea, weight: event.target.value})} 
                    />
                </label>
                <label>
                    Hinta:
                    <input 
                        className="numberInput"
                        type="number" 
                        value={tea.price} 
                        onChange={(event) => setTea({...tea, price: event.target.value})} 
                    />
                </label>
                <br/>
                <input className="submitButton" type="submit" value="Muokkaa" />
            </form>
            <button 
                className="exitButton" 
                onClick={
                    () => {
                        setIsVisible(false); 
                        setTea({
                            id: 0,
                            name: '',
                            weight: 0,
                            price: 0,
                        });
            }}>
                    Peruuta
            </button>
        </div>
    )

}