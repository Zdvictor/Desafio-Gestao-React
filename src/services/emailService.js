import emailjs from "emailjs-com";

export const sendMail = (name,email,password) => {

    return emailjs.send("service_ty6b02e", "template_py5iyc8", {name,email,password}, "zb_tnc_n1f2gbh9m0")

}