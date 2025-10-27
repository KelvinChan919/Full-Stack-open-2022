import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Display_name from './components/Display';
import methods from './services/methods';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]); // 完整數據
  const [shown_persons, setShown_Persons] = useState([]); // 過濾結果
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [newNotification, setNewNotification] = useState(null)
  const [latelyAddedName, setlatelyAddedName] = useState('')
  const [latelyAddedNumber, setlatelyAddedNumber] = useState('')

  useEffect(() => {
    methods.getall().then(response => {
      setPersons(response.data);
      setShown_Persons(response.data); // 初始無過濾
    }).catch(error => {
      console.error('獲取數據失敗:', error);
      alert('無法加載數據，請檢查後端服務');
    });
  }, []);

  const check_duplicate = (array, name) => {
    return array.some(element => element.name === name)
  };

  const filter_func = (array, filter) => {
    if (filter.trim() !== '') {
      const regex = new RegExp(filter, 'i');
      return array.filter(each => regex.test(each.name));
    } else {
      return array; // 返回輸入陣列
    }
  };

  const add_func = async (event) => {
    event.preventDefault();
    if (newName === '' || newNumber === ''){
      alert('neither name or number cannot be empty')
      return
    }
    const newObject = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber
    };
    const duplicate_name_checker = check_duplicate(persons, newName);
    if (duplicate_name_checker && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const target_id = persons.filter(element => element.name === newName)[0].id
      await methods.update(target_id, {...newObject, id : target_id}).then(response => {
        setlatelyAddedName(response.data.name)
        setlatelyAddedNumber(response.data.number)
      })
      methods.getall().then(response => {
        const updatedPersons = response.data
        setPersons(updatedPersons);
        setShown_Persons(filter_func(updatedPersons, newFilter));
      })
      setNewNotification('numberChange')

      return;
    }
    else if(duplicate_name_checker && !window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      return;
    }else{
      methods.create(newObject).then(response => {
        const updatedPersons = [...persons, response.data];
        setPersons(updatedPersons);
        setShown_Persons(filter_func(updatedPersons, newFilter));
        setNewNotification('personAdd')
        setlatelyAddedName(response.data.name)
        setlatelyAddedNumber(response.data.number)
      }).catch(error => {
        console.error('創建失敗:', error);
        alert('無法添加聯繫人');
      });
    }
  };

  const HandleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const HandleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const HandleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setShown_Persons(filter_func(persons, event.target.value)); // 只更新 shown_persons
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const deletedId = event.target.id; // string
    if (window.confirm("Do you want to delete this entry?")) {
      try {
        // 樂觀更新前端
        const updatedPersons = persons.filter(element => element.id !== deletedId);
        setPersons(updatedPersons);
        setShown_Persons(filter_func(updatedPersons, newFilter));

        // 刪除目標
        await methods.delete_req(deletedId);

        // 獲取最新數據
        const response = await methods.getall();
        const data = response.data;

        // 刪除所有剩餘項目
        for (const item of data) {
          await methods.delete_req(item.id);
        }

        // 重新 POST 每個項目 with 新連續 id
        for (let index = 0; index < data.length; index++) {
          const newItem = { ...data[index], id: String(index + 1) }; // 新 id "1", "2", ...
          await methods.create(newItem); // POST 新項目
        }

        // 最後重新獲取數據更新前端
        const finalResponse = await methods.getall();
        setPersons(finalResponse.data);
        setShown_Persons(filter_func(finalResponse.data, newFilter));
      } catch (error) {
        console.error('刪除或更新失敗:', error);
        alert('操作失敗，請檢查後端服務');
        // 回滾前端狀態
        const response = await methods.getall();
        setPersons(response.data);
        setShown_Persons(response.data);
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification name={latelyAddedName} number={latelyAddedNumber} status={newNotification}/>
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