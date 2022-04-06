
import Header from "../Header"
import ProductsSection from "../ProductsSection"

import './index.css'



const Home=()=>{

    
    
    // const [activeTab,setActiveTab]=useState("products")

    // const renderBelowSection=()=>{
    //     switch(activeTab)
    //     {
    //         case "cart": return <Cart/>

    //         case "products": return <ProductsSection/>

    //         case "orders":return <Orders/>
    //     }
    // }

    

    return (
        <>
            <Header/>
            <ProductsSection/>
        </>
    )
}



export default Home 