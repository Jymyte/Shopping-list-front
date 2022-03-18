import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const URL = 'http://localhost/shopping_list/'

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState(null);

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data)
      }).catch(error => {
        alert(error.response ? error.reponse.data.error : error);
      })
  }, [])

  const save = (e) => {
    e.preventDefault();
    const json = JSON.stringify({description:name, amount:amount});
    axios.post(URL + "add.php",json, {
      'Content-Type' : 'application/json'
    }).then((response) => {
      setItems(items.concat(response.data));
      setAmount(null);
      setName('');
    }).catch(error => {
      alert(error.response.data.error)
    })
  }

  const remove = (id) => {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then((response) => {
      const newList = items.filter((item) => item.id !== id)
      setItems(newList)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error)
    })
  }
  

  return (
    <div className="App">
      <h3>Shopping list</h3>
      <form onSubmit={save}>
        <label>New task (name and amount)</label>
        &nbsp;
        <input value={name} onChange={e => setName(e.target.value)}></input> &nbsp;
        <input value={amount} onChange={e => setAmount(e.target.value)}></input>
        <button>Save</button>
      </form>
      <ol>
        {items.map(item => (
          <li key={item.id}>
            <p>{item.description} &nbsp;
            <a className="delete" onClick={() => remove(item.id) } href="#">
              Delete
            </a> &nbsp;
            </p>
            
            {item.amount}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
