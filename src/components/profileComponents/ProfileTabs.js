import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./../LoadingError/Toast";
import Message from "./../LoadingError/Error";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";

import { getData, postData } from "../../API/Api";
import GetDataComponent from "../GetDataComponent";
import { PickerOverlay } from "filestack-react";



const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [homeaddress, setHomeAddress] = useState("");
  const [state, setState] = useState("");
  const [hosteladdress, setHostelAddress] = useState("");
  const [hostellocation, setHostelLocation] = useState("");
  const [unitofwork, setUnitofwork] = useState("");
  const [koinonia, setKoinonia] = useState("");
  const [dobirth, setBirth] = useState("");
  const [level, setLevel] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showhide, setShowhide] = useState("no");

  const [isPicker, setIsPicker] = useState(false);
  const [image, setImage] = useState();
  const [result, setResult] = useState([]);
  const [getDataLoading, setGetDataLoading] = useState(true);
  const [postDataLoading, setPostDataLoading] = useState(false);
  const [postDatas, setPostDatas] = useState();

  const toastId = React.useRef(null);
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowhide(getshow);
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userDetails);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      setFaculty(user.faculty);
      setDepartment(user.department);
      setHomeAddress(user.homeaddress);
      setState(user.state);
      setHostelAddress(user.hosteladdress);
      setHostelLocation(user.hostellocation);
      setUnitofwork(user.unitofwork);
      setKoinonia(user.koinonia);
      setBirth(user.dobirth);
      setLevel(user.level);
      setSelectedFile(user.selectedFile);
      setImage(user.image);
    }
    getData({ setResult, setGetDataLoading });
    if (postDatas) {
      setImage("");
      getData({ setResult, setGetDataLoading });
    }
  }, [dispatch, user, postDatas]);

  const submitHandler = async (e) => {
    e.preventDefault();
    !image
      ? alert("Image required")
      : postData({ image, setPostDatas, setPostDataLoading });

    // PASSWORD MATCH
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toast.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          gender,
          faculty,
          department,
          homeaddress,
          state,
          hosteladdress,
          hostellocation,
          unitofwork,
          koinonia,
          dobirth,
          level,
          password,
          selectedFile,
        })
      );
      if (!toast.isActive(toastId.current)) {
        toast.current = toast.success("Profile Updated", Toastobjects);
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row form-container" onSubmit={submitHandler}>
        {/* Username */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Full Name</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* email */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-email">Email Address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-gender">Gender</label>
            <select
              className="form-control"
              type="text"
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Select" selected>
                Select
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-faculty">Faculty</label>
            <select
              className="form-control"
              type="text"
              required
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="Select" selected>
                Select
              </option>
              <option value="Administration">Administration</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Art">Art</option>
              <option value="Basic Medical Sciences">
                Basic Medical Sciences
              </option>
              <option value="Clinical Sciences">Clinical Sciences</option>
              <option value="Dentistry">Dentistry</option>
              <option value="Environmental Design and Management">
                Environmental Design and Management
              </option>
              <option value="Education">Education</option>
              <option value="Law">Law</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Science">Science</option>
              <option value="Social Sciences">Social Sciences</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-department">Department</label>
            <select
              className="form-control"
              type="text"
              value={department}
              required
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="Select" selected>
                Select
              </option>
              <option value="Agricultural Economics & Extension">
                Agricultural Economics & Extension
              </option>
              <option value="Agricultural Economics">
                Agricultural Economics
              </option>
              <option value="Agricultural and Environmental Engineering">
                Agricultural and Environmental Engineering
              </option>
              <option value="Agricultural Extension and Rural Sociology">
                Agricultural Extension and Rural Sociology
              </option>
              <option value="Anaesthesia and Intensive Care">
                Anaesthesia and Intensive Care
              </option>
              <option value="Anatomy and Cell Biology">
                Anatomy and Cell Biology
              </option>
              <option value="Animal Sciences">Animal Sciences</option>
              <option value="Archeology">Archeology</option>
              <option value="Architecture">Architecture</option>
              <option value="Biochemistry">Biochemistry</option>
              <option value="Botany">Botany</option>
              <option value="Building">Building</option>
              <option value="Business Law">Business Law</option>

              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Chemical Pathology"> Chemical Pathology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Clinical Pharmacy and Pharmacy Administration">
                Clinical Pharmacy and Pharmacy Administration
              </option>
              <option value="Community Health and Nutrition">
                Community Health and Nutrition
              </option>
              <option value="Computer Science and Engineering">
                Computer Science and Engineering
              </option>
              <option value="Continuing Education">Continuing Education</option>
              <option value="Crop production">Crop production</option>
              <option value="Demography and Social Statistics">
                Demography and Social Statistics
              </option>
              <option value="Dermatology and Venerology">
                Dermatology and Venerology
              </option>
              <option value="Dramatic Arts">Dramatic Arts</option>
              <option value="Drug Research and Production Unit">
                Drug Research and Production Unit
              </option>
              <option value="Economics">Economics</option>

              <option value="Educational Administration and Planning">
                Educational Administration and Planning
              </option>
              <option value="Educational Foundation and Counseling">
                Educational Foundation and Counseling
              </option>
              <option value="Educational Technology">
                Educational Technology
              </option>
              <option value="Electronic and Electrical Engineering">
                Electronic and Electrical Engineering
              </option>
              <option value="English Language">English Language</option>
              <option value="Environmental Health and Epidemiology">
                Environmental Health and Epidemiology
              </option>
              <option value="Estate Management">Estate Management</option>
              <option value="Fine and Applied Arts">
                Fine and Applied Arts
              </option>

              <option value="Food Nutrition and Consumer Sciences">
                Food Nutrition and Consumer Sciences
              </option>
              <option value="Food Science and Technology">
                Food Science and Technology
              </option>
              <option value="Foreign Languages">Foreign Languages</option>
              <option value="Geography">Geography</option>
              <option value="Geology">Geology</option>
              <option value="Haematology and Immunology">
                Haematology and Immunology
              </option>
              <option value="History">History</option>
              <option value="Institute of Education">
                Institute of Education
              </option>
              <option value="International Law">International Law</option>
              <option value="International Relations">
                International Relations
              </option>
              <option value="Jurisprudence and Private Law">
                Jurisprudence and Private Law
              </option>
              <option value="Linguistics"> Linguistics</option>
              <option value="Local Government Studies">
                Local Government Studies
              </option>
              <option value="Management and Accounting">
                Management and Accounting
              </option>
              <option value="Mathematics">Mathematics</option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Medical Microbiology and Parasitology">
                Medical Microbiology and Parasitology
              </option>
              <option value="Medical Rehabilitation">
                Medical Rehabilitation
              </option>
              <option value="Medicine">Medicine</option>
              <option value="Mental Health">Mental Health</option>
              <option value="Materials Science & Engineering">
                Materials Science & Engineering
              </option>
              <option value="Microbiology">Microbiology</option>
              <option value="Medical Pharmacology and therapeutics">
                Medical Pharmacology and therapeutics
              </option>
              <option value="Morbid Anatomy and Forensic Medicine">
                Morbid Anatomy and Forensic Medicine
              </option>
              <option value="Music">Music</option>
              <option value="Nursing">Nursing</option>
              <option value="Obstetrics, Gynaecology and Perimatology">
                Obstetrics, Gynaecology and Perimatology
              </option>
              <option value="Orthopaedic Surgery and Traumatology">
                Orthopaedic Surgery and Traumatology
              </option>
              <option value="Paediatrics and Child Health">
                Paediatrics and Child Health
              </option>
              <option value="Pharmaceutical Chemistry">
                Pharmaceutical Chemistry
              </option>
              <option value="Pharmaceutics">Pharmaceutics</option>
              <option value="Urban & Regional Planning">
                Urban & Regional Planning
              </option>
              <option value="Pharmacognosy">Pharmacognosy</option>

              <option value="Pharmacology">Pharmacology</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Physical and Health Education">
                Physical and Health Education
              </option>
              <option value="Physics">Physics</option>
              <option value="Physiological Sciences">
                Physiological Sciences
              </option>
              <option value="Plant Science">Plant Science </option>

              <option value="Political Science">Political Science</option>
              <option value="Psychology">Psychology</option>
              <option value="Public Administration">
                Public Administration
              </option>
              <option value="Public Law">Public Law</option>
              <option value="Quantity Surveying">Quantity Surveying</option>
              <option value="Radiology">Radiology</option>

              <option value="Religious Studies">Religious Studies</option>
              <option value="Sociology and Anthropology">
                Sociology and Anthropology
              </option>
              <option value="Soil Science">Soil Science</option>
              <option value="Special Education and Curriculum Studies">
                Special Education and Curriculum Studies
              </option>
              <option value="Surgery">Surgery</option>
              <option value="Urban and Regional Planning">
                Urban and Regional Planning
              </option>
              <option value="Zoology">Zoology</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-address">Home Address</label>
            <input
              className="form-control"
              type="text"
              value={homeaddress}
              required
              onChange={(e) => setHomeAddress(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-address">State</label>
            <select
              className="form-control"
              type="text"
              value={state}
              required
              onChange={(e) => setState(e.target.value)}
            >
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="Akwa Ibom">Akwa Ibom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa </option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Kastina">Kastina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>

              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamfara</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-address">Hostel Address</label>
            <input
              className="form-control"
              type="text"
              placeholder="Stella, Block D 105"
              value={hosteladdress}
              required
              onChange={(e) => setHostelAddress(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-address">Hostel Location</label>
            <select
              className="form-control"
              type="text"
              value={hostellocation}
              required
              onChange={(e) => setHostelLocation(e.target.value)}
            >
              <option value="" select>
                Choose an option
              </option>
              <option value="Ede Road">Ede Road</option>
              <option value="Oduduwa Estate">Oduduwa Estate</option>
              <option value="Ibadan Road">Ibadan Road</option>
              <option value="Aserifa">Aserifa</option>
              <option value="Maintenace Zone A (Ebenezer, Unifecs, Sijuade, Anglican)">
                Maintenace Zone A (Ebenezer, Unifecs, Sijuade, Anglican)
              </option>
              <option
                value="Maintenace Zone B (Shekinah, Roseland, Diamond luxury, Goshen,
                Divine hope)"
              >
                Maintenace Zone B (Shekinah, Roseland, Diamond luxury, Goshen,
                Divine hope)
              </option>
              <option value="Maintenace Zone C (Stella, Mercy, De-Gold)">
                Maintenace Zone C (Stella, Mercy, De-Gold)
              </option>
              <option value="Maintenace Zone D (Acquifa, Adedoyin Adeniyi, Bver, Ajike, SHG)">
                Maintenace Zone D (Acquifa, Adedoyin Adeniyi, Bver, Ajike, SHG)
              </option>
            </select>
          </div>
        </div>

        {/* <div className="col-md-6">
          <div className="form">
            <label>Are you a worker?</label>
            <select
              className="form-control"
              type="text"
              value={work}
              required
              onChange={(e) => setWork(e.target.value)}
              onClick={handleshow}
            >
              <option value="Select">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div> */}

        <div className="col-md-6">
          <label className="form mx-4">Are you a worker</label>
          <div className="row">
            <div className="col">
              <div className="mx-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userdetail"
                  value="yes"
                  onClick={handleshow}
                />
                <label className="">Yes</label>
              </div>
            </div>

            <div className="col">
              <div className="mx-1">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userdetail"
                  value="no"
                  checked={showhide === "no"}
                  onClick={handleshow}
                />

                <label> No</label>
              </div>
            </div>
          </div>
        </div>

        {/* unit of work */}
        {showhide === "yes" && (
          <div className="col-md-6">
            <div className="form">
              <label className="form-label"> Unit of Work</label>
              <select
                type="text"
                name="address"
                className="form-control"
                value={unitofwork}
                onChange={(e) => setUnitofwork(e.target.value)}
              >
                <option value="Select" selected>
                  Select
                </option>
                <option value="Ushering">Ushering</option>
                <option value="Academic">Academic</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Choir">Choir</option>
                <option value="Evangelism">Evangelism</option>
                <option value="Prayer Band">Prayer Band</option>
                <option value="Maintenance Zone A">Maintenance Zone A</option>
                <option value="Maintenance Zone B">Maintenance Zone B</option>
                <option value="Maintenance Zone C">Maintenance Zone C</option>
                <option value="Maintenance Zone D">Maintenance Zone D</option>
                <option value="GPT">GPT</option>
                <option value="Colpurtuer">Colpurtuer</option>
                <option value="Children">Children</option>
                <option value="Youth">Youth</option>
              </select>
            </div>
          </div>
        )}

        {/* koinonia location */}

        {showhide === "yes" && (
          <div className="col-md-6">
            <div className="form">
              <label className="form"> Koinonia Location</label>

              <select
                type="text"
                name="address"
                className="form-control"
                value={koinonia}
                onChange={(e) => setKoinonia(e.target.value)}
              >
                <option value="" select>
                  Choose an option
                </option>
                <option value="Ede Road">Ede Road</option>
                <option value="Oduduwa Estate">Oduduwa Estate</option>
                <option value="Ibadan Road">Ibadan Road</option>
                <option value="Aserifa">Aserifa</option>
                <option value="Maintenace Zone A ()">
                  Maintenace Zone A ()
                </option>
                <option
                  value="Maintenace Zone B (Shekinah, Roseland, Diamond luxury, Goshen,
                Divine hope)"
                >
                  Maintenace Zone B (Shekinah, Roseland, Diamond luxury, Goshen,
                  Divine hope)
                </option>
                <option value="Maintenace Zone C (Stella, Mercy, De-Gold)">
                  Maintenace Zone C (Stella, Mercy, De-Gold)
                </option>
                <option value="Maintenace Zone D ()">
                  Maintenace Zone D ()
                </option>
              </select>
            </div>
          </div>
        )}

        <div className="col-md-6">
          <div className="form">
            <label for="account-birth">Date of Birth</label>
            <input
              className="form-control"
              type="date"
              min="1990-01-02"
              value={dobirth}
              required
              onChange={(e) => setBirth(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-gender">Level</label>
            <select
              className="form-control"
              type="text"
              value={level}
              required
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Select" selected>
                Select
              </option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
          </div>
        </div>

        {/* profile picture */}
        <div className="col-md-6">
          <div className="form">
            <label for="account-gender">Marital Status</label>
            <select
              className="form-control"
              type="text"
              required
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
            >
              <option value="Single">Single</option>
              <option value="Maried">Maried</option>
              <option value="Engaged">Engaged</option>
            </select>
          </div>
        </div>

        {/* end of profile photo */}

        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
                onClick={submitHandler}
                type="button"
                className="col-md-5 chooseimage"
                value={image}
              >
                Choose Image
              </button>
            )}
            <button type="submit">
              {postDataLoading ? "Loading..." : "SUBMIT"}
            </button>
          </form>
          {/* submit button */}

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

          {/* {getDataLoading && <Loading />}

          <GetDataComponent result={result} /> */}
          {/* <img src="`${URL}/${id}`" /> */}
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
