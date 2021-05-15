import { Fragment } from "react";
import { Auth } from "aws-amplify";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();
const Header = ({ auth }) => {
  let history = useHistory();
  const pageRoute = history.location.pathname;

  // Logout Function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      Auth.signOut();
      auth.setAuthenticated(false);
      auth.setUser(null);
      let message = "Logged Out Successfully";
      toast.success(message, {
        position: "top-right",
        autoClose: 0,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      history.push("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Movies Deck</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {pageRoute === "/" && (
                <form class="d-flex my-2">
                  <input
                    class="form-control me-sm-2"
                    type="text"
                    placeholder="Search"
                  />
                  <button
                    class="btn btn-secondary my-2 my-sm-0 box-shadow-none"
                    type="submit"
                    style={{ display: "none" }}
                  >
                    Search
                  </button>
                </form>
              )}
              {auth.isAuthenticated === true ? (
                <Fragment>
                  <LinkContainer to="/home">
                    <Nav.Link>
                      {" "}
                      <button className="btn btn-secondary my-2 my-sm-0 box-shadow-none">
                        {" "}
                        Home{" "}
                      </button>{" "}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link className="pe-0" onClick={(e) => handleLogout(e)}>
                      <button className="btn btn-secondary my-2 my-sm-0 box-shadow-none">
                        {" "}
                        Logout{" "}
                      </button>
                    </Nav.Link>
                  </LinkContainer>
                </Fragment>
              ) : (
                <Fragment>
                  <LinkContainer to="/register">
                    <Nav.Link className="pe-0">
                      {" "}
                      <button className="btn btn-secondary my-2 my-sm-0 box-shadow-none">
                        Sign Up{" "}
                      </button>{" "}
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link className="pe-0">
                      {" "}
                      <button className="btn btn-secondary my-2 my-sm-0 box-shadow-none">
                        Sign In
                      </button>{" "}
                    </Nav.Link>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
