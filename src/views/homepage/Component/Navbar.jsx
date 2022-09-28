import React ,{Component} from 'react'
import { Link } from 'react-router-dom'
import "../../../assets/scss/pages/users.scss"
class Navbar extends Component{
    render(){
        return(
            // <!-- Navigation -->
    <nav className="navbar navbar-expand-lg fixed-top navbar-light">
    <div className="container">
        
        {/* <!-- Text Logo - Use this if you don't have a graphic logo --> */}
         {/* <Link className="navbar-brand logo-text page-scroll" to="index.html">Evolo</Link>  */}

        {/* <!-- Image Logo --> */}
        <Link className="navbar-brand logo-image"to="#"><img src="https://mymember.com/static/media/logo.940eab8a.png" alt="alternative"/></Link> 

        <button className="navbar-toggler p-0 border-0" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className=" collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto" >
            <li className="nav-item">
                    <Link className="nav-link page-scroll Detail12" to="/">Home</Link>
                </li>
                <li className="nav-item">
                
                    <Link className="nav-link page-scroll Detail12" to="#services">Services <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link page-scroll Detail12" to="#details">Details</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link page-scroll Detail12" to="#pricing">Pricing</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link page-scroll Detail12" to="#contact">Contact</Link>
                </li>
                <li ><Link className="btn-solid-lg page-scroll btn2" to="/pages/login">Login</Link> </li>
                <li><Link className="btn-solid-lg page-scroll btn2" to="/pages/register">Signup</Link></li>              
            </ul>
     
        </div> 
        </div>
    
    </nav>

        )

        }
    }
export default Navbar