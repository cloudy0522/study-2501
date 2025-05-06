import { useState } from 'react'
import './App.css'

function Product({product, addToCart}) {
  return (
    <div className='product'>
      <p className='product-name'>{product.recommend && (<b className='recommend'>추천!</b>  )}<b>{product.name}</b></p>
      <br/>
      <p className='product-prize'>{"가격: "+product.prize}</p>
      {product.outofStock? <span className='outofstock'>품절</span>:<button className='buy' onClick={() => addToCart({id:product.id, amount:1})}>구매하기</button>}
    </div>
  )
}

function ProductList({productList, addToCart}) {
  return (<ul className='product-list'>
    {productList.map(product =>
  <li  key = {product.id}>
    <Product product={product} addToCart={addToCart}/>
  </li>
  )}</ul>)
}

function CartItemList({productList, cartItems, deleteCartItem}) {
  return (
    <ul className='cart-item-list'>
      <li><b>장바구니</b></li>
      {cartItems.map(item =>
      <li key = {item.id}>
        <CartItem product={productList[item.id]} amount={item.amount} deleteCartItem={deleteCartItem}/>
      </li>
      )}</ul>
  )
}

function CartItem({product, amount, deleteCartItem}){
  return (
    <div className='cart-item'>
        <span className='cart-item-name'>{product.name}</span>
        <span className='cart-tools'>
          <span className='cart-item-amount'>{amount} </span>
          <span className='cart-item-prize'>{(product.prize * amount)}</span>
          <button className='cart-delete-button' onClick={() => deleteCartItem(product.id)}>삭제</button>
        </span>
        
    </div>
  )
}

export default function App() {
  const productList = [
    {
      id: 0,
      name: "책상",
      prize: 100000,
      outofStock: false,
      recommend: false
    },
    {
      id: 1,
      name: "의자",
      prize: 80000,
      outofStock: true,
      recommend: true
    },
    {
      id: 2,
      name: "책장",
      prize: 100000,
      outofStock: false,
      recommend: true
    },
    {
      id: 3,
      name: "스톨",
      prize: 40000,
      outofStock: false,
      recommend: false
    }
  ]
  const [cartItems, setCartItems] = useState([])
  const [isCartOpened, setIsCartOpened] = useState(false)

  const addToCart = (product) => {
    let newCartItems = Array.from(cartItems.slice())
    //이미 있으면 수량 +1, 없으면 새로 추가
    let done = false
    
    newCartItems.forEach((item, index) => {
      if (item.id == product.id) {
        newCartItems[index].amount += 1
        setCartItems(newCartItems)
        done = true
      }
    });

    if(!done){
      newCartItems.push({id: product.id, amount: product.amount})
      setCartItems(newCartItems)
    } 
  }

  const deleteCartItem = (id) => {
    let newCartItems = cartItems.filter(item => item.id != id)
    setCartItems(newCartItems)
  }

  const toggleCart = (current) => {
    setIsCartOpened(!isCartOpened)
    return true
  }

  return (<div className='root'>
    <h1></h1>
    
    <div className='container'>
      <button className='cart-button' onClick={toggleCart}>장바구니</button>
      {isCartOpened && <CartItemList productList={productList} cartItems={cartItems} deleteCartItem={deleteCartItem}/>}
    </div>
    
    <div className='container'>
      <ProductList productList={productList} addToCart={addToCart}/>
    </div>
    </div>)
}

