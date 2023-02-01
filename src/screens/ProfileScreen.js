import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "../components/profileComponents/Orders";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/Actions/userActions";
import moment from "moment";
import { useParams } from "react-router-dom";
import { listMyOrder } from "../Redux/Actions/OrderActions";
import GetDataComponent from "../components/GetDataComponent";
import { PickerOverlay } from "filestack-react";
import Loading from "../components/LoadingError/Loading";
import { getData } from "./../API/Api";
import { postData } from "./../API/Api";
import { getSinglePost } from "./../API/Api";
import axios from "axios";

const ProfileScreen = () => {
  const { id } = useParams();
  const [isPicker, setIsPicker] = useState(false);
  const [image, setImage] = useState("");
  const [result, setResult] = useState([]);
  const [getDataLoading, setGetDataLoading] = useState(true);
  const [postDataLoading, setPostDataLoading] = useState(false);
  const [postDatas, setPostDatas] = useState();

  const getData = async () => {
    try {
      setGetDataLoading(true);
      let res = await axios.get("http://localhost:5000/all");
      setResult(res.data);
    } catch (error) {
      alert(error.response.data.msg);
      setGetDataLoading(false);
    }
  };

  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const submitHandler = (e) => {
    e.preventDefault();
    !image
      ? alert("Image required")
      : postData({ image, setPostDatas, setPostDataLoading });
  };

  useEffect(() => {
    getData({ setResult, setGetDataLoading });
    if (postDatas) {
      setImage("");
      getData({ setResult, setGetDataLoading });
    }
  }, [postDatas]);

  // get single blog post
  useEffect(() => {
    if (id) {
      getSinglePost({
        id: id,
        getDataLoading: setGetDataLoading,
        image: setImage,
      });
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5"></div>

                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo?.name}</strong>
                  </h5>

                  <span className="author-card-position">
                    <>Joined {moment(userInfo?.createdAt).format("LL")}</>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue">
              <form onSubmit={submitHandler}>
                {image ? (
                  <img
                    src={image && image.filesUploaded[0].url}
                    alt="imageuploaded"
                    className="imagesize"
                  />
                ) : (
                  <button
                    onClick={() =>
                      isPicker ? setIsPicker(false) : setIsPicker(true)
                    }
                    type="button"
                    className="col-md-5 chooseimage"
                  >
                    Choose Image
                  </button>
                )}
                <button type="submit">
                  {postDataLoading ? "Loading..." : "SUBMIT"}
                </button>
                {/* Filestack */}
                <div>
                  {isPicker && (
                    <PickerOverlay
                      apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                      onSuccess={(res) => {
                        setImage(res);
                        setIsPicker(false);
                      }}
                      onError={(res) => alert(res)}
                      pickerOptions={{
                        maxFiles: 1,
                        // accept: ["images/*"],
                        errorsTimeout: 2000,
                        maxSize: 1 * 1000000 * 1000000,
                      }}
                    />
                  )}
                </div>
              </form>

              {getDataLoading && <Loading />}

              <GetDataComponent result={result} />
            </div>
          </div>

          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orders={orders} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
