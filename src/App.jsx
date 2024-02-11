import { useState } from "react";

function MainNavbar() {
  return (
    <nav className="main-navbar">
      <div className="logo">
      <div className="brand-name">Drinks and Rosas</div>
      </div>
      <ul className="options-navbar">
        <li><a href="" className="a-navb">Home</a></li>
        <li><a href="" className="a-navb">Buy Drinks</a></li>
        <li><a href="" className="a-navb">Locations</a></li>
      </ul>
      <div className="social-media">
        <a href=""><div className="whatsapp-icon"/></a>
        <a href=""><div className="instagram-icon"/></a>
      </div>
    </nav> 
    );
}

function ShopOfDrinks() {
  const [viewDrinks, setViewDrinks] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [filterMark, setFilterMark] = useState("");
  const [filterPrice, setFilterPrice] = useState(null);

  return (
    <div className="shop-of-drinks">
      <NavbarTypeOfDrinks setViewDrinks={setViewDrinks} setFilterMark={setFilterMark} setFilterPrice={setFilterPrice}
      ></NavbarTypeOfDrinks>
      <SectionOfSearcheres viewDrinks={viewDrinks} setViewDrinks={setViewDrinks} setSearchText={setSearchText}
      setFilterMark={setFilterMark} setFilterPrice={setFilterPrice}></SectionOfSearcheres>
      <DrinksCatalogue viewDrinks={viewDrinks} searchText={searchText} setSearchText={setSearchText} filterMark={filterMark} filterPrice={filterPrice}
      setFilterMark={setFilterMark} setFilterPrice={setFilterPrice}></DrinksCatalogue>
    </div>
  );
}

