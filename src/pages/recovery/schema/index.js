import * as yup from "yup";

const recoverySchema = yup.object().shape({
    email: yup
        .string()
        .email("Digite um email válido.")
        .required("O email é obrigatório.")

})

export default recoverySchema