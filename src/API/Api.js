import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URL;

export const getData = async ({ setGetDataLoading, setResult }) => {
  try {
    let res = await axios.get(`${URL}`);
    setGetDataLoading(false);
    setResult(res.data);
  } catch (error) {
    alert(error.response.data.msg);
    setGetDataLoading(false);
  }
};

export const postData = async ({ setPostDataLoading, setPostDatas, image }) => {
  try {
    const datas = { image: image.filesUploaded[0].url };
    setPostDataLoading(true);
    let res = await axios.post(`${URL}/`, datas);
    if (res) {
      setPostDataLoading(false);
      setPostDatas(res.data);
    }
  } catch (error) {
    alert(error.response.data.msg);
    setPostDataLoading(false);
  }
};

//export default getData;

// get single data from the server
export const getSinglePost = async ({ id, setGetDataLoading, image }) => {
  try {
    setGetDataLoading(true);
    const { data } = await axios.get(`${URL}/${id}`);
    if (data) {
      image(data);
      setGetDataLoading(false);
    }
    return data;
  } catch (error) {
    alert(error.msg);
  }
};
