import { NavLink, Link } from 'react-router-dom';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inventory
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/manufacturers">Manufacturers</Link>
                    <Link className="dropdown-item" to="/manufacturers/new">Create Manufacturer</Link>
                    <div class="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/models">Models</Link>
                    <Link className="dropdown-item" to="/models/new">Create Model</Link>
                    <div class="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/automobiles">Automobiles</Link>
                    <Link className="dropdown-item" to="/automobiles/new">Create Automobile</Link>
                  </li>
                </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sales
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/salesperson/new">Create Salesperson</Link>
                  <Link className="dropdown-item" to="/customers/new">Create Customer</Link>
                  <div class="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/sales/">Sales</Link>
                  <Link className="dropdown-item" to="/sales/new">Create Salerecord</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Services
              </NavLink>
              <ul className="dropdown-menu">
                <li>

                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technician/new">Create Technician</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
