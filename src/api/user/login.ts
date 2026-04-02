import axios from "axios"

export  const  login = async(email: string, password: string) => {
      const {data} =   await axios.post("https://silvatek.vn:8080/auth/login",{
            "email": email,
            "password": password
    })
    return data
}