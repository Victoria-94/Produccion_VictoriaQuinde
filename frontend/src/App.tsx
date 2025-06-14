import { useEffect, useState } from 'react';
import axios from 'axios';

interface Child {
  id: number;
  name: string;
  age: number;
}

function App() {
  const [children, setChildren] = useState<Child[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(0);

  const fetchChildren = async () => {
    const res = await axios.get<Child[]>('/api/children');
    setChildren(res.data);
  };

  const addChild = async () => {
    await axios.post('/api/children', { name, age });
    setName('');
    setAge(0);
    fetchChildren();
  };

  const deleteChild = async (id: number) => {
    await axios.delete(`/api/children/${id}`);
    fetchChildren();
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Lista de Niños</h1>
      <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Edad" type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
      <button onClick={addChild}>Agregar</button>
      <ul>
        {children.map(child => (
          <li key={child.id}>
            {child.name} - {child.age} años
            <button onClick={() => deleteChild(child.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
