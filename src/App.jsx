import { useState } from "react";
import { motion } from "framer-motion"

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
    <motion.div className="navbar-type-of-drinks"
    initial={{opacity: 0}}
    animate={{opacity: 1}}>
      <ul>
        <li><a href="#" onClick={() => {setViewDrinks("wine"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">WINE</a></li>
        <li><a href="#" onClick={() => {setViewDrinks("beer"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">BEER</a></li>
        <li><a href="#" onClick={() => {setViewDrinks("fernet"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">FERNET</a></li>
        <li><a href="#" onClick={() => {setViewDrinks("all"), setFilterMark(""), setFilterPrice(null)}} className="typedrink">ALL</a></li>
      </ul>
    </motion.div>
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
            return (<motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              onClick={(e) => {
              setFilterMark(e.target.textContent.toLowerCase())}
          } className="option-mark">{el} <br></br></motion.div>)
          })}
        </>}
        <hr className="line-filter"/>
        <button className="btn-filter" onClick={() =>
          setDisplayOptionsPrice(!displayOptionsPrice)
        }>Filter for Price</button>
        {displayOptionsPrice && <>
          <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}>
            <div className="option-mark" onClick={() => setFilterPrice(1)}>Up to $3000</div>
            <div className="option-mark" onClick={() => setFilterPrice(2)}>$3000 to $7000</div>
          </motion.div>
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

      return (<CardDrink id={product.id} key={product.id} title={product.title} price={product.price} src={product.src} lts={product.lts} countProduct={countProducts} setCountProducts={setCountProducts} setActiveBag={setActiveBag} listProducts={listProducts} setListProducts={setListProducts}></CardDrink>)
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
        <div className="btns-payment" id="pay">
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

function CardDrink({id, src, title, price, lts, countProduct, setCountProducts, setActiveBag, listProducts, setListProducts}) {
  function addProductToBag(e) {
   setCountProducts(countProduct + 1);
   setActiveBag(true)
   const newList = [...listProducts.slice(), PRODUCTS[e.target.dataset.id - 1]];
   setListProducts(newList)
  };

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    className="card-drink">
      <img src={src} width="200px" height="200px" alt="" />
      <p className="title-product">{title}</p>
      <p className="title-product">{lts}</p>
      <p className="price">${price} ARS</p>
      <button data-id={id} className="btn-add-cart" onClick={(e) => addProductToBag(e)}>Add to bag</button>
    </motion.div>
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
  {id: 1, type: "wine", mark: "malbec", price: 3000, title: "Gran Medalla Malbec", lts: "X750", src: "assets/img/redwinemalbec.png"},
  {id: 2, type: "beer", mark: "andes", price: 1150, title: "Andes Beer", lts: "X473", src: "assets/img/andesbeer.png"},
  {id: 3, type: "beer", mark: "corona", price: 1200, title: "Corona Beer", lts: "X330", src: "assets/img/coronabeer.png"},
  {id: 4,type: "beer", mark: "corona", price: 1800, title: "Corona Beer", lts: "X710", src: "assets/img/corona700.png"},
  {id: 5, type: "wine", mark: "sauvignon", price: 3000, title: "Luigi Bosca Sauvignon", lts: "X810", src: "assets/img/luigiwhite.png"},
  {id: 6, type: "fernet", mark: "branca", price: 7000, title: "Fernet Branca", lts: "X750", src: "assets/img/fernet.webp"}
]

const MARKS = {
  "wine" : ["Malbec", "Sauvignon"],
  "beer" : ["Corona", "Andes"],
  "fernet": ["Branca"],
  "all": ["Malbec", "Sauvignon", "Corona", "Andes", "Branca"]
}
