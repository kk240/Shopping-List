import "./App.css";
import { AiOutlinePlus, AiFillCheckCircle } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { BsFillCircleFill, BsFillTrashFill } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [itemName, setItemName] = useState("");
  const [isSelected, SetIsSelected] = useState(false);
  const [totalItemCount, settotalItemCount] = useState(0);
  const [items, setItems] = useState([]);

  const handelOnAdd = () => {
    if (itemName == "") {
      alert("enter item name");
      return;
    }
    const newItem = [
      ...items,
      { isSelected: false, itemName: itemName, quantity: 1 },
    ];
    const newtotalItemCount = totalItemCount + 1;
    setItems(newItem);
    setItemName("");
    settotalItemCount(newtotalItemCount);
  };
  const handleIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  };
  const handleDecrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity > 1 && newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
  };
  const handleCheck = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems);
  };
  const handleDelete = (index) => {
    const newItems = [...items];
    if (index == 0) {
      newItems.splice(index - 1, 1);
    } else {
      newItems.splice(index, 1);
    }
    setItems(newItems);
    calculateTotal();
  };
  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    settotalItemCount(totalItemCount);
  };

  return (
    <div className="main-container">
      <div className="input-box">
        <input
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Add an item..."
          value={itemName}
        />
        <TiPlus className="plus-icon" onClick={handelOnAdd} />
      </div>
      {items.map((item, index) => {
        return (
          <div className="item-box" key={index}>
            {item.isSelected == false ? (
              <div className="item-name">
                <BsFillCircleFill
                  onClick={() => handleCheck(index)}
                  className="circle-icon"
                />
                {item.itemName}
              </div>
            ) : (
              <div className="item-name completed">
                <AiFillCheckCircle
                  onClick={() => handleCheck(index)}
                  className="circle-icon"
                />
                {item.itemName}
              </div>
            )}
            <div className="delete-btn">
              <BsFillTrashFill
                className="delete-icon"
                onClick={() => handleDelete(index)}
              />
            </div>
            <div className="counter">
              <FaChevronLeft
                onClick={() => handleDecrease(index)}
                className="decrement"
              />
              {item.quantity}
              <FaChevronRight
                onClick={() => handleIncrease(index)}
                className="increment"
              />
            </div>
          </div>
        );
      })}
      <div className="total">Total = {totalItemCount}</div>
    </div>
  );
}

export default App;
