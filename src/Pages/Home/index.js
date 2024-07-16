import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import profile from "../../components/user-6380868_1280.png";
import "./index.css";

const Home = () => {
  const data = Cookies.get("user_data");
  const userData = JSON.parse(data)[0];
  console.log(userData);
  const navigate = useNavigate();
  // const [data, setData] = useState([])
  // useEffect(() => {
  //     const userData = Cookies.get('user_data')
  //     setData(userData)
  // },[])
  const onLogout = () => {
    Cookies.remove("user_data");
    navigate("/login");
  };
  return (
    <div className="body">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-picture">
              <img src={profile} alt="Profile" />
            </div>
            <div className="profile-name">
              <h1>{`${userData.user_firstname} ${userData.user_lastname}`}</h1>
              <p>{`${userData.user_city}, ${userData.user_zipcode}`}</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <span>Email:</span>
              <p>{userData.user_email}</p>
            </div>
            <div className="detail-item">
              <span>Phone:</span>
              <p>{userData.user_phone}</p>
            </div>
            <div className="detail-item">
              <span>User ID:</span>
              <p>{userData.user_id}</p>
            </div>
          </div>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Logout
          </button>
          {/* Modal */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Logout</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Do you want to logout?</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={onLogout}
                  data-bs-dismiss="modal"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
