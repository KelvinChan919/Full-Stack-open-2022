import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Display_name from './components/Display';
import methods from './services/methods';

const App = () => {
  const [persons, setPersons] = useState([]); // ����ƾ�
  const [shown_persons, setShown_Persons] = useState([]); // �L�o���G
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    methods.getall().then(response => {
      setPersons(response.data);
      setShown_Persons(response.data); // ��l�L�L�o
    }).catch(error => {
      console.error('����ƾڥ���:', error);
      alert('�L�k�[���ƾڡA���ˬd��ݪA��');
    });
  }, []);

  const check_duplicate = (array, name) => {
    return array.some(element => element.name === name); // �אּ some ��T���
  };

  const filter_func = (array, filter) => {
    if (filter.trim() !== '') {
      const regex = new RegExp(filter, 'i');
      return array.filter(each => regex.test(each.name));
    } else {
      return array; // ��^��J�}�C
    }
  };

  const add_func = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    const duplicate_name_checker = check_duplicate(persons, newName);
    if (duplicate_name_checker) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    methods.create(newObject).then(response => {
      const updatedPersons = [...persons, response.data];
      setPersons(updatedPersons);
      setShown_Persons(filter_func(updatedPersons, newFilter));
    }).catch(error => {
      console.error('�Ыإ���:', error);
      alert('�L�k�K�[�pô�H');
    });
  };

  const HandleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const HandleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setShown_Persons(filter_func(persons, event.target.value)); // �u��s shown_persons
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const deletedId = event.target.id; // string
    if (window.confirm("Do you want to delete this entry?")) {
      try {
        // ���[��s�e��
        const updatedPersons = persons.filter(element => element.id !== deletedId);
        setPersons(updatedPersons);
        setShown_Persons(filter_func(updatedPersons, newFilter));

        // �R���ؼ�
        await methods.delete_req(deletedId);

        // ����̷s�ƾ�
        const response = await methods.getall();
        const data = response.data;

        // �R���Ҧ��Ѿl����
        for (const item of data) {
          await methods.delete_req(item.id);
        }

        // ���s POST �C�Ӷ��� with �s�s�� id
        for (let index = 0; index < data.length; index++) {
          const newItem = { ...data[index], id: String(index + 1) }; // �s id "1", "2", ...
          await methods.create(newItem); // POST �s����
        }

        // �̫᭫�s����ƾڧ�s�e��
        const finalResponse = await methods.getall();
        setPersons(finalResponse.data);
        setShown_Persons(filter_func(finalResponse.data, newFilter));
      } catch (error) {
        console.error('�R���Χ�s����:', error);
        alert('�ާ@���ѡA���ˬd��ݪA��');
        // �^�u�e�ݪ��A
        const response = await methods.getall();
        setPersons(response.data);
        setShown_Persons(response.data);
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} HandleFilterChange={HandleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm add_func={add_func} newName={newName} HandleNameChange={HandleNameChange} newNumber={newNumber} HandleNumberChange={HandleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {shown_persons.map(element => <Display_name name={element.name} key={element.id} number={element.number} handleDelete={handleDelete} button_id={element.id}/>)}
      </ul>
    </div>
  );
};

export default App;