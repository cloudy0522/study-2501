import './App.css'

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

function Product({product}) {
  return (
    <div className='product-box'>
      <p className='product-name'>{product.recommend && (<b className='recommend'>추천!</b>  )}<b>{product.name}</b></p>
      <br/>
      <p>{"가격: "+product.prize}</p>
      {product.outofStock? <span className='outofstock'>품절</span>:<span className='buy'>구매하기</span>}
    </div>
  )
}

function ProductList() {
  return (<ul>{productList.map(product =>
  <li key = {product.id}>
    <Product product={product} />
  </li>
  )}</ul>)
}

export default function App() {
  return (<div className='root'>
    <h1>상품 목록</h1>
    <ProductList/>
    </div>)
}

