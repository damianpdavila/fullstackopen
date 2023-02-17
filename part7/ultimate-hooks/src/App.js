import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        console.log('value changed: ', event.target.value);
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    const getAll = useCallback(() => {
        axios.get(baseUrl).then((response) => {
            console.log('getAll', response.data);
            //return response.data;
            setResources(response.data);
        });
    }, [baseUrl]);

    useEffect(() => {
        console.log('useeffect');
        getAll();
    }, [getAll]);

    // ...
    let token = null;
    const setToken = (newToken) => {
        token = `bearer ${newToken}`;
    };

    const create = async (newObject) => {
        const config = {
            headers: { Authorization: token },
        };

        const response = await axios.post(baseUrl, newObject, config);
        return response.data;
    };

    const service = {
        create,
        getAll,
    };

    return [resources, service];
};

const App = () => {
    const content = useField('text');
    const name = useField('text');
    const number = useField('text');

    const [notes, noteService] = useResource('http://localhost:3005/notes');
    const [persons, personService] = useResource(
        'http://localhost:3005/persons'
    );

    console.log('startup notes', notes);
    console.log('startup persons', persons);

    // if (notes && notes.length === 0) {
    //   noteService.getAll();
    // }
    // if (persons && persons.length === 0) {
    //   personService.getAll();
    // }

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        noteService.create({ content: content.value });
        noteService.getAll();
    };

    const handlePersonSubmit = (event) => {
        event.preventDefault();
        personService.create({ name: name.value, number: number.value });
        personService.getAll();
    };

    return (
        <div>
            <h2>notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button>create</button>
            </form>
            {notes.map((n) => (
                <p key={n.id}>{n.content}</p>
            ))}

            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name} /> <br />
                number <input {...number} />
                <button>create</button>
            </form>
            {persons.map((n) => (
                <p key={n.id}>
                    {n.name} {n.number}
                </p>
            ))}
        </div>
    );
};

export default App;
