import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'


const Header=(props:{change:any})=>{
    
    return (
        <div className='header'>
            <img src="https://www.demandsphere.com/wp-content/uploads/2018/02/Amazon_logo.png" alt="amazon" className='site-icon' onClick={()=>{
                props.change("products")
            }}/>
            <button type='button' className='products-btn' onClick={()=>props.change("products")}>Products</button>
            <div className="header-container">
                    <button type='button' className='orders-button products-btn' onClick={()=>{
                        props.change("orders")
                    }}>ORDERS</button>
                    <div onClick={()=>{
                            props.change("cart")}} className="cart-count-container">
                        <button type="button" className="cart-button" 
                        >
                        
                        </button>
                        <AiOutlineShoppingCart className='cart-icon'/>
                    </div>
            </div>
            
        </div>
    )
}

export default Header 