function NavbarTypeOfDrinks({setViewDrinks, setFilterMark, setFilterPrice}) {
  return (
    <div className="navbar-type-of-drinks">
      <ul>
        <li><a href="#" onClick={() => {setViewDrinks("wine"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">WINE</a></li>
        <li><a href="#" onClick={() => {setViewDrinks("beer"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">BEER</a></li>
        <li><a href="#" onClick={() => {setViewDrinks("fernet"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">FERNET</a></li>
        <li><a href="#" onClick={() => {setViewDrinks("all"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">ALL</a></li>
      </ul>
    </div>
  );
}

function SectionOfSearcheres({viewDrinks, setSearchText, setFilterMark, setFilterPrice}) {
  return (
    <div className="section-searcheres">
      <SearcherOfDrinks setSearchText={setSearchText}></SearcherOfDrinks>
      <SearcherFilterDrinks viewDrinks={viewDrinks} setFilterMark={setFilterMark} setFilterPrice={setFilterPrice}></SearcherFilterDrinks>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p className="text-footer">Hecho por mí - <a href="" className="user-instagram">@martincdo</a></p>
    </div>
  )
}

function SearcherOfDrinks({setSearchText}) {
  return (
    <form className="searcher-drinks">
     <input type="text" className="input-searcher" placeholder="Search drink"
     onChange={(e) => setSearchText(e.target.value)}></input>
    </form>
  );
}

function SearcherFilterDrinks({viewDrinks, setFilterMark, setFilterPrice}) {
  const [displayOptionsMark, setDisplayOptionsMark] = useState(false);
  const [displayOptionsPrice, setDisplayOptionsPrice] = useState(false);

  return (
      <div className="searcher-filter-drinks">
        <button className="btn-filter" onClick={() => {
          setDisplayOptionsMark(!displayOptionsMark)}}>Filter for Mark</button>
        {displayOptionsMark && <>
          {MARKS[viewDrinks].map(el => {
            return (<div onClick={(e) => {
              setFilterMark(e.target.textContent.toLowerCase())}
          } className="option-mark">{el} <br></br></div>)
          })}
        </>}
        <hr className="line-filter"/>
        <button className="btn-filter" onClick={() =>
          setDisplayOptionsPrice(!displayOptionsPrice)
        }>Filter for Price</button>
        {displayOptionsPrice && <>
          <>
            <div className="option-mark" onClick={() => setFilterPrice(1)}>Up to $3000</div>
            <div className="option-mark" onClick={() => setFilterPrice(2)}>$3000 to $7000</div>
          </>
        </>}
        <hr className="line-filter"/>
      </div>
  );
}

function DrinksCatalogue({viewDrinks, searchText, setSearchText, filterMark, filterPrice, setFilterMark, setFilterPrice}) {
  const [countProducts, setCountProducts] = useState(0);
  const [activeBag, setActiveBag] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [openPayment, setOpenPayment] = useState(false);
  const [openSearcherFilter, setOpenSearcherFilter] = useState(false);

  const cards = 
    PRODUCTS.map((product) => {
      if (viewDrinks !== "all") {
        if (product.type != viewDrinks) {
          return 
        }
      }

      if (
        product.title.toLowerCase().indexOf(
          searchText.toLowerCase()) === -1) {
          return
      }

      if (filterMark !== "" && filterMark.trim() !== product.mark) {
        return
      }

      if (filterPrice == 1 && product.price > 3000) {
        return
      }

      if (filterPrice == 2 && (!(3000 <= product.price  && product.price <= 7000))) {
       return
      }

      return (<CardDrink id={product.id} key={product.id} title={product.title} price={product.price} src={product.src} countProduct={countProducts} setCountProducts={setCountProducts} setActiveBag={setActiveBag} listProducts={listProducts} setListProducts={setListProducts}></CardDrink>)
  });
  
  function returnTotal() {
    let total = 0;
    listProducts.map(el => {
      total += el.price;
    });
    return total;
  }

  return (
    <div className="drinks-catalogue">
      { openPayment && 
      <div className="payment">
        <div className="btns-payment">
          <button className="btn-restartpayment btnpay" onClick={() => {
            setListProducts([])
            setCountProducts(0)
            setOpenPayment(false)
            setActiveBag(false)
          }}>Restart Bag</button>
          <button className="btn-closepayment btnpay" onClick= {() => {setOpenPayment(false)}}>X</button>
        </div>

        {listProducts.map((el, i) => {
          return (<div className="product-payment">{el.title}: ${el.price} ARS 
          </div>)
        })}

        <p className="total-price">Total: ${returnTotal()} ARS</p>
        <button className="pay-payment btnpay">Pay</button>
      </div> }

      
       <ShopCart countProducts={countProducts} activeBag={activeBag} 
       listProducts={listProducts} openPayment={openPayment} 
       setOpenPayment={setOpenPayment}></ShopCart>
       <div className="searcher-responsive">
          <SearcherOfDrinks setSearchText={setSearchText}></SearcherOfDrinks>
          <a className="close-filter-responsive" onClick={() => setOpenSearcherFilter(!openSearcherFilter)}>Filter drinks </a>
          {openSearcherFilter &&
            <SearcherFilterDrinks viewDrinks={viewDrinks} setFilterMark={setFilterMark} setFilterPrice={setFilterPrice}></SearcherFilterDrinks> 
          }
       </div>
       <div className="cards-drinks">
        {cards}
       </div>
    </div>
  );
}

function ShopCart({countProducts, activeBag, listProducts, 
  openPayment, setOpenPayment, totalPrice, setTotalPrice}) {
  const classBag = activeBag ? "shop-cart active" : "shop-cart";

  function openBag() {
    setOpenPayment(!openPayment);
  }

  return (
      <div onClick={() => openBag()} className={activeBag ? "shop-cart active" : "shop-cart"}>
        <p className="count-products">{countProducts}</p>
        <p className="bag">B A G</p>
        </div>
  );
}

function CardDrink({id, src, title, price, countProduct, setCountProducts, setActiveBag, listProducts, setListProducts}) {
  function addProductToBag(e) {
   setCountProducts(countProduct + 1);
   setActiveBag(true)
   const newList = [...listProducts.slice(), PRODUCTS[e.target.dataset.id - 1]];
   setListProducts(newList)
  };

  return (
    <div className="card-drink">
      <img src={src} width="100px" height="100px" alt="" />
      <p className="title-product">{title}</p>
      <p className="price">${price} ARS</p>
      <button data-id={id} className="btn-add-cart" onClick={(e) => addProductToBag(e)}>Add to bag</button>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <MainNavbar></MainNavbar>
      <ShopOfDrinks></ShopOfDrinks>
      <Footer></Footer>
    </div>
  );
}

const PRODUCTS = [
  {id: 1, type: "wine", mark: "malbec", price: 3000, title: "Gran Medalla Malbec X750", src: "assets/img/redwinemalbec.webp"},
  {id: 2, type: "beer", mark: "andes", price: 1150, title: "Andes Beer X473", src: "assets/img/andesrubia.webp"},
  {id: 3, type: "beer", mark: "corona", price: 1200, title: "Corona Beer X330", src: "assets/img/corona330.webp"},
  {id: 4,type: "beer", mark: "corona", price: 1800, title: "Corona Beer X710", src: "assets/img/corona710.webp"},
  {id: 5, type: "wine", mark: "sauvignon", price: 3000, title: "Luigi Bosca Sauvignon X750", src: "assets/img/wineluigibosca.webp"},
  {id: 6, type: "fernet", mark: "branca", price: 7000, title: "Fernet Branca X750", src: "assets/img/fernet.webp"},
  {id: 7, type: "wine", mark: "malbec", price: 3000, title: "Gran Medalla Malbec X750", src: "assets/img/redwinemalbec.webp"}
]

const MARKS = {
  "wine" : ["Malbec", "Sauvignon"],
  "beer" : ["Corona", "Andes"],
  "fernet": ["Branca"],
  "all": ["Malbec", "Sauvignon", "Corona", "Andes", "Branca"]
}
