import {  useState } from "react"
import Header from "../Header"
import ProductsSection from "../ProductsSection"
import Cart from "../Cart"
import Orders from '../Orders'





const Home=()=>{


    
    
    const [activeTab,setActiveTab]=useState("products")

    const renderBelowSection=()=>{
        switch(activeTab)
        {
            case "cart": return <Cart/>

            case "products": return <ProductsSection/>

            case "orders":return <Orders/>
        }
    }

    

    return (
        <div>
            <Header change={setActiveTab}/>
            {
                renderBelowSection()
            }
        </div>
    )
}



export default Home 