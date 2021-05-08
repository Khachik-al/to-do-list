import React from 'react';
import './App.css';
import Input from './input';
// import Counter from './Counter'
import Product from './Product/Product'

const fruits = [
  {
    name: 'apple',
    price: '2$',
    desc: 'aples from Armenia',
    icon: '🍎'
  },
  {
    name: 'banana',
    price: '5$',
    desc: 'bananas from Ecuador',
    icon: '🍌'
  },
  {
    name: 'lemon',
    price: '4$',
    desc: 'lemons from Afrika',
    icon: '🍋'
  }

]

let li = fruits.map((el, i) => {
  return <li key={i}>
    <Product
      icon={el.icon}
      price={el.price}
      name={el.name}
      descripton={el.name}
    />
  </li>
})

function App() {
  return (
    <div className="App">
      <Input />
      <header className="App-header">
        <ol>
          {li}
        </ol>

        {
          // <Counter defaultValue={0} /><br />
        }
      </header>
    </div>
  );
}

export default App;
