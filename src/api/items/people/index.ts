import axios from "axios"
import Cookies from "js-cookie";

export  const  getPeople = async() => {
      const access_token = Cookies.get("access_token");
      const {data} =   await axios.get('https://silvatek.vn:8080/items/people',    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return data
}