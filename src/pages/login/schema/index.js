import * as yup from "yup";

const signInSchema = yup.object().shape({
    email: yup
        .string()
        .email("Digite um email válido.")
        .required("O email é obrigatório."),
    password: yup
        .string()
        .required("A senha é obrigatória.")
        .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default signInSchema;